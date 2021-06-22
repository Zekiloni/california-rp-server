

let { ItemRegistry, ItemEntities } = require('./Items.Registry');

require('../models/Item');
require('../models/Channel');


class Inventory {
   constructor() {
      mp.events.add({

         'server:player.inventory.item:pickup': async (player) => {
            const Near = await frp.Items.Near(player);
            if (Near) Near.Pickup(player);
         },

         'server:player.inventory.item.weapon:take': async (player, key) => {
            if (key == 666) { 
               if (frp.Main.Size(player.allWeapons) > 1) { 
                  player.removeAllWeapons();
              }
            } else { 
               const Weapons = await frp.Items.Weapons(player);
               if (Weapons.length > 0 && Weapons[key]) { 
                  const Item = Weapons[key];
                  ItemRegistry[Item.name].use(player, Item.ammo);
               }
            }
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

         'server:player.inventory.weapon:put': (player, item) => { 
            return frp.Items.findOne({ where: { id: item } }).then((Weapon) => { 
               return Weapon.Disarm(player).then((inventory) => { 
                  return inventory;
               }) 
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
            return Item.Use(player).then((inventory) => { 
               return inventory;
            });
         }
      });
   }
}


new Inventory();

