import { logs, bans, characters, accounts, items, inventories, apppearances, banks } from '@models';
import { playerConfig, serverConfig } from '@configs';
import { itemEnums, notifications, spawnPointTypes } from '@enums';
import { itemNames, lang } from '@constants';
import { spawnPoint } from '@interfaces/player.interfaces';



mp.events.add(
   {
      'playerJoin': playerJoinHandler,
      'playerQuit': playerQuitHadnler,
      'playerChat': playerChatHandler,
      'playerDeath': playerDeathHandler,
      'entityModelChange': playerModelChange,
      'SERVER::CHARACTER:PLAY': playerSelectCharacter
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
      // PORUKA: Banovan
      // kick...
   }
}


async function characterFinish (player: PlayerMp, characterInfo: string, characterAppearance: string) { 

   const character = JSON.parse(characterInfo);
   const appearance = JSON.parse(characterAppearance);

   const alreadyExist = await characters.findOne( { where: { name: character.name + ' ' + character.lastName } } );

   if (alreadyExist) {
      player.sendNotification(lang.characterAlreadyExist, notifications.type.ERROR, notifications.time.SHORT);
      return;
   } 

   const createdCharacter = await characters.create(
      { 
         name: character.name + ' ' + character.lastName,
         account_id: player.account.id,
         origin: character.origin, 
         birth: character.birth, 
         gender: character.gender
      }
   );

   apppearances.create(
      {
         character_id: createdCharacter.id, 
         character: createdCharacter, 
         face_features: appearance.face, 
         blend_data: appearance.blends, 
         overlays: appearance.overlays, 
         hair: appearance.hair, 
         beard: appearance.beard, 
         eyes: appearance.eyeColor
      }
   );

   createdCharacter.spawnPlayer(player, spawnPointTypes.DEFAULT);

   inventories.create({ name: itemNames.DOCUMENT_ID_CARD, quantity: 1, entity: itemEnums.entity.PLAYER, owner: createdCharacter.id }).then(async item => {
      item!.data = {
         name: createdCharacter.name,
         birth: createdCharacter.birth,
         origin: createdCharacter.origin,
         gender: createdCharacter.gender
      };
      await item.save();
   });

   player.sendNotification(lang.characterCreated, notifications.type.SUCCESS, notifications.time.MED);
   return true;
}


function getCharacterSpawns (player: PlayerMp, id: number): Promise<spawnPoint[]> { 
   return new Promise((resolve) => {

      let spawnPoints: spawnPoint[] = [];

      characters.findOne({ where: { id: id } }).then((character) => { 

         const defaultSpawn: spawnPoint = {
            name: lang.defaultSpawn,
            type: spawnPointTypes.DEFAULT,
            description: lang.defaultSpawnDescripiton,
            position: playerConfig.main.spawn,
            heading: playerConfig.main.heading
         }

         spawnPoints.push(defaultSpawn);

         if (character?.faction) {
            // push factionn spawn
         }
         
         // if (character?.houses) { }

         if (character?.last_position) { 
            spawnPoints.push(
               {
                  name: lang.lastPosition,
                  type: spawnPointTypes.LAST_POSITION,
                  description: lang.lastPositionDescription,
                  position: new mp.Vector3(character.last_position.x, character.last_position.y, character.last_position.z),
                  heading: 0
               }
            )
         }
         resolve(spawnPoints);
      });
   });
}


function authorizationVerify (player: PlayerMp, username: string, password: string) {
   return accounts.findOne({ where: { username: username }, include: characters }).then(account => {

      if (!account) {
         player.sendNotification(lang.userDoesntExist, notifications.type.ERROR, 5);
         return;
      }

      const logged = account.login(password);

      if (!logged) { 
         player.sendNotification(lang.incorrectPassword, notifications.type.ERROR, 5);
         return;
      }

      account.setLogged(player, true);

      return account;
   })
}


function playerSelectCharacter (player: PlayerMp, characterId: number, point: spawnPointTypes) {
   characters.findOne( { where: { id: characterId }, include: [apppearances, banks] } ).then(character => {
      character!.spawnPlayer(player, point);
   });
}


function playerDeathHandler (player: PlayerMp, reason: number, killer: PlayerMp | null | undefined) {
   player.character!.onDeath(player, reason, killer);
}


async function playerQuitHadnler (player: PlayerMp, exitType: string, reason: string | null) {
   const leavingPlayer = player;

   try { 
      if (leavingPlayer.character) {
         leavingPlayer.character.last_position = leavingPlayer.position;
         leavingPlayer.character.last_dimension = leavingPlayer.dimension;

         await leavingPlayer.character.save();
         
         inventories.unequipWeapons(leavingPlayer.character);

         console.log('saved char ' + leavingPlayer.character.name);
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

mp.Player.prototype.sendNotification = function (message: string, type: number, time: number = 4) {
   this.call('CLIENT::NOTIFICATION', [message, type, time]);
};


mp.Player.prototype.sendHint = function (key: string, message: string, time: number) {
   this.call('CLIENT::HINT', [key, message, time]);
};


mp.Player.prototype.sendMessage = function (message: string, color: string) {
   this.outputChatBox('!{' + color + '}' + message);
};


mp.players.find = (searchQuery: any): PlayerMp => {
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