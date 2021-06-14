'use strict';

let Accounts = require('../models/Account');
let Bans = require('../models/Ban');

mp.events.add({
   'playerJoin': (player) => {
      player.call('client:player.login:show');
   },

   'playerReady': (player) => {
      player.dimension = player.id + 1;
   },

   'server:player.character:select': async (player, selected) => {
      const character = await frp.Characters.findOne({ where: { id: selected } });
      if (character) character.Spawn(player);
   }
});

mp.events.addProc({
   'server:player.login:credentials': async (player, username, password) => {
      let account = await frp.Accounts.findOne({ where: { Username: username } });
      if (account) {
         let success = await account.login(password);
         if (success) {
            let characters = await frp.Characters.findAll({ where: { Account: account.id } });
            player.account = account.id;
            return await { Account: account, Characters: characters };
         } else {
            return false;
         }
      } else {
         return false;
      }

   },

   'server:player.character:delete': async (player, character) => {
      const Character = await frp.Characters.findOne({ where: { id: character } });
      let response = await Character.destroy();
      return response;
   }
});
