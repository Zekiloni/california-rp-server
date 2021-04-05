
let Item = require('./Item');
let info = require('./modules/Items');

class Inventory { 
   constructor () { 
      mp.events.add({
         'server:item.drop': (player, item, quantity) => { 

         },

         'server:item.pickup': (player) => { 

         },

         'server:item.use': (player, item) => { 

         },

         'server:item.give': (player, item) => { 

         }
      })
   }

   load = () => { 
   
   }

   create = (player, quantity, item) => { 
      console.log(quantity)
      console.log(item)
      let found = mp.itemList[item];
      if (found) { 
         db.query("INSERT INTO `items` (item, quantity, entity, owner, position, dimension) VALUES (?, ?, ?, ?, ?, ?)", 
            [item, quantity, -1, -1, JSON.stringify(player.position), player.dimension], function(err, result, fields) {

            if (err) return core.terminal(1, 'Creating Item ' + err)
            let id = result.insertId;
            try { 
               let i = new Item(id, { 
                  item: item, entity: -1, owner: -1, position: JSON.stringify(player.position), dimension: player.dimension, quanity: quantity, info: mp.itemList[item]
               })
            } catch (e) { console.log(e) }

         })
      }
   }

   delete = (player, item) => { 

   }

   find = (query) => { 
      mp.items.forEach(item => {
         console.log(item)
      });
   }
}

mp.item = new Inventory();
