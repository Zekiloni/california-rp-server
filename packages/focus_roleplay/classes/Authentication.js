
class Authentication { 
   constructor() { 
      mp.events.add({
         'playerJoin:': (player) => { 

         },

         'server:authentication.check': (player, username, password) => { 
            db.query('SELECT `password` FROM `users` WHERE ')
         },
      })
   }
}

new Authentication;

const auth = { 
   show: (player, toggle) => { 
      player.call('client:authenticaton.show', [toggle]);
   },

   load: (player) => { 

   }
}