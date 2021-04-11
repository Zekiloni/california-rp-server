

let info = require('./modules/ItemRegistry');

class Item { 
   constructor (id, data) { 
      this.id = id;
      this.item = data.item;
      this.entity = data.entity || -1;
      this.owner = data.owner || -1;
      this.quantity = data.quantity;
      this.position = JSON.parse(data.position);
      this.dimension = data.dimension || 0;
      this.object = data.object || null;
      this.colshape = null;
      this.extra = data.extra || null;

      if (this.entity == -1) { 
         this.object = mp.objects.new(this.info.hash, new mp.Vector3(this.position.x, this.position.y, this.position.z - 0.93),
         {
            rotation: new mp.Vector3(-90, 0, 0),
            alpha: 255,
            dimension: this.dimension
         });
         this.object.item = this.id;
      }

      mp.items[this.id] = this;
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
            player.call('client:inventory.toggle', [true])
         },

         'server:item.drop': (player, item, quantity) => { 
            let nearItem = this.near(player),
                name = mp.items[item].item;
            
            if (nearItem) {
               if (nearItem.item == name) {
                  nearItem.quantity += quantity;
                  delete mp.items[item];
               }
            }
            else {
               this.create(player, quantity, name);              
            }
         },

         'server:item.pickup': (player) => { 
            let nearItem = this.near(player),
                hasItem = this.hasItem(player);
            
            if (nearItem) {
               if (hasItem) {
                  hasItem.quanity += nearItem.quanity;
                  hasItem.entity = INVENTORY_ENTITIES.Player;
                  nearItem.delete();
                  // Update
               }
               else {
                  nearItem.owner = player.character;
                  nearItem.entity = INVENTORY_ENTITIES.Player;
                  nearItem.destroy();
                  // Update 
               }
               
            } 

         },

         'server:item.use': (player, item) => { 
            item = mp.items[item];
            if (item) { 
               if (item.quantity > 0) item.quantity --; 
               else delete item;

               item.use(player)
            }
         },

         'server:item.give': (player, target, item, quantity = 1) => { 
            item = mp.items[item];
            target = mp.players.at(target);
            if (!target) return;

            if (item) { 
               if (item.quantity < quantity) return player.notification('Nemate tu količinu', 'error', 3);

               if (quantity > 1) { 
                  if (item.quantity > 1) { 
                     item.quantity --;
                  } else { 
                     delete mp.items[item.id];
                  }
                  item.owner = target.character;

               } else { 

               }
            }
         }
      })
   }

   load = () => { 
   
   }

   create = (player, quantity, item, entity) => { 
      let found = mp.ItemRegistry[item];
      if (found) { 
         db.query("INSERT INTO `items` (item, quantity, entity, owner, position, dimension) VALUES (?, ?, ?, ?, ?, ?)", 
            [item, quantity, entity, player.character, JSON.stringify(player.position), player.dimension], function(err, result, fields) {

            if (err) return core.terminal(1, 'Creating Item ' + err)
            let id = result.insertId;
            try { 
               let i = new Item(id, { 
                  item: item, entity: -1, owner: -1, position: JSON.stringify(player.position), dimension: player.dimension, quanity: quantity
               })
            } catch (e) { console.log(e) }
         })
      }
   }

   remove = (itemId) => { 
      let found = mp.items[itemId];
      if (found) { 
         db.query("DELETE FROM `items` WHERE id = ?", [itemId], function(err, result, fields) {
            if (err) return core.terminal(1, 'Remove Item ' + err);
            delete mp.items[itemId];
         })
      }
   }

   update = (item) => {
      db.query("UPDATE `item` SET quantity = ?, entity = ?, owner = ?, position = ?, dimension = ? WHERE id = ?", 
            [item.quanity, item.entity, item.owner, JSON.stringify(item.position), item.dimension, item.id], function(err, result, fields) {
            if (err) return core.terminal(1, 'Update Item ' + err);
      });
   }

   near = (player) => { 
      let result = null;
      mp.objects.forEach(object => {
         if (object.item) { 
            if (player.disct(object.position) < 2.5) { 
               result = mp.items[object.item];
            }
         }
      });

      return result;
   }

   hasItem = (player, item) => { 
      for (let i of mp.items) { 
         if (mp.items[i].item == item) { 
            if (mp.items[i].owner == player.character) { 
               return mp.items[i];
            } else return false;
         } else return false;
      }
   }
}

mp.items = {};
mp.item = new Inventory();