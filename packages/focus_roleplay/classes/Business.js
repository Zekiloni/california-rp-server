
const businessTypes = require('../configs/Business.json')

mp.business = {};

class Biz { 
   constructor (id, data) { 
      this.id = id;
      this.name = data.name;
      this.type = data.type;
      this.price = data.price;
      this.owner = data.owner;
      this.products = data.products || 100;
      this.budget = data.budget || 0;
      this.dimension = data.dimension || 0;
      this.interiorDimension = data.interiorDimension || -1;
      this.entrance = data.entrance;
      this.ipl = data.ipl || '';
      this.workers = data.workers || [];   
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
   create = (player, type, price) => {
      let position = player.position;
      //if(type > businessTypes.length) return player.notification(MSG_INVALID_business_TYPE, NOTIFY_ERROR, 4); OVO U KOMANDI
      db.query('INSERT INTO `business` (type, price, dimension, entrance, ipl) VALUES (?, ?, ?, ?, ?)', 
         [type, price, player.dimension, JSON.stringify(position), JSON.stringify(businessTypes[type].ipl)], function (error, results, fields) {
            if (error) return core.terminal(1, 'Business creating ' + error);
            let business = new Biz(results.insertId, { type: type, name: businessTypes[type].name, price: price, owner: -1, dimension: player.dimension, entrance: position, ipl: businessTypes[type].ipl, interiorDimension: results.insertId })
      });
   }

   load() {
      let counter = 0;
      db.query("SELECT * from `business`", function(error, results, fields) { 
         if (error) return core.terminal(1, 'Loading business ' + error);
         results.forEach(result => {
            let business = new Biz(result.id, { type: result.type, name: result.name, price: result.price, owner: result.owner, dimension: result.dimension, entrance: JSON.parse(result.entrance), ipl: JSON.parse(results.ipl), interiorDimension: result.id }) // entrance: JSON.parse(result.entrance), type: result.type, price: result.price, dimension: result.dimension, ipl: result.ipl, interior: result.interior, intDimension: result.intDimension
            counter ++;
         });
         core.terminal(3, counter + ' business loaded')
      })
   }

   delete = (id) => { 
      db.query("DELETE * FROM `business` WHERE `id` = ?", [id], function (error, results, fields) {
            if (error) return core.terminal(1, 'Business deleting ' + error);
            delete mp.business[id];
      });
   }

   update = (business) => {

      let values = {
         owner: business.owner,
         price: business.price,
         budget: business.budget
      }
      db.query('UPDATE `business` SET ? WHERE `id` = ?', [values, business.id], function (err, result) {
            if (err) return core.terminal(1, 'Updating Business Error ' + err)
      });
   }
}

mp.biz = new Business();