

let { ItemRegistry, ItemEntities } = require('./Items.Registry');

require('../models/Item');

class Inventory {
   constructor() {
      mp.events.add({

         'server:player.inventory.item:pickup': async (player) => {
            const Near = await frp.Items.Near(player);
            if (Near) Near.Pickup(player);
         },

         'server:player.inventory.item.weapon:put': async (player, item, ammo) => {
            let Item = await frp.Items.findOne({ where: { id: item } });
            Item.Entity = ItemEntities.Player;
            await Item.save();
         }
      });

      mp.events.addProc({

         'server:player.inventory.item:drop': async (player, item, position, quantity = 1) => {
            return frp.Items.findOne({ where: { id: item } }).then((Item) => { 
               return Item.Drop(player, position, quantity).then((inventory) => { 
                  return inventory;
               });
            });
         },

         'server:player.inventory:get': async (player) => {
            const inventory = await frp.Items.Inventory(player);
            return inventory;
         },

         'server:player.inventory.item:give': async (player, target, item, quantity) => {
            return frp.Items.findOne({ where: { id: item } }).then((Item) => { 
               const Target = mp.players.at(target);
               if (Target) { 
                  return Item.Give(player, Target, parseInt(quantity)).then((inventory) => { 
                     return inventory;
                  });
               } else { 
                  return false;
               }
            });
         },

         'server:player.inventory.item:use': async (player, itemID) => {
            const Item = await frp.Items.findOne({ where: { id: itemID }})
            Item.Use(player).then(async () => { 
               const Inventory = await frp.Items.Inventory(player);
               return Inventory;
            });
         }
      });
   }
}
new Inventory();
