'use strict';

import { Globals } from '../Global/Globals';
import { Messages } from '../Global/Messages';
import Accounts from '../Models/Account.model';
//import Bans from '../Models/Ban';
import Characters from '../Models/Character';
import Appearances from  '../Models/Appearance';
import { Settings } from '../Server/Settings';

// mp.events.addCommand("veh", (player, full, hash, color = "255,255,255", color2 = "0,0,0") => {
//    if (player.vehicle) return;
//    let c1 = color.split(','), c2 = color2.split(',');
//    const veh = mp.vehicles.new(mp.joaat(hash), player.position, {});
//    veh.setColorRGB(parseInt(c1[0]), parseInt(c1[1]), parseInt(c1[2]), parseInt(c2[0]), parseInt(c2[1]), parseInt(c2[2]));
//    veh.alpha = 255;
//    veh.dimension = player.dimension;
//    veh.numberPlate = 'ADMIN';
//    veh.engine = true;
//    player.putIntoVehicle(veh, 0);
// });


mp.events.add(
   {
      'playerJoin': async (Player: PlayerMp) => {
         //const Banned = await Bans.Check(Player);
         //if (Banned) Player.kick('Bannedovan');
      },

      'SERVER::CHARACTER:PLAY': async (Player: PlayerMp, CHARACTER_ID: number) => {
         //console.log('Selected character is ' + CHARACTER_ID);
         const Selected = await Characters.findOne({ where: { id: CHARACTER_ID } });
         //console.log(Selected);
         Selected?.Spawn(Player);
      }
   }
);


mp.events.addProc(
   {

      'SERVER::PLAYER:LOBY': (Player: PlayerMp) => { 
         Player.dimension = Player.id;
         return Settings.Lobby;
      },


      'SERVER::CREATOR:INFO': (Player: PlayerMp) => { 
         return Settings.Creator;
      },


      'SERVER::AUTHORIZATION:VERIFY': async (Player: PlayerMp, Username: string, Password: string): Promise<{Account: Accounts, Characters: Characters[]}> => {
         return new Promise((resolve) => {
            Accounts.findOne({ where: { Username: Username }, include: [Characters] }).then((Account) => { 
               if (Account) { 
                  const Logged = Account.Login(Password);
                  if (Logged) { 
                     Account.Logged(Player, true);
                     console.log(Account.Characters)
                     resolve({ Account: Account, Characters: Account.Characters });
                  } else { 
                     Player.Notification(Messages.INCCORRECT_PASSWORD, Globals.Notification.Error, 5);
                  }
               } else { 
                  Player.Notification(Messages.USER_DOESNT_EXIST, Globals.Notification.Error, 5);
               }
            });
         });
      },


      'SERVER::CREATOR:FINISH': async (Player: PlayerMp, Char_Info: string, Char_Appearance: string) => { 

         console.log('Usao');
         const Character = JSON.parse(Char_Info);
         const Appearance = JSON.parse(Char_Appearance);

         const Exist = await Characters.findOne({ where: { Name: Character.First_Name + ' ' + Character.Last_Name } });
         if (Exist) return Player.Notification(Messages.CHARACTER_ALREADY_EXIST, Globals.Notification.Error, 5);

         Characters.create({ 
            Name: Character.First_Name + ' ' + Character.Last_Name, Account_id: Player.Account.id,
            Origin: Character.Origin, Birth: Character.Birth, Gender: Character.Gender
         });

         Appearances.create({
            Face_Features: Appearance.Face, Blend_Data: Appearance.Blend_Data, Overlays: Appearance.Overlays, 
            Hair: Appearance.Hair, Beard: Appearance.Beard, Eyes: Appearance.Eyes
         });

         Player.Notification(Messages.CHARACTER_CREATED, Globals.Notification.Succes, 4);
      },


      'server:player.character:delete': async (Player: PlayerMp, Char_ID: number) => {
         Characters.findOne({ where: { id: Char_ID } }).then((Character) => { 
            return Character?.destroy()
         })
      }
   }
);
