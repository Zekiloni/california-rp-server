
const businessTypes = require('../configs/Business.json')

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

      this.price = data.price || 2500;
      this.owner = data.owner || -1;

      this.colshape = mp.colshapes.newRectangle(this.entrance.x, this.entrance.y, 3, 2, 0);
      this.colshape.business = this.id;
      this.blip = mp.blips.new('business ' + this.id, new mp.Vector3(this.entrance.x, this.entrance.y, this.entrance.z), { name: 'business', color: 36, shortRange: true });

   }

   delete () { 
      this.colshape.destroy();
      this.blip.destroy();
      delete mp.business[this.id];
   }
}

class Business { 
   new = (player, type, price) => { 
      db.query('INSERT INTO `business', [], function (err, result, fields) { 
         
      })
   }

   delete = (id) => { 
      
   }
}

mp.biz = new Business();

