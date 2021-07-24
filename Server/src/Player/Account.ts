'use strict';

import { Globals } from '../Global/Globals';
import { Messages } from '../Global/Messages';
import Accounts from '../Models/Account';
import Bans from '../Models/Ban';
import Characters from '../Models/Character';
import Character from '../Models/Character';
import { Settings } from '../Server/Settings';


mp.events.add(
   {
      'playerJoin': async (Player: PlayerMp) => {
         const Banned = await Bans.Check(Player);
         if (Banned) Player.kick('Bannedovan');
      },

      'server:player.character:select': async (Player: PlayerMp, CHARACTER_ID: number) => {
         const Selected = await Character.findOne({ where: { id: CHARACTER_ID } });
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


      'SERVER::AUTHORIZATION:VERIFY': async (Player: PlayerMp, Username: string, Password: string): Promise<{Account: Accounts, Characters: Characters[]}> => {
         return new Promise((resolve) => {
            Accounts.findOne({ where: { Username: Username } }).then((Account) => { 
               if (Account) { 
                  const Logged = Account.Login(Password);
                  if (Logged) { 
                     Characters.findAll({ where: { Account: Account.id } }).then((Characters) => { 
                        Player.ACCOUNT_ID = Account.id;
                        resolve({ Account: Account, Characters: Characters });
                     });
                  } else { 
                     Player.Notification(Messages.INCCORRECT_PASSWORD, Globals.Notification.Error, 5);
                  }
               } else { 
                  Player.Notification(Messages.USER_DOESNT_EXIST, Globals.Notification.Error, 5);
               }
            });
         });
      },

      'server:player.character:delete': async (Player: PlayerMp, Char_ID: number) => {
         Characters.findOne({ where: { id: Char_ID } }).then((Character) => { 
            return Character?.destroy()
         })
      }
   }
);
