'use strict';

import Accounts from '../models/account.model';
import Appearances from  '../models/appearance.model';
import Characters from '../models/character.model';
import { Distances, entityData, NotifyType, spawnTypes } from '../globals/enums';
import { Messages, Colors } from '../globals/constants';
import { Config } from '../config';
import Bans from '../models/ban.model';
import { spawnPoint } from '../globals/interfaces';
import { getDefaultSpawn } from '../utils';


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
               leavingPlayer.Character.Last_Position = leavingPlayer.position;
   
               await leavingPlayer.Character.save();
            }
         } catch (e) { 
            console.log(e)
         }

      },


      'SERVER::CHARACTER:PLAY': async (player: PlayerMp, characterId: number, point: spawnTypes) => {
         console.log('characterid', characterId)
         const Selected = await Characters.findOne({ where: { id: characterId }, include: [Appearances]  });
         Selected?.spawnPlayer(player, point);
      },


      'playerChat': async (player: PlayerMp, Content) => {
         if (player.getVariable(entityData.LOGGED) && player.getVariable(entityData.SPAWNED)) {

            if (player.getVariable(entityData.MUTED)) return; // u are muted

            const character = player.Character;

            player.sendProximityMessage(Distances.IC, character.Name + Messages.PERSON_SAYS + Content, Colors.White);
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
                  const Logged = account.Login(password);
                  if (Logged) { 
                     account.Logged(player, true);
                     resolve(account);
                  } else { 
                     player.Notification(Messages.INCCORRECT_PASSWORD, NotifyType.ERROR, 5);
                  }
               } else { 
                  player.Notification(Messages.USER_DOESNT_EXIST, NotifyType.ERROR, 5);
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
   
               if (character?.Faction) {
                  // push factionn spawn
               }
               
               // if (character?.houses) { }
      
               if (character?.Last_Position) { 
                  console.log(character.Last_Position);
                  spawnPoints.push({
                     name: Messages.LAST_POSITION,
                     type: spawnTypes.lastPosition,
                     description: Messages.LAST_POSITION_DESC,
                     position: character.Last_Position,
                     heading: 0
                  })
               }
               console.log(spawnPoints)
               resolve(spawnPoints);
            });
         });
      },

      'SERVER::CREATOR:FINISH': async (player: PlayerMp, characterInfo: string, characterAppearance: string) => { 

         const Character = JSON.parse(characterInfo);
         const Appearance = JSON.parse(characterAppearance);

         const Exist = await Characters.findOne({ where: { Name: Character.First_Name + ' ' + Character.Last_Name } });
         if (Exist) return player.Notification(Messages.CHARACTER_ALREADY_EXIST, NotifyType.ERROR, 5);

         const createdCharacter = await Characters.create({ 
            Name: Character.First_Name + ' ' + Character.Last_Name, Account_id: player.Account.id,
            Origin: Character.Origin, Birth: Character.Birth, Gender: Character.Gender
         });

         Appearances.create({
            Character_id: createdCharacter.id, Character: createdCharacter, Face_Features: Appearance.Face, Blend_Data: Appearance.Blend_Data, 
            Overlays: Appearance.Overlays, Hair: Appearance.Hair, Beard: Appearance.Beard, Eyes: Appearance.Eyes
         });

         createdCharacter.spawnPlayer(player, spawnTypes.default);

         player.Notification(Messages.CHARACTER_CREATED, NotifyType.SUCCESS, 4);
         return true;
      },

      'SERVER::CHARACTER:DELETE': async (Player: PlayerMp, Char_ID: number) => {
         Characters.findOne({ where: { id: Char_ID } }).then((Character) => { 
            return Character?.destroy()
         })
      }
   }
);
