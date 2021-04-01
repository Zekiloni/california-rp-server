

mp.houses = {};

class House { 
   constructor (data) { 
      this.id = data.id;
      this.type = data.type;
      this.interor = data.interor;
      this.entrance = data.entrance;
      this.dimension = data.dimension;
      this.interior = data.interor;
      this.intDimenson = this.id;
      this.ipl = data.ipl;

      // this.colshape = mp.colshapes.new
      // this.colshape.house = this.id;
      // this.blip =

      mp.houses[this.id] = this;
   }

   delete () { 
      this.blip.destroy();
      this.colshape.destroy();
      delete mp.houses[this.id];
   }
}

class Houses { 
   new = () => { 
      
   }

   delete = (house) => { 

   }

   buy = (player, house) => { 

   }

   
}

mp.house = new Houses();

