
let Item = require('./Item');
let info = require('./modules/Items');

class Inventory { 
   constructor () { 
      mp.events.add({
         'server:inventory.get': (player) => { 
            player.call('client:inventory.toggle', [true])
         },

         'server:item.drop': (player, item, quantity) => { 

         },

         'server:item.pickup': (player) => { 

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
                     delete item;
                  }
                  item.owner = mp.characters[target.character];

               } else { 

               }
            }
         }
      })
   }

   load = () => { 
   
   }

   create = (player, quantity, item) => { 
      let found = mp.ItemRegistry[item];
      if (found) { 
         db.query("INSERT INTO `items` (item, quantity, entity, owner, position, dimension) VALUES (?, ?, ?, ?, ?, ?)", 
            [item, quantity, -1, -1, JSON.stringify(player.position), player.dimension], function(err, result, fields) {

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

   delete = (player, item) => { 

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
}

mp.item = new Inventory();
