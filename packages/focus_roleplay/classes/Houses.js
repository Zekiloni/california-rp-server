

mp.houses = {};

class House { 
   constructor (data) { 
      this.id = data.id;
      this.type = data.type || 0;
      this.entrance = data.entrance;
      this.dimension = data.dimension || 0;
      this.interior = data.interor;
      this.intDimenson = this.id;
      this.ipl = data.ipl;

      this.colshape = mp.colshapes.newRectangle(this.entrance.x, this.entrance.y, 3, 2, 0);
      this.colshape.house = this.id;
      this.blip = mp.blips.new('House ' + this.id, new mp.Vector3(this.entrance.x, this.entrance.y, this.entrance.z), { name: 'House', color: 36, shortRange: true });

      mp.houses[this.id] = this;
   }

   delete () { 
      this.blip.destroy();
      this.colshape.destroy();
      delete mp.houses[this.id];
   }
}

class Houses { 
   constructor () { 
      mp.events.add({
         'playerEnterColshape': (player, shape) => { 
            if (shape.house) { 
               player.near = { type: 'house', id: shape.house }
            }
         },

         'playerExitColshape': (player, shape) => {
            if (player.near) { 
               player.near = null;
            }
         }
      })
   }


   new = (player, type, price) => { 
      let position = player.position;
      let house = new House({
         entrance: position
      })
   }

   delete = (house) => { 

   }

   buy = (player, house) => { 

   }

   
}

mp.house = new Houses();

