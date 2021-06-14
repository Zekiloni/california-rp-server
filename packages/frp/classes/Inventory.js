

let { ItemRegistry, ItemEntities } = require('./Items.Registry');

let Items = require('../models/Item');


class Inventory {
   constructor() {
      mp.events.add({
         'server:player.inventory.item:drop': async (player, item, position, quantity = 1) => {
            const Item = await frp.Items.findOne({ where: { id: item } });
            Item.Drop(player, position, quantity);
         },

         'server:player.inventory.item:pickup': async (player) => {
            console.log('aaa')
            let Near = await frp.Items.Near(player);
            if (Near) {
               Near.Pickup(player);
            }
         },

         'server:player.inventory.item:give': async (player, target, item, quantity = 1) => {
            target = mp.players.at(target);
            if (target) {
               const Item = await frp.Items.findOne({ where: { id: item } });
               Item.Give(player, target, quantity);
            }
         },

         'server:player.inventory.item.weapon:take': async (player, item) => {
            let Item = await frp.Items.findOne({ where: { id: item } });
            Item.Entity = ItemEntities.Wheel;
            let Weapon = ItemRegistry[Item.item].weapon;
            player.giveWeapon(mp.joaat(Weapon), Item.Ammo);
            await Item.save();
         },

         'server:player.inventory.item.weapon:put': async (player, item, ammo) => {
            let Item = await frp.Items.findOne({ where: { id: item } });
            Item.Entity = ItemEntities.Player;
            await Item.save();
         }
      });

      mp.events.addProc({
         'server:player.inventory:get': async (player) => {
            const Inventory = await frp.Items.Inventory(player);
            console.log(Inventory)
            return Inventory;
         },

         'server:player.inventory:use': async (player, item) => {
            const Inventory = await frp.Items.Inventory(player);
            console.log(Inventory)
            return Inventory;
         }
      });
   }
}
new Inventory();
