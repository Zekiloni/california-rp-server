import { logs, bans, characters, accounts, inventories, appearances, banks, items, houses, business, vehicles } from '@models';
import { playerConfig, serverConfig } from '@configs';
import { ItemEnums, logging, notifications, spawnPointTypes } from '@enums';
import { gDimension, itemNames, lang, none } from '@constants';
import { spawnPoint } from '@interfaces';
import { distanceBetweenVectors, shared_Data } from '@shared';


mp.events.add(
   {
      'playerJoin': playerJoinHandler,
      'playerReady': playerReadyHandler,
      'playerQuit': playerQuitHadnler,
      'playerChat': playerChatHandler,
      'entityModelChange': playerModelChange,
      'SERVER::CHARACTER:PLAY': playerSelectCharacter,
      'SERVER::ANIMATION:STOP': stopPlayeranimation,

      'playerDeath': playerRealDeath,
      'SERVER::INJURIES': playerOnInjury,
      'SERVER::DEATH': playerDeathHandler,
      'SERVER::WOUNDED': playerWoundHandler,

      'SERVER::PLAYER:POSITION': setPlayerPosition,
   }
);


mp.events.addProc(
   {
      'SERVER::PLAYER:LOBY': lobbySettings,
      'SERVER::CREATOR:INFO': creatorSettings,
      'SERVER::AUTHORIZATION:VERIFY': authorizationVerify,
      'SERVER::CHARACTER:SPAWNS': getCharacterSpawns,
      'SERVER::CREATOR:FINISH': characterFinish
   }
);


function lobbySettings () {
   return playerConfig.main.lobby;
}


function creatorSettings ()  { 
   return playerConfig.main.creator;
}


function playerChatHandler (player: PlayerMp, content: string) {
   player.character!.onChat(player, content)
}


async function playerJoinHandler (player: PlayerMp) {
   const isBanned = await bans.isBanned(player);

   if (isBanned) {
      console.log(player.name + ' banned')
      // PORUKA: Banovan
      // kick...
   }
}

function playerReadyHandler (player: PlayerMp) {
   player.dimension = mp.players.length + 1;
}


function setPlayerPosition (player: PlayerMp, position: Vector3Mp) {
   player.position = position;
   player.dimension = gDimension;
} 

async function characterFinish (player: PlayerMp, characterInfo: string, characterAppearance: string) { 

   const cInfo = JSON.parse(characterInfo);
   const cAppearance = JSON.parse(characterAppearance);

   const alreadyExist = await characters.findOne( { where: { name: cInfo.name + ' ' + cInfo.lastName } } );

   if (alreadyExist) {
      player.notification(lang.characterAlreadyExist, notifications.type.ERROR, notifications.time.SHORT);
      return;
   } 

   const character = await characters.create(
      { 
         name: cInfo.name + ' ' + cInfo.lastName,
         account_id: player.account.id,
         account: player.account,
         origin: cInfo.origin, 
         birth: cInfo.birth, 
         gender: cInfo.gender
      }
   );

   const appearance = await appearances.create(
      {
         character_id: character.id, 
         character: character, 
         shape_First: cAppearance.blends[0],
         shape_Second: cAppearance.blends[1],
         skin_First: cAppearance.blends[2],
         skin_Second: cAppearance.blends[3],
         shape_Mix: cAppearance.blends[4],
         skin_Mix: cAppearance.blends[5],
         eyes: cAppearance.eyeColor,
         hair_Style: cAppearance.hair.style,
         hair_Color: cAppearance.hair.color,
         hair_Highlight: cAppearance.hair.highlight,
         beard_Style: cAppearance.beard.style,
         beard_Color: cAppearance.beard.color,
         face_Features: cAppearance.face, 
         overlays: cAppearance.overlays, 
      }
   );

   const components = [
      itemNames.CLOTHING_TOP, itemNames.CLOTHING_UNDERSHIRT, 
      itemNames.CLOTHING_LEGS, itemNames.CLOTHING_SHOES
   ];

   cAppearance.clothing.forEach(async (element: number) => {
      const index = cAppearance.clothing.indexOf(element);
      inventories.create( { name: components[index], entity: ItemEnums.entity.PLAYER, owner: character.id, equiped: true }).then(async item => {
         item.data = {
            drawable: element,
            texture: 0
         }
         await item.save();
      })
   });
   
   character.spawnPlayer(player, spawnPointTypes.DEFAULT, appearance);

   inventories.create({ name: itemNames.DOCUMENT_ID_CARD, entity: ItemEnums.entity.PLAYER, owner: character.id }).then(async item => {
      item!.data = {
         name: character.name,
         birth: character.birth,
         origin: character.origin,
         gender: character.gender
      };
      await item.save();
   });


   player.notification(lang.characterCreated, notifications.type.SUCCESS, notifications.time.MED);

   return true;
}


