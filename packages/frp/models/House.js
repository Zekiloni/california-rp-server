const { DataTypes } = require('sequelize');


frp.Houses = frp.Database.define('house', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Owner: { type: DataTypes.STRING, defaultValue: 0 },
      Type: { type: DataTypes.STRING },
      Price: { type: DataTypes.STRING },
      Locked: { type: DataTypes.BOOLEAN, defaultValue: true },
      
      Position: { 
         type: DataTypes.TEXT, defaultValue: null, 
         get: function () { return JSON.parse(this.getDataValue('Position')); },
         set: function (value) { this.setDataValue('Position', JSON.stringify(value)); }
      },
      Dimension: { type: DataTypes.INTEGER, defaultValue: 0 },
      Interior_Position: { 
         type: DataTypes.TEXT, defaultValue: null, 
         get: function () { return JSON.parse(this.getDataValue('Interior_Position')); },
         set: function (value) { this.setDataValue('Interior_Position', JSON.stringify(value)); }
       },
      Interior_Dimension: { type: DataTypes.INTEGER, defaultValue: this.id },
      IPL: { type: DataTypes.STRING },

      Rent: { type: DataTypes.INTEGER, defaultValue: 0 },
      Tenants: { 
         type: DataTypes.TEXT, defaultValue: null, 
         get: function () { return JSON.parse(this.getDataValue('Tenants')); },
         set: function (value) { this.setDataValue('Tenants', JSON.stringify(value)); }
      },

      Money: { type: DataTypes.INTEGER, defaultValue: 0 },
      Sale: { type: DataTypes.INTEGER, defaultValue: 0 },
      Sale_Price: { type: DataTypes.INTEGER, defaultValue: 0 }
   }, {
      // Options
      timestamps: true,
      underscrored: true,
      createdAt: "Created_Date",
      updatedAt: "Update_Date",
   }
);


frp.Houses.prototype.Init = function () {
   if (this.colshape && this.blip) return;
   const Position = this.Position;

   this.colshape = mp.colshapes.newRectangle(Position.x, Position.y, 3, 2, 0);
   this.colshape.house = this.id;
   this.blip = mp.blips.new(40, new mp.Vector3(Position.x, Position.y, Position.z), { dimension: this.Dimension, name: 'Kuca', color: 36, shortRange: true });

   this.Refresh();
};


frp.Houses.prototype.Refresh = function () {
   this.Owner == 0 ? (this.blip.color = 1) : (this.blip.color = 2);
   this.Owner == 0 ? (this.blip.name = 'Kuca na prodaju !') : (this.blip.name = 'Kuca');
};

frp.Houses.New = async function (player, type, price) { 
   const Position = player.position;
   const House = await frp.Houses.create({ Type: type, Price: price, Position: Position });
   House.Init();
;};


(async () => {

   frp.Houses.sync();

   const Houses = await frp.Houses.findAll();
   Houses.forEach((House) => {
      House.Init();
   });

   frp.Main.Terminal(3, Houses.length + ' Houses Loaded !');
})();
