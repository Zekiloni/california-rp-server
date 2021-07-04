'use strict';

require('../models/Account');

mp.events.add({
   'playerJoin': async (player) => {
      const Banned = await frp.Bans.Check(player);
      if (Banned) player.kick('Bannedovan');
      player.call('client:player.login:show');
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
      return new Promise(async (resolve, reject) => { 
         const Account = await frp.Accounts.findOne({ where: { Username: username } });
         if (Account) {
            console.log('Akaunt pronadjen');
            const Logged = Account.Login(password);
            console.log('Logged status ' + Logged);
            if (Logged) {
               console.log('Uso');
               frp.Characters.findAll({ where: { Account: Account.id } }).then((Characters) => { 
                  console.log(Account);
                  player.account = Account.id;
                  resolve({ Account: Account, Characters: Characters });
               });
            } else {
               console.log(frp.Globals.messages.INCCORRECT_PASSWORD);
               reject(frp.Globals.messages.INCCORRECT_PASSWORD);
            }
         } else {
            console.log(frp.Globals.messages.USER_DOESNT_EXIST);
            reject(frp.Globals.messages.USER_DOESNT_EXIST);
         }
      });
   },

   'server:player.character:delete': async (player, character) => {
      const Character = await frp.Characters.findOne({ where: { id: character } });
      let response = await Character.destroy();
      return response;
   }
});
