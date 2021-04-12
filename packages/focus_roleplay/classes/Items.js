

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
         console.log('zemlja')
      } else { 
         if (this.object) { 
            this.object.destroy();
            console.log('nije zemlja')

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
                hasItem = this.hasItem(player, nearItem.item);
            
            if (nearItem) {
               if (hasItem) {
                  hasItem.quanity += nearItem.quanity;
                  hasItem.entity = ItemEntities.Player;
                  nearItem.refresh();
                  console.log('podigao imao vec tem')
               }
               else {
                  nearItem.owner = player.character;
                  nearItem.entity = ItemEntities.Player;
                  nearItem.refresh();
                  console.log('podigao nije imao item')
               }              

               this.update(nearItem)
            } 
         },

         'server:item.use': (player, item) => { 
            item = mp.items[item];
            if (item) { 
               item.quantity --;
               if (item.quantity < 1) { delete mp.items[item.id]; }
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
                  item.quantity --;
                  if (item.quantity < 1) { delete mp.items[item.id]; }
                  item.owner = target.character;
                  // da kreira novi item ukoliko ovaj da ceo item a ovaj nema item ISKORISTI this.create samo je doteraj za potrebne parametre da je entity ovaj...
               } else { 
                  
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
               position: JSON.parse(result.position), dimension: result.dimension, extra: result.extra
            });
            item.refresh();
            counter ++;
         });
         core.terminal(3, counter + ' Items loaded')
      })
   }

   create = (player, quantity, item, entity = -1, owner = -1) => { 
      let found = mp.ItemRegistry[item];
      if (found) { 
         db.query("INSERT INTO `items` (item, quantity, entity, owner, position, dimension) VALUES (?, ?, ?, ?, ?, ?)", 
            [item, quantity, entity, player.character, JSON.stringify(player.position), player.dimension], function(err, result, fields) {

            if (err) return core.terminal(1, 'Creating Item ' + err)
            let id = result.insertId;
            try { 
               let i = new Item(id, { 
                  item: item, entity: entity, owner: player.character, position: JSON.stringify(player.position), dimension: player.dimension, quanity: quantity
               })
               i.refresh();
            } catch (e) { console.log(e) }
         })
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
      db.query("UPDATE `items` SET quantity = ?, entity = ?, owner = ?, position = ?, dimension = ? WHERE id = ?", 
            [item.quanity, item.entity, item.owner, JSON.stringify(item.position), item.dimension, item.id], function(err, result, fields) {
            if (err) return core.terminal(1, 'Update Item ' + err);
      });
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
