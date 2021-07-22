'use strict';

require('../models/Account');

mp.events.add({
   'playerJoin': async (Player) => {
      const Banned = await frp.Bans.Check(Player);
      if (Banned) Player.kick('Bannedovan');
   },

   'playerReady': (Player) => {
      Player.dimension = Player.id + 1;
   },

   'server:player.character:select': async (Player, Selected) => {
      frp.Characters.findOne({ where: { id: Selected } }).then((Character) => { Character.Spawn(Player); });
   }
});

mp.events.addProc({
   'SERVER::AUTHORIZATION:VERIFY': async (Player, Username, Password) => {
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

   'server:player.character:delete': async (player, character) => {
      const Character = await frp.Characters.findOne({ where: { id: character } });
      let response = await Character.destroy();
      return response;
   }
});
