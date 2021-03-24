

let Item = require('./Item');
let info = require('./Items');

class Inventory { 
   constructor () { 
      mp.events.add({
         'server:itemDrop': (player, item, quantity) => { 

         },

         'server:itemPickup': (player) => { 

         },

         'server:itemUse': (player, item) => { 

         },

         'server:itemGive': (player, item) => { 

         }
      })
   }

   load = () => { 
      db.query('SELECT * FROM `inventory`', function (error, results, fields) { 
         if (error) return core.terminal(1, error)
         let counter = 0;
         if (results.length > 0) { 
            results.forEach(result => {
               let item = INVENTORY_ITEMS[result.name];
               counter ++;
               try { 
                  new Item({
                     id: result.id,
                     name: result.name,
                     hash: item.hash,
                     type: item.type,
                     quantity: result.quantity,
                     entity: result.entity,
                     dimension: result.dimension,
                     position: result.position,
                     extra: result.extra,
                  });
               } catch (e) { 
                  console.log(e)
               }
            });
         }
         core.terminal(3, counter + ' Items loaded')
      })
   }

   item = { 
      create: (player, data) => { 
      }
   }
}

let inventory = new Inventory();
inventory.load()
