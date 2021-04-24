const PlantTypes = require('./../configs/Plants.json');

mp.plants = {};

class Plant {
   constructor (id, plant, owner, position, dimension, progress) { 
      if (id && plant) { 
         this.id = id;
         this.plant = plant;
         this.owner = owner;
         this.position = position;
         this.dimension = dimension || 0;
         this.progress = progress || 0;
         this.exist = true;
         this.object = mp.objects.new(PlantTypes[this.plant].hash, new mp.Vector3(this.position.x, this.position.y, this.position.z), { alpha: 255, dimension: this.dimension });
         this.colshape = mp.colshapes.newRectangle(this.position.x, this.position.y, 3, 2, 0);

         mp.plants[this.id] = this;
      }
   }

   delete () { 
      if (this.object) this.object.destroy();
      if (this.colshape) this.colshape.destroy();
      delete mp.plants[this.id];
   }
}

class Plants { 

   load () { 

   }


   create (player, plant) { 
      db.query("query", [], function (error, result, fields) { 
         if (error) return core.termnial(1, 'Plant Error ' + error)
      })
      let plant = new Plant();
   }

   delete (plant) { 

   }

   update (plant) { 
      let values = { 

      }

   }
}

mp.plant = new Plants();
mp.plant.load();

