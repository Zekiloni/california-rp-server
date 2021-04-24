const PLANTS = require('./../configs/Plants.json');

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
         this.object = null;

         mp.plants[this.id] = this;
      }
   }

   delete () { 
      if (this.object) this.object.destroy();
      delete mp.plants[this.id];
   }
}

