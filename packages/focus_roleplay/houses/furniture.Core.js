const FURNITURE_TYPES = [ 
   { type: 'Living room', name: 'Kauc', model: 'prop_couch_lg_06', price: 200 },
   { type: 'Living room', name: 'Kauc', model: 'prop_couch_lg_08', price: 250 },
   { type: 'Living room', name: 'Fotelja', model: 'p_yacht_chair_01_s', price: 50 }
];

class Furniture {
   constructor(data) {
      this.id = data.id;
      this.model = data.model;
      this.object = data.object;
      this.position = data.position;
      this.rotation = data.rotation;
      this.dimension = data.dimension;

      mp.furniture.push(this);

      this.delete = () => {
         this.object.destroy();
         let x = mp.furniture.indexOf(this);
         mp.furniture.splice(x, 1);
      };
   }
}

var furniture = { 

   load: async () => { 
      let result = await db.aQuery("SELECT * FROM `furniture`");

      result.forEach(function (res) {
         let psJS = JSON.parse(res.position),
             rotJS = JSON.parse(res.rotation);
         let position = new mp.Vector3(psJS.x, psJS.y, psJS.z);
         let rotation = new mp.Vector3(rotJS.x, rotJS.y, rotJS.z);
         
         let p = new Furniture({
            id: res.id,
            model: res.model,
            position: position,
            rotation: rotation,
            dimension: res.dimension
         });
      });
      core.terminal(3, `${result.length} custom furniture loaded !`);
   },

   save: async (furniture) => { 
      let pos = JSON.stringify(furniture.object.position);
      let rot = JSON.stringify(furniture.object.rotation);

      var values = {
            model: furniture.model,
            position: pos,
            rotation: rot,
            dimension: furniture.dimension,
      };

      await db.query("UPDATE `furniture` SET ? WHERE `id` = ?", [values, furniture.id], function (error, results, fields) {
         if (error) return core.terminal(1, `Furniture saving ${error}`);
      });
   },
}

module.exports = furniture;