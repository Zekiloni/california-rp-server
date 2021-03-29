

mp.business = {};

class Biz { 
   constructor (id, name, d) { 
      this.id = id;
      this.name = name;
      this.price = d.price;
      this.owner = d.owner;
      this.products = d.products;
      this.entrance = d.entrance;
      this.interior = d.interior;
      this.workers = d.workers;

      // this.colshape = mp.colshapes.new
      // this.blip = 

   }

   delete () { 
      this.colshape.destroy();
      this.blip.destroy();
      delete mp.business[this.id];
   }
}

class Business { 
   new = () => { 

   }

   delete = (id) => { 
      
   }
}

mp.biz = new Business();