
import Accounts from '../models/account.model';
import Appearances from  '../models/appearance.model';
import Characters from '../models/character.model';
import { entityData, itemData, logType, NotifyType, spawnTypes } from '../globals/enums';
import { Messages } from '../globals/constants';
import { Config } from '../config';
import Bans from '../models/ban.model';
import { spawnPoint } from '../globals/interfaces';
import { getDefaultSpawn, Logger } from '../utils';
import Items from '../models/inventory.item.model';
import { baseItem } from '../models/item.model';


mp.events.add(
   {
      'playerJoin': async (player: PlayerMp) => {
         const Banned = await Bans.isBanned(player);
         if (Banned) player.kick('Bannedovan');
      },

      'playerQuit': async (player: PlayerMp) => { 
         const leavingPlayer = player;

         try { 
            if (leavingPlayer.Character) {
               leavingPlayer.Character.last_position = leavingPlayer.position;
               leavingPlayer.Character.last_dimension = leavingPlayer.dimension;
   
               await leavingPlayer.Character.save();
               
               Items.unequipWeapons(leavingPlayer.Character);

               console.log('saved char ' + leavingPlayer.Character.name);
            }
         } catch (e) { 
            Logger(logType.ERROR, 'Saving Character: ' + e);
         }

      },

      'playerChat': (player: PlayerMp, content) => player.Character.onChat(player, content),

      'playerDeath': (player: PlayerMp) => player.Character.onDeath(player),

      'SERVER::CHARACTER:PLAY': async (player: PlayerMp, characterId: number, point: spawnTypes) => {
         const selectedCharacter = await Characters.findOne({ where: { id: characterId }, include: [Appearances]  });
         selectedCharacter?.spawnPlayer(player, point);
      },

       
   }
);


mp.events.addProc(
   {

      'SERVER::PLAYER:LOBY': (Player: PlayerMp) => { 
         Player.dimension = Player.id;
         return Config.Settings.Lobby;
      },

      'SERVER::CREATOR:INFO': (Player: PlayerMp) => { 
         return Config.Settings.Creator;
      },

      'SERVER::AUTHORIZATION:VERIFY': async (player: PlayerMp, username: string, password: string): Promise<Accounts> => {
         return new Promise((resolve) => {
            Accounts.findOne({ where: { Username: username }, include: [Characters] }).then((account) => { 
               if (account) { 
                  const logged = account.login(password);
                  if (logged) { 
                     account.setLogged(player, true);
                     resolve(account);
                  } else { 
                     player.sendNotification(Messages.INCCORRECT_PASSWORD, NotifyType.ERROR, 5);
                  }

               } else { 
                  player.sendNotification(Messages.USER_DOESNT_EXIST, NotifyType.ERROR, 5);
               }
            });
         });
      },

      'SERVER::CHARACTER:SPAWNS': async (player: PlayerMp, id: number): Promise<spawnPoint[]> => { 
         return new Promise((resolve) => {

            let spawnPoints: spawnPoint[] = [];

            Characters.findOne({ where: { id: id } }).then((character) => { 
               const defaultSpawn: spawnPoint = getDefaultSpawn();
               spawnPoints.push(defaultSpawn);
   
               if (character?.faction) {
                  // push factionn spawn
               }
               
               // if (character?.houses) { }
               console.log(character?.last_position)
      
               if (character?.last_position) { 
                  spawnPoints.push({
                     name: Messages.LAST_POSITION,
                     type: spawnTypes.lastPosition,
                     description: Messages.LAST_POSITION_DESCRIPTION,
                     position: new mp.Vector3(character.last_position.x, character.last_position.y, character.last_position.z),
                     heading: 0
                  })
               }
               resolve(spawnPoints);
            });
         });
      },

      'SERVER::CREATOR:FINISH': async (player: PlayerMp, characterInfo: string, characterAppearance: string) => { 

         const character = JSON.parse(characterInfo);
         const appearance = JSON.parse(characterAppearance);

         const alreadyExist = await Characters.findOne({ where: { name: character.name + ' ' + character.lastName } });

         if (alreadyExist) {
            player.sendNotification(Messages.CHARACTER_ALREADY_EXIST, NotifyType.ERROR, 5);
            return;
         } 

         const createdCharacter = await Characters.create(
            { 
               name: character.name + ' ' + character.lastName,
               account_id: player.Account.id,
               origin: character.origin, 
               birth: character.birth, 
               gender: character.gender
            }
         );

         Appearances.create(
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

         createdCharacter.spawnPlayer(player, spawnTypes.default);

         Items.create({ name: itemData.Names.DOCUMENT_ID_CARD, quantity: 1, entity: itemData.Entity.PLAYER, owner: createdCharacter.id }).then(async item => {
            item!.data = {
               name: createdCharacter.name,
               birth: createdCharacter.birth,
               origin: createdCharacter.origin,
               gender: createdCharacter.gender
            };
            await item.save();
         });

         player.sendNotification(Messages.CHARACTER_CREATED, NotifyType.SUCCESS, 4);
         return true;
      },

      'SERVER::CHARACTER:DELETE': async (player: PlayerMp, Char_ID: number) => {
         Characters.findOne({ where: { id: Char_ID } }).then((Character) => { 
            return Character?.destroy()
         })
      },

      'entityModelChange': (entity: EntityMp, oldModel: number) => { 
         if (entity.type == 'player') { 
            (<PlayerMp>entity).call('CLIENT::WEAPON:CONFIG');
         }
      }
   }
);


const interval = 60 * 1000;

async function updatePlayer (player: PlayerMp) {
   
   player.Character.increment('minutes', { by: Config.happyHours == true ? 2 : 1 }).then(async character => { 
      if (character.minutes >= 60) { 
         character.increment('hours', { by: 1 });
         character.minutes = 0;
         await character.save();
      }
   });
   
   player.Character.increment('hunger', { by: -0.35 });
   player.Character.increment('thirst', { by: -0.70 });

   if (player.Character.muted > 0) {
      player.Character.increment('muted', { by: -1 });
   }
}


function minuteCheck() {
   
   const today = new Date();
   if (!Config.freezeTime) {
      mp.world.time.set(today.getHours(), today.getMinutes(), today.getSeconds());
   }

   mp.players.forEach((player: PlayerMp) => {
      if (player.getVariable(entityData.LOGGED) && player.getVariable(entityData.SPAWNED)) {
         updatePlayer(player);
      }
   });
   
   setTimeout(minuteCheck, interval);

};


minuteCheck();