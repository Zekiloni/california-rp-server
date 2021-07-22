'use strict';

import { Messages } from '../Globals/Messages';
import Accounts from '../Models/Account';
import Characters from '../Models/Character';
import Character from '../Models/Character';


mp.events.add({
   'playerJoin': async (Player: PlayerMp) => {
      const Banned = await frp.Bans.Check(Player);
      if (Banned) Player.kick('Bannedovan');
   },

   'playerReady': (Player: PlayerMp) => {
      Player.dimension = Player.id + 1;
   },

   'server:player.character:select': async (Player: PlayerMp, CHARACTER_ID: number) => {
      const Selected = await Character.findOne({ where: { id: CHARACTER_ID } });
      Selected?.Spawn(Player);
   }
});

mp.events.addProc({
   'SERVER::AUTHORIZATION:VERIFY': async (Player: PlayerMp, Username: string, Password: string) => {
      console.log('Verify')
      return new Promise((resolve, reject) => {
         Accounts.findOne({ where: { Username: Username } }).then((Account) => { 
            if (Account) { 
               const Logged = Account.Login(Password);
               if (Logged) { 
                  console.log('logged');
                  Characters.findAll({ where: { Account: Account.id } }).then((Characters) => { 
                     Player.ACCOUNT_ID = Account.id;
                     resolve({ Account: Account, Characters: Characters });
                  });
               } else { 
                  reject(Messages.INCCORRECT_PASSWORD);
               }
            } else { 
               reject(Messages.USER_DOESNT_EXIST);
            }
         });
      });
   },

   'server:player.character:delete': async (Player: PlayerMp, Char_ID: number) => {
      Characters.findOne({ where: { id: Char_ID } }).then((Character) => { 
         return Character?.destroy()
      })
   }
});
