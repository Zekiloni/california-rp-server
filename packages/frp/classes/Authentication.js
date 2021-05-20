

'use strict';

mp.events.add({
   'playerJoin': (player) => { 
      player.call('client:player.login:show');
      
   },

   'playerReady': (player) => {
      player.dimension = player.id + 1;
   },

   'server:player.character:select': async (player, id) => { 
      let character = await frp.Characters.findOne({ where: { id: id } });
      if (character) { 
         character.Spawn(player);
      }
   }
})



mp.events.addProc({
   'server:player.login:credentials': async (player, username, password) => {
      let result = false;
      let Account = await frp.Accounts.findOne({ where: { Username: username } });
      if (Account) { 

         // let success = Account.login(password);
         // console.log(success)
         // if (success) { 

         //    let characters = await frp.Characters.findAll({ where: { Account: Account.id } });
         //    player.account = Account.id;
         //    result = { Account: Account, Characters: characters };

         // } else { 
         //    result = false;
         // }
      } else { 
         result = false;
      }
      return result;
   },

   'server:player.character:delete': async (player, character) => { 
      const Character = await frp.Characters.findOne({ where: { id: character } });
      let response = await Character.destroy();
      return response;
   }
});

