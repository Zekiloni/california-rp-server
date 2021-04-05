

let Item = require('./Item');
let info = require('./modules/Items');

class Inventory { 
   constructor () { 
      mp.events.add({
         'server:item.drop': (player, item, quantity) => { 

         },

         'server:item.pickup': (player) => { 

         },

         'server:item.use': (player, item) => { 

         },

         'server:item.give': (player, item) => { 

         }
      })
   }

   load = () => { 
   
   }

   create = (player, item) => { 

   }

   destroy = (player, item) => { 
      
   }
}

mp.item = new Inventory();
inventory.load()
