

let { ItemEntities, ItemType } = require('./modules/Items');


class Inventory { 
   constructor () { 
      mp.events.add({
         'server:inventory.get': (player) => { 
            let inventory = [], weapons = [];
            for (let i in mp.items) { 
               if (mp.items[i].entity == ItemEntities.Player) { 
                  if (mp.items[i].owner == player.character) { 
                     inventory.push({ id: mp.items[i].id, type: mp.ItemRegistry[mp.items[i].item].type, name: mp.items[i].item, hash: mp.ItemRegistry[mp.items[i].item].hash, quantity: mp.items[i].quantity })
                  }
               }

               if (mp.items[i].entity == ItemEntities.Wheel) { 
                  if (mp.items[i].owner == player.character) { 
                     weapons.push({ id: mp.items[i].id, name: mp.items[i].item, hash: mp.ItemRegistry[mp.items[i].item].hash })
                  }
               }
            }

            player.call('client:inventory.toggle', [true, inventory, weapons])
         },

         'server:weapon.select': (player, key, weapon) => { 
            let weapons = [];
            for (let i in mp.items) { 
               if (mp.items[i].entity == ItemEntities.Wheel) { 
                  if (mp.items[i].owner == player.character) { 
                     let ammo = player.allWeapons[mp.joaat(mp.ItemRegistry[mp.items[i].item].weapon)];
                     weapons.push({ id: mp.items[i].id, name: mp.items[i].item, hash: mp.ItemRegistry[mp.items[i].item].weapon, ammo: mp.items[i].ammo })
                  }
               }
            }
            // player.removeAllWeapons();
            let selected = weapons[key];
            player.giveWeapon(mp.joaat(selected.hash), selected.ammo);
         },

         'server:item.clothing': (player, index) => { 
            let undressed = { 1: 0, 11: 15, 8: 15, 4: 61, 6:34 }, character = mp.characters[player.character], clothing = null,
               dressed = player.getClothes(parseInt(index));

            switch (index) { 
               case 1: { clothing = character.clothing.mask; break; }
               case 11: { clothing = character.clothing.shirt; break; }
               case 8: { clothing = character.clothing.undershirt; break; }
               case 4: { clothing = character.clothing.legs; break; }
               case 6: { clothing = character.clothing.shoes; break; }
            }

            if (dressed.drawable == undressed[index]) { 
               player.setClothes(parseInt(index), parseInt(clothing[0]), parseInt(clothing[1]), 2);
            } else { 
               if (index == 8 || index == 11) player.setClothes(3, 15, 0, 2);
               player.setClothes(parseInt(index), undressed[index], 0, 2);
            }
         },



         'server:item.use': (player, id) => { 
            let item = mp.items[id];
            if (item) { 

               if (mp.ItemRegistry[item.item].type == ItemType.Ammo) { 
            
               }

               if (mp.ItemRegistry[item.item].type !== ItemType.Weapon) {
                  item.quantity --;
                  if (item.quantity < 1) { delete mp.items[item.id]; }
               }

               if (mp.ItemRegistry[item.item].type == ItemType.Weapon) { 
                  item.entity = ItemEntities.Wheel;
               }

               if (mp.ItemRegistry[item.item].ammo > 0) { 
                  mp.ItemRegistry[item.item].use(player, mp.ItemRegistry[item.item].ammo);
               } else { 
                  mp.ItemRegistry[item.item].use(player);
               }

               this.update(item);
            }
         },

         'server:item.give': (player, target, item, quantity = 1) => { 
            item = mp.items[item];
            target = mp.players.at(target);
            if (!target) return;

            if (item) { 
               if (item.quantity < quantity || quantity < 0) return player.notification('Nemate tu količinu', 'error', 3);
               let hasItem = this.hasItem(target.character, item.name);
               if (hasItem) {
                  mp.items[hasItem].quantity += quantity;
                  delete mp.items[item];
                  hasItem.refresh();
               } else {
                  this.create(target, quantity, item.name, ItemEntities.Player, target.character);
                  delete mp.items[item];
               }
            }
         },

         'server:item.weapon.put': (player, weapon) => { 
            let item = mp.items[weapon];
            item.entity = ItemEntities.Player;
         }
      })
   }



}

mp.items = {};
mp.item = new Inventory();
mp.item.load();

