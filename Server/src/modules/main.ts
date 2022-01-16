'use strict';

import Accounts from '../models/account.model';
import Appearances from  '../models/appearance.model';
import Characters from '../models/character.model';
import { Distances, entityData, logType, NotifyType, spawnTypes } from '../globals/enums';
import { Messages, Colors } from '../globals/constants';
import { Config } from '../config';
import Bans from '../models/ban.model';
import { spawnPoint } from '../globals/interfaces';
import { getDefaultSpawn, Logger } from '../utils';


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

               console.log('saved char ' + leavingPlayer.Character.name);
            }
         } catch (e) { 
            Logger(logType.ERROR, 'Saving Character: ' + e);
         }

      },

      'SERVER::CHARACTER:PLAY': async (player: PlayerMp, characterId: number, point: spawnTypes) => {
         const selectedCharacter = await Characters.findOne({ where: { id: characterId }, include: [Appearances]  });
         selectedCharacter?.spawnPlayer(player, point);
      },

      'playerChat': async (player: PlayerMp, Content) => {
         if (player.getVariable(entityData.LOGGED) && player.getVariable(entityData.SPAWNED)) {

            if (player.getVariable(entityData.MUTED)) return; // u are muted

            const character = player.Character;

            player.sendProximityMessage(Distances.IC, character.name + Messages.PERSON_SAYS + Content, Colors.White);
         }
   
         //    if (Player.getVariable('Muted')) return;
   
         //    const Character = await Player.Character();
   
         //    const Name = Player.getVariable('Masked') ? Character.Stranger : Player.name;
   
         //    if (Player.vehicle) { 
   
         //       const vClass = await Player.callProc('client:player.vehicle:class');
         //       if (vClass == 14 || vClass == 13 || vClass == 8) { 
         //          Player.ProximityMessage(Distances.IC, Name + Messages.PERSON_SAYS + Content, Colors.White);
         //       } else { 
   
         //          const Seat = Player.seat;
         //          let Windows = Player.vehicle.getVariable('Windows');
   
         //          if (Windows[Seat]) { 
         //             Player.ProximityMessage(Distances.VEHICLE, Name + Messages.PERSON_SAYS + Content, Colors.White);
   
         //          } else { 
         //             Player.VehicleMessage(Name + Messages.PERSON_SAYS_IN_VEHICLE + Content, Colors.Vehicle);
         //          }
         //       }
   
         //    } else { 
         //       Player.ProximityMessage(Distances.IC, Name + Messages.PERSON_SAYS + Content, Colors.White);
         //    }
   
         // }
      }
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
                     console.log(account.characters);
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
                  console.log('if last')
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

         const Character = JSON.parse(characterInfo);
         const Appearance = JSON.parse(characterAppearance);

         console.log(Character)
         console.log(Appearance)

         const Exist = await Characters.findOne({ where: { name: Character.First_Name + ' ' + Character.Last_Name } });
         if (Exist) return player.sendNotification(Messages.CHARACTER_ALREADY_EXIST, NotifyType.ERROR, 5);

         const createdCharacter = await Characters.create({ 
            name: Character.First_Name + ' ' + Character.Last_Name, account_id: player.Account.id,
            origin: Character.Origin, birth: Character.Birth, gender: Character.Gender
         });


         Appearances.create({
            character_id: createdCharacter.id, character: createdCharacter, face_features: Appearance.Face, blend_data: Appearance.Blend_Data, 
            overlays: Appearance.Overlays, hair: Appearance.Hair, beard: Appearance.Beard, eyes: Appearance.Eyes
         });

         createdCharacter.spawnPlayer(player, spawnTypes.default);

         player.sendNotification(Messages.CHARACTER_CREATED, NotifyType.SUCCESS, 4);
         return true;
      },

      'SERVER::CHARACTER:DELETE': async (player: PlayerMp, Char_ID: number) => {
         Characters.findOne({ where: { id: Char_ID } }).then((Character) => { 
            return Character?.destroy()
         })
      }
   }
);


const interval = 60 * 1000;

async function updatePlayer (Player: PlayerMp) {
   const Character = Player.Character, Account = Player.Account;
   
   Character.increment('minutes', { by: Config.happyHours == true ? 2 : 1 });

   if (Character.minutes >= 60) { 
      await Character.increment('hours', { by: 1 });
      Character.update({ minutes: 0 });
   }

   Character.increment('hunger', { by: -0.35 });
   Character.increment('thirst', { by: -0.70 });

   if (Character.muted > 0) {
      await Character.increment('muted', { by: -1 });
   }
}


function minuteCheck() {
   mp.players.forEach((player: PlayerMp) => {
      if (player.getVariable(entityData.LOGGED) && player.getVariable(entityData.SPAWNED)) {
         updatePlayer(player);
      }
   });
   setTimeout(() => { minuteCheck(); }, interval);
}


minuteCheck();