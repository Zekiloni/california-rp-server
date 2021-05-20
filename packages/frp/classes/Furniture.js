const { DataTypes } = require("sequelize/types");


frp.Furnitures = frp.Database.define('Furniture', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      House: { type: DataTypes.INTEGER, allowNull: false },
      Name: { type: DataTypes.STRING },
      Model: { type: DataTypes.STRING, allowNull: false },
      Position: { type: DataTypes.TEXT },
      Rotation: { type: DataTypes.TEXT },
      Dimension: { type: DataTypes.INTEGER, defaultValue: this.House },
   },

   {
      timestamps: true,
      underscrored: true,
      createdAt: true,
      updatedAt: true
   }
);

(async () => { 
   frp.Furnitures.sync();
})


mp.furniture = [];

const FURNITURE_TYPES = [ 
   { type: 'Dnevna soba', name: 'Kauc', model: 'prop_couch_lg_06', price: 200 },
   { type: 'Dnevna soba', name: 'Kauc', model: 'prop_couch_lg_08', price: 250 },
   { type: 'Dnevna soba', name: 'Fotelja', model: 'p_yacht_chair_01_s', price: 50 }
];

class Furniture {
   constructor(data) {
      this.id = data.id;
      this.owner = data.owner;
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

let furniture = { 

   load: async () => { 
      let result = await db.aQuery("SELECT * FROM `furniture`");

      result.forEach(function (res) {
         let psJS = JSON.parse(res.position),
             rotJS = JSON.parse(res.rotation);
         let position = new mp.Vector3(psJS.x, psJS.y, psJS.z);
         let rotation = new mp.Vector3(rotJS.x, rotJS.y, rotJS.z);

         let p = new Furniture({
            id: res.id,
            owner: res.owner,
            model: res.model,
            position: position,
            rotation: rotation,
            dimension: res.dimension
         });
      });
      core.terminal(3, `${result.length} namestaja ucitano !`);
   },

   save: (furniture) => { 
      let pos = JSON.stringify(furniture.object.position);
      let rot = JSON.stringify(furniture.object.rotation);

      var values = {
            position: pos,
            rotation: rot,
            dimension: furniture.dimension,
      };

      db.query("UPDATE `furniture` SET ? WHERE `ID` = ?", [values, furniture.id], function (error, results, fields) {
         if (error) return core.terminal(1, `Furniture saving ${error}`);
      });
   },

   create: (player, furniture) => { 
      db.query("INSERT INTO `furniture` (owner, model, position, rotation, dimension) VALUES (?, ?, ?, ?, ?)", [player.name, furniture.model, furniture.position, furniture.rotation, furniture.dimension], function (error, results, fields) {
         if (error) return core.terminal(1, error);
         player.notification(`Namestaj kreiran i postavljen.`, NOTIFY_SUCCESS, 4);
         let p = new Furniture({
            id: results.insertId,
            owner: results.owner,
            model: furniture.model,
            position: furniture.position,
            rotation: furniture.rotation,
            dimension: furniture.dimension
         });
     });
   },

   delete: (furniture) => { 
      db.query("DELETE FROM `furniture` WHERE `ID` = ?", [furniture.id], function (error, results, fields) {
         if (error) return core.terminal(1, error);
         furniture.delete();
     });
   },

   getAllOwnedFurniture: (player) => {
      let furniture = mp.furniture.find( ({owner}) => owner === player.name);
      if(items !== null) {
         let furnJson = JSON.stringify(furniture);
         return furnJson;
      }
      else {
         player.notification(MSG_NO_FURNITURE_OWNED, NOTIFY_ERROR, 4); 
      }
   }
}