function getCharacterSpawns (player: PlayerMp, id: number): Promise<spawnPoint[]> { 
   return new Promise((resolve) => {
      let spawnPoints: spawnPoint[] = [];

      characters.findOne({ where: { id: id }, include: [houses, vehicles, business, banks] }).then((character) => { 

         const defaultSpawn: spawnPoint = {
            name: lang.defaultSpawn,
            type: spawnPointTypes.DEFAULT,
            description: lang.defaultSpawnDescripiton,
            position: playerConfig.main.spawn,
            heading: playerConfig.main.heading
         }

         console.log(character?.vehicles)

         console.log(character?.business)
         spawnPoints.push(defaultSpawn);

         if (character?.faction) {
            // push factionn spawn
         }

         if (character?.houses && character.houses.length > none) { 
            for (const i in character.houses) {
               const house = character.houses[i];
               if (house.id) {
                  spawnPoints.push(
                     {
                        name: lang.ownedHouse + (i + 1),
                        type: spawnPointTypes.HOUSE,
                        position: house.position,
                        description: lang.yourHouse,
                        heading: 0,
                        id: house.id
                     }
                  )
               }
         
            }
         }

         if (character?.last_position) { 
            const position = new mp.Vector3(character.last_position.x, character.last_position.y, character.last_position.z);

            const lastPositionFarAway = character.houses.every(house => distanceBetweenVectors(position, house.position) > 200);

            if (lastPositionFarAway) {
               spawnPoints.push(
                  {
                     name: lang.lastPosition,
                     type: spawnPointTypes.LAST_POSITION,
                     description: lang.lastPositionDescription,
                     position: position,
                     heading: 0
                  }
               )
            }
         }
         resolve(spawnPoints);
      });
   });
}


function authorizationVerify (player: PlayerMp, username: string, password: string) {
   return accounts.findOne( { where: { username: username }, include: [characters] } ).then(account => {

      if (!account) {
         player.notification(lang.userDoesntExist, notifications.type.ERROR, 5);
         return;
      }

      const logged = account.login(password);

      if (!logged) { 
         player.notification(lang.incorrectPassword, notifications.type.ERROR, 5);

         logs.discord(
            lang.unsuccessfulAuth, 
            lang.account + ': **' + username + '**\n' + lang.IP + ': **' + player.ip + '**\n' + lang.social + ': **' + player.socialClub + '**', 
            logging.category.ACCOUNT
         );

         return;
      }
      
      account.setLogged(player, true);

      return account;
   })
}


function playerSelectCharacter (player: PlayerMp, characterId: number, point: spawnPointTypes, id?: number) {
   characters.findOne( { where: { id: characterId }, include: [appearances, banks] } ).then(character => {
      character!.spawnPlayer(player, point, character?.appearance!, id);
   });
}


function playerOnInjury (player: PlayerMp, bone: number, weapon: number, damage: number) {
   player.character.injury(player, bone, weapon, damage);
}

function playerRealDeath (player: PlayerMp, reason: number, killer: PlayerMp) {
   player.character!.onDead(player, killer, reason);
}

function playerDeathHandler (player: PlayerMp, killer: EntityMp | null | undefined) {
   player.character!.onDead(player, killer);
}

function playerWoundHandler (player: PlayerMp, by: EntityMp | null | undefined) {
   player.character!.onWound(player, by);
   return true;
}

async function playerQuitHadnler (player: PlayerMp, exitType: string, reason: string | null) {
   const leavingPlayer = player;
   try { 
      if (leavingPlayer && leavingPlayer.character) {
         leavingPlayer.character.onQuit(
            leavingPlayer.position,
            leavingPlayer.dimension,
            exitType,
            reason
         );
      }
   } catch (e) { 
      logs.error('playerQuitHadnler: ' + e);
   }
}


function playerModelChange (entity: EntityMp, oldModel: number) {
   if (entity.type == 'player') { 
      (<PlayerMp>entity).call('CLIENT::WEAPON:CONFIG');
   }
}

mp.Player.prototype.notification = function (message: string, type: number, time: number = 4) {
   this.call('CLIENT::NOTIFICATION', [message, type, time]);
};


mp.Player.prototype.hint = function (key: string, message: string, time: number) {
   this.call('CLIENT::HINT', [key, message, time]);
};


mp.Player.prototype.help = function (message: string, time: number) {
   this.call('CLIENT::HELP', [message, time]);
}


mp.Player.prototype.sendMessage = function (message: string, color: string) {
   this.outputChatBox('!{' + color + '}' + message);
};


mp.Player.prototype.proximityMessage = function (radius: number, message: string, colors: string[]) {
   mp.players.forEachInRange(this.position, radius, (target) => {
      const distanceGap = radius / 5;
      const distance = target.dist(this.position)
      let color = null;

      switch (true) {
         case (distance < distanceGap): color = colors[0]; break;
         case (distance < distanceGap * 2): color = colors[1]; break;
         case (distance < distanceGap * 3): color = colors[2]; break;
         case (distance < distanceGap * 4): color = colors[3]; break;
         default: color = colors[0]; break;
      }
      
      target.outputChatBox('!{' + color + '}' + message);
   });
};


mp.players.find = (searchQuery: any): PlayerMp | null => {

   if (!searchQuery || !searchQuery.trim()) {
      return null;
   };

   if (!isNaN(searchQuery)) {
      return mp.players.at(searchQuery)
   } else { 
      const found = mp.players.toArray().find(player => player.name.toLowerCase() == searchQuery.toLowerCase());
      if (found) {
         return found;
      } else { 
         return mp.players.toArray().find(player => player.name.toLowerCase().includes(searchQuery.toLowerCase()))!;
      }
   }
};


export function updatePlayer (player: PlayerMp) {
   player.character!.increment('minutes', { by: serverConfig.happyHours == true ? 2 : 1 }).then(async character => { 
      if (character.minutes >= 60) { 
         character.increment('hours', { by: 1 });
         character.minutes = 0;
         await character.save();
      }
   });
   
   player.character!.increment('hunger', { by: -0.35 });
   player.character!.increment('thirst', { by: -0.70 });

   if (player.character!.muted > 0) {
      player.character.increment('muted', { by: -1 });
   }
}

function stopPlayeranimation (player: PlayerMp) {
   player.setVariable(shared_Data.ANIMATION, null);
}