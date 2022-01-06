
'use strict';

import Accounts from '../models/account.model';
import Appearances from  '../models/appearance.model';
import Characters from '../models/character.model';
import { Distances, NotifyType } from '../enums';
import { Messages, Colors } from '../constants';
import { Config } from '../config';


mp.events.add(
   {
      'playerJoin': async (Player: PlayerMp) => {
         //const Banned = await Bans.Check(Player);
         //if (Banned) Player.kick('Bannedovan');
      },

      'SERVER::CHARACTER:PLAY': async (Player: PlayerMp, characterId: number) => {
         const Selected = await Characters.findOne({ where: { id: characterId } });
         Selected?.Spawn(Player);
      },

      'playerChat': async (Player, Content) => {
         if (Player.data.logged && Player.data.spawned) {
   
            if (Player.getVariable('Muted')) return;
   
            const Character = await Player.Character();
   
            const Name = Player.getVariable('Masked') ? Character.Stranger : Player.name;
   
            if (Player.vehicle) { 
   
               const vClass = await Player.callProc('client:player.vehicle:class');
               if (vClass == 14 || vClass == 13 || vClass == 8) { 
                  Player.ProximityMessage(Distances.IC, Name + Messages.PERSON_SAYS + Content, Colors.White);
               } else { 
   
                  const Seat = Player.seat;
                  let Windows = Player.vehicle.getVariable('Windows');
   
                  if (Windows[Seat]) { 
                     Player.ProximityMessage(Distances.VEHICLE, Name + Messages.PERSON_SAYS + Content, Colors.White);
   
                  } else { 
                     Player.VehicleMessage(Name + Messages.PERSON_SAYS_IN_VEHICLE + Content, Colors.Vehicle);
                  }
               }
   
            } else { 
               Player.ProximityMessage(Distances.IC, Name + Messages.PERSON_SAYS + Content, Colors.White);
            }
   
         }
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


      'SERVER::AUTHORIZATION:VERIFY': async (Player: PlayerMp, Username: string, Password: string): Promise<Accounts> => {
         return new Promise((resolve) => {
            Accounts.findOne({ where: { Username: Username }, include: [Characters] }).then((Account) => { 
               if (Account) { 
                  const Logged = Account.Login(Password);
                  if (Logged) { 
                     Account.Logged(Player, true);
                     resolve(Account);
                  } else { 
                     Player.Notification(Messages.INCCORRECT_PASSWORD, NotifyType.ERROR, 5);
                  }
               } else { 
                  Player.Notification(Messages.USER_DOESNT_EXIST, NotifyType.ERROR, 5);
               }
            });
         });
      },

      'SERVER::CREATOR:FINISH': async (Player: PlayerMp, Char_Info: string, Char_Appearance: string) => { 

         const Character = JSON.parse(Char_Info);
         const Appearance = JSON.parse(Char_Appearance);

         const Exist = await Characters.findOne({ where: { Name: Character.First_Name + ' ' + Character.Last_Name } });
         if (Exist) return Player.Notification(Messages.CHARACTER_ALREADY_EXIST, NotifyType.ERROR, 5);

         const createdCharacter = await Characters.create({ 
            Name: Character.First_Name + ' ' + Character.Last_Name, Account_id: Player.Account.id,
            Origin: Character.Origin, Birth: Character.Birth, Gender: Character.Gender
         });

         Appearances.create({
            Character: createdCharacter.id, Face_Features: Appearance.Face, Blend_Data: Appearance.Blend_Data, 
            Overlays: Appearance.Overlays, Hair: Appearance.Hair, Beard: Appearance.Beard, Eyes: Appearance.Eyes
         });

         createdCharacter.Spawn(Player);

         Player.Notification(Messages.CHARACTER_CREATED, NotifyType.SUCCESS, 4);
      },

      'SERVER::CHARACTER:DELETE': async (Player: PlayerMp, Char_ID: number) => {
         Characters.findOne({ where: { id: Char_ID } }).then((Character) => { 
            return Character?.destroy()
         })
      }
   }
);
