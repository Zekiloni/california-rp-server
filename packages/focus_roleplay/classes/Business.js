
const businessTypes = require('../configs/Business.json')

mp.business = {};

class Biz { 
   constructor (id, name, data) { 
      this.id = id;
      this.name = name;
      this.type = data.type;
      this.price = data.price;
      this.owner = data.owner;
      this.products = data.products;
      this.entrance = data.entrance;
      this.interior = data.interior;
      this.workers = data.workers;      
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
      let position = player.position;
      //if(type > businessTypes.length) return player.notification(MSG_INVALID_BUSSINES_TYPE, NOTIFY_ERROR, 4); OVO U KOMANDI
      db.query("INSERT INTO `bussines` (type, name, price, owner, dimension, entrance, interior, workers, ipl, products) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
         [type, businessTypes[type].name, price, -1, player.dimension, JSON.stringify(position), JSON.stringify(info.interior), -1, info.ipl, 100], function (error, results, fields) {
            if (error) return core.terminal(1, 'Business creating ' + error);
            let business = new Biz(results.insertId, { type: type, name: businessTypes[type].name, price: price, owner: -1, dimension: player.dimension, entrance: position, ipl: businessTypes[type].ipl, interior: info.interior, intDimension: results.insertId })
      });
   }

   load() {
      let counter = 0;
      db.query("SELECT * from `business`", function(error, results, fields) { 
         if (error) return core.terminal(1, 'Loading business ' + error);
         results.forEach(result => {
            let business = new Biz(result.id, 
               { entrance: JSON.parse(result.entrance), type: result.type, price: result.price, dimension: result.dimension, ipl: result.ipl, interior: result.interior, intDimension: result.intDimension })
            counter ++;
         });
         core.terminal(3, counter + ' business loaded')
      })
   }

   delete = (id) => { 
      db.query("DELETE * FROM `business` WHERE `id` = ?", [id], function (error, results, fields) {
            if (error) return core.terminal(1, 'Business deleting ' + error);
            mp.biz[id] = null;
      });
   }
}

mp.biz = new Business();

