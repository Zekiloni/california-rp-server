

let types = require('../configs/Houses.json');

mp.houses = {};

class House { 
   constructor (id, data) { 
      this.id = id;
      this.price = data.price || 2500;
      this.owner = data.owner || -1;
      this.type = data.type || 0;
      this.locked = data.locked || 0;
      this.entrance = data.entrance;
      this.dimension = data.dimension || 0;
      this.interior = data.interior;
      this.intDimenison = data.intDimension;
      this.ipl = data.ipl;
      this.rent = data.rent || 0;

      // mp.world.requestIpl(this.ipl);

      this.colshape = mp.colshapes.newRectangle(this.entrance.x, this.entrance.y, 3, 2, 0);
      this.colshape.house = this.id;
      this.blip = mp.blips.new(40, new mp.Vector3(this.entrance.x, this.entrance.y, this.entrance.z), { dimension: this.dimension, name: 'Kuca', color: 36, shortRange: true });

      mp.houses[this.id] = this;
   }

   delete () { 
      this.blip.destroy();
      this.colshape.destroy();
      delete mp.houses[this.id];
   }

   refresh () { 
      let colors = [1, 2]
      this.owner == -1 ? ( this.blip.color = colors[0] ) : ( this.blip.color = color[1] );
      this.owner == -1 ? ( this.blip.name = 'Kuca na prodaju !' ) : ( this.blip.name = 'Kuca' );
   }
}

class Houses { 
   constructor () { 
      mp.events.add({
         'playerEnterColshape': (player, shape) => { 
            if (player.vehicle) return;
            if (shape.house) { 
               player.near = { type: 'house', id: shape.house };
               let house = mp.houses[shape.house];
               if (house) { 
                  if (house.owner != -1) { 
                     player.message('C0F0B6', `Kuca id ${house.id}`)
                  } else { 
                     player.message('C0F0B6', `Kuća na prodaju ! Cena ${house.price}$.`)
                  }
               }
            }
         },

         'playerExitColshape': (player, shape) => {
            if (player.near) { 
               player.near = null;
            }
         }
      })
   }

   load = () => { 
      let counter = 0;
      db.query("SELECT * from `houses`", function(error, results, fields) { 
         if (error) return core.terminal(1, 'Loading Houses ' + error);
         results.forEach(result => {
            let house = new House(result.id, 
               { entrance: JSON.parse(result.entrance), type: result.type, price: result.price, dimension: result.dimension, ipl: result.ipl, interior: result.interior, intDimension: result.intDimension })
            house.refresh();
            counter ++;
         });
         core.terminal(3, counter + ' Houses loaded')
      })
   }

   new = (player, type, price) => { 
      let info = types[type];
      let position = player.position;
      db.query("INSERT INTO `houses` (type, price, dimension, entrance, interior, ipl) VALUES (?, ?, ?, ?, ?, ?)", 
         [type, price, player.dimension, JSON.stringify(position), JSON.stringify(info.interior), info.ipl], function (error, results, fields) {
            if (error) return core.terminal(1, 'House creating ' + error);
            let house = new House(results.insertId, 
               { entrance: position, type: type, price: price, dimension: player.dimension, ipl: info.ipl, interior: info.interior, intDimension: results.insertId })
            house.refresh();
      });
   }

   delete = (house) => { 
      db.query("DELETE FROM `houses` WHERE `id` = ?", [house.id], function (error, results, fields) {
         if (error) return core.terminal(1, 'House deleting ' + error);
         house.delete();
     });
   }

   buy = (player, house) => { 

   }

   
}

mp.house = new Houses();
mp.house.load();

