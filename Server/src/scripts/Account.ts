'use strict';

require('../models/Account');

mp.events.add({
   'playerJoin': async (Player: PlayerMp) => {
      const Banned = await frp.Bans.Check(Player);
      if (Banned) Player.kick('Bannedovan');
   },

   'playerReady': (Player: PlayerMp) => {
      Player.dimension = Player.id + 1;
   },

   'server:player.character:select': async (Player: PlayerMp, Selected: number) => {
      frp.Characters.findOne({ where: { id: Selected } }).then((Character) => { Character.Spawn(Player); });
   }
});

mp.events.addProc({
   'SERVER::AUTHORIZATION:VERIFY': async (Player: PlayerMp, Username: string, Password: string) => {
      console.log('Verify')
      return new Promise((resolve, reject) => {
         frp.Accounts.findOne({ where: { Username: Username } }).then((Account) => { 
            if (Account) { 
               console.log('ACcount found');
               const Logged = Account.Login(Password);
               if (Logged) { 
                  console.log('logged');
                  frp.Characters.findAll({ where: { Account: Account.id } }).then((Characters) => { 
                     Player.account = Account.id;
                     resolve({ Account: Account, Characters: Characters });
                  });
               } else { 
                  reject(frp.Globals.messages.INCCORRECT_PASSWORD);
               }
            } else { 
               reject(frp.Globals.messages.USER_DOESNT_EXIST);
            }
         });
      });
   },

   'server:player.character:delete': async (Player: PlayerMp, Char_ID: number) => {
      const Character = await frp.Characters.findOne({ where: { id: Char_ID } });
      let response = await Character.destroy();
      return response;
   }
});
