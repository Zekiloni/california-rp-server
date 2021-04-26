

let { ItemEntities, ItemType } = require('./modules/ItemRegistry');

class Item { 
   constructor (id, data) { 
      this.id = id;
      this.item = data.item;
      this.entity = data.entity;
      this.owner = data.owner || -1;
      this.quantity = data.quantity;
      this.position = data.position;
      this.dimension = data.dimension || 0;
      this.object = data.object || null;
      this.colshape = null;
      this.extra = data.extra || null;
      this.ammo = data.ammo;

      mp.items[this.id] = this;
   }

   refresh () { 
      if (this.entity == -1) { 
         this.object = mp.objects.new(mp.ItemRegistry[this.item].hash, new mp.Vector3(this.position.x, this.position.y, this.position.z - 0.93),
         {
            rotation: new mp.Vector3(-90, 0, 0),
            alpha: 255,
            dimension: this.dimension
         });
         this.object.item = this.id;
         this.object.notifyStreaming = true;
      } else { 
         if (this.object) { 
            this.object.destroy();
         }
      }
   }

   destroy () { 
      this.object.destroy();
      this.object = null;
   }

   delete () {
      if (this.object != null) {
         this.object.destroy();
         this.object = null;
      }
      delete mp.items[this.id];
   }
}

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

         'server:item.drop': (player, itemID, quantity) => { 
            let nearItem = this.near(player),
               item = mp.items[itemID];
            

            if (nearItem) {
               if (nearItem.item == item.item) {
                  nearItem.quantity += quantity;
                  delete mp.items[item];
               }
            }
            else {
               item.entity = ItemEntities.Ground;
               item.owner = -1;
               item.position = player.position;
               item.refresh();

               //this.create(player, quantity, name);              
            }
         },

         'server:item.pickup': (player) => { 
            let nearItem = this.near(player);
            
            if (nearItem) {
               let hasItem = this.hasItem(player, nearItem.item);

               if (hasItem) {
                  hasItem.quantity += nearItem.quantity;
                  hasItem.entity = ItemEntities.Player;
                  nearItem.refresh();
                  delete mp.items[nearItem.id];
               }
               else {
                  nearItem.owner = player.character;
                  nearItem.entity = ItemEntities.Player;
                  nearItem.refresh();
               }              

               this.update(nearItem)
            } 
         },

         'server:item.use': (player, id) => { 
            let item = mp.items[id];
            if (item) { 
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
         }
      })
   }

   load = () => { 
      let counter = 0;
      db.query("SELECT * from items", function (err, results, fields) { 
         if (err) return core.terminal(1, 'Loading Items ' + err);
         results.forEach(result => {
            let item = new Item(result.id, { 
               item: result.item, entity: result.entity, owner: result.owner, quantity: result.quantity, 
               position: JSON.parse(result.position), dimension: result.dimension, extra: result.extra, ammo: result.ammo
            });
            item.refresh();
            counter ++;
         });
         core.terminal(3, counter + ' Items loaded')
      })
   }

   create = (player, quantity, name, entity = -1, owner = -1) => { 
      let found = mp.ItemRegistry[name];
      if (found) { 
         db.query("INSERT INTO `items` (item, quantity, entity, owner, position, dimension) VALUES (?, ?, ?, ?, ?, ?)", 
            [found.name, quantity, entity, owner, JSON.stringify(player.position), player.dimension], function(err, result, fields) {

            if (err) return core.terminal(1, 'Creating Item ' + err);
            let id = result.insertId;
            let i = new Item(id, { 
               item: found.name, entity: entity, owner: owner, position: player.position, dimension: player.dimension, quantity: quantity
            })
            i.refresh();
         })
      }
   }

   clear = function (player) { 
      for (let i in mp.items) { 
         if (mp.items[i].entity == ItemEntities.Player) { 
            if (mp.items[i].owner == player.character) { 
               this.remove(mp.items[i]);
            }
         }
      }
   }

   remove = (item) => { 
      let found = mp.items[item.id];
      if (found) { 
         db.query("DELETE FROM `items` WHERE id = ?", [item.id], function(err, result, fields) {
            if (err) return core.terminal(1, 'Remove Item ' + err);
            delete mp.items[item.id];
         })
      }
   }

   update = (item) => {
      if (item.quantity > 0) { 
         db.query("UPDATE `items` SET quantity = ?, entity = ?, owner = ?, position = ?, dimension = ?, ammo = ? WHERE id = ?", 
            [item.quantity, item.entity, item.owner, JSON.stringify(item.position), item.dimension, item.ammo, item.id], function(err, result, fields) {
            if (err) return core.terminal(1, 'Update Item ' + err);
         });
      } else { 
         db.query("DELETE FROM `items` WHERE id = ?", [item.id], function(err, result, fields) {
            if (err) return core.terminal(1, 'Remove Item ' + err);
            delete mp.items[item.id];
         })
      }

   }

   near = (player) => { 
      let result = null;
      mp.objects.forEach(object => {
         if (object.item) { 
            if (player.dist(object.position) < 2.5) { 
               result = mp.items[object.item];
            }
         }
      });
      return result;
   }

   hasItem = (char, item) => { 
      let result = false;
      for (let i in mp.items) {
         if (mp.items[i].entity == ItemEntities.Player && mp.items[i].owner == char) { 
            if (mp.items[i].item == item) { 
               result = mp.items[i];
            }
         }
      }
      return result;
   }
}

mp.items = {};
mp.item = new Inventory();
mp.item.load();

