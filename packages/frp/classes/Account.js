'use strict';

require('../models/Account');

mp.events.add({
   'playerJoin': async (player) => {
      const Banned = await frp.Bans.Check(player);
      if (Banned) player.kick('Bannedovan');
      if (player) player.call('client:player.login:show');
   },

   'playerReady': (player) => {
      player.dimension = player.id + 1;
   },

   'server:player.character:select': async (player, selected) => {
      const Character = await frp.Characters.findOne({ where: { id: selected } });
      if (Character) Character.Spawn(player);
   }
});

mp.events.addProc({
   'server:player.login:credentials': async (player, username, password) => {
      return new Promise((resolve, reject) => {
         frp.Accounts.findOne({ where: { Username: username } }).then((Account) => { 
            if (Account) { 
               const Logged = Account.Login(password);
               if (Logged) { 
                  frp.Characters.findAll({ where: { Account: Account.id } }).then((Characters) => { 
                     player.account = Account.id;
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
