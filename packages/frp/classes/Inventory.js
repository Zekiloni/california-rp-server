

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
                  ItemRegistry[Item.name].use(player, Item.Number);
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

         'server:player.inventory.weapon:put': (Player, Item) => { 
            return frp.Items.findOne({ where: { id: Item } }).then((Weapon) => { 
               return Weapon.Disarm(Player).then((Inventory) => { 
                  return Inventory;
               }) 
            });
         },

         'server:player.inventory:get': async (Player) => {
            const Inventory = await frp.Items.Inventory(Player);
            const NearbyVehicle = await frp.Vehicles.Nearest(Player.position, 3.3);
            if (NearbyVehicle && NearbyVehicle.getVariable('Trunk') == true) { 
               console.log(NearbyVehicle);
               const Trunk = await frp.Items.Trunk(NearbyVehicle);
               Player.call('client:inventory.vehicle:trunk', [NearbyVehicle.id, Trunk]);
            }
            return Inventory;
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

         'server:inventory.item:trunk': async (Player, vehicle, item) => { 
            const Item = await frp.Items.findOne({ where: { id: item } });
            const Vehicle = mp.vehicles.at(vehicle);
            if (Vehicle.Database) { 
               Item.Entity = ItemEntities.Vehicle;
               Item.Owner = Vehicle.Database;
            } else { 
               Item.Entity = ItemEntities.TemporaryVehicle;
               Item.Owner = Vehicle.id;
            }
            await Item.save();

            const Trunk = await frp.Items.Trunk(Vehicle);
            const Inventory = await frp.Items.Inventory(Player);

            return [Inventory, Trunk];
         },

         'server:inventory.item.trunk:get': async (Player, vehicle, id) => { 
            const Item = await frp.Items.findOne({ where: { id: id } });
            const Vehicle = mp.vehicles.at(vehicle);

            Item.Entity = ItemEntities.Player;
            Item.Owner = Player.character;
            await Item.save();

            const Trunk = await frp.Items.Trunk(Vehicle);
            const Inventory = await frp.Items.Inventory(Player);

            return [Inventory, Trunk];
         },

         'server:player.inventory.item:use': async (player, itemid) => {
            const Item = await frp.Items.findOne({ where: { id: itemid }})
            return Item.Use(player).then((inventory) => { 
               return inventory;
            });
         },

         'server:player.inventory.item:unequip': async (player, itemid) => { 
            try  { 
               const Item = await frp.Items.findOne({ where: { id: itemid } });
               return Item.Unequip(player);
            } catch (e) { 
               console.log(e)
            }
         }
      });
   }
}


new Inventory();

