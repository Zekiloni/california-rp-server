
let Items = require('./Items.Registry');
let Item = require('../models/Item');


class Inventory { 

   constructor () { 
      mp.events.add({
         'server:player.inventory.item:drop': (player, item) => { 

         },

         'server:player.inventory.item:pickup': async (player) => { 
            let Near = await frp.Items.Near(player);
            if (Near) { 
               await Near.Pickup();
            }
         },

         'server:player.inventory.item:give': async (player, target, item, quantity = 1) => { 
            target = mp.players.at(target);
            if (target) {
               let Item = await frp.Items.findOne({ where: { id: item }});
               Item.Give(player, target, quantity);
            }
         }

      })

      mp.events.addProc({
         'server:player.inventory:open': async (player) => {
            let Inventory = await frp.Items.Inventory(player);
            return Inventory;
         }
      });
   } 
}

new Inventory();