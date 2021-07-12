

const { DataTypes } = require('sequelize');

const HouseTypes = require('../data/Houses.json')

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
      On_Sale: { type: DataTypes.INTEGER, defaultValue: 0 },
      GameObject: { 
         type: DataTypes.VIRTUAL, defaultValue: null,
         get () { return frp.GameObjects.Houses[this.getDataValue('id')]; },
         set (x) { frp.GameObjects.Houses[this.getDataValue('id')] = x; }
      }
   }, {
      // Options
      timestamps: true,
      underscrored: true,
      createdAt: 'Created_Date',
      updatedAt: 'Update_Date',
   }
);


frp.Houses.afterCreate(async (House, Options) => {
   House.Refresh();
});


frp.Houses.afterDestroy(async (House, Options) => {
   if (House.GameObject) {
      House.GameObject.colshape.destroy();
      House.GameObject.blip.destroy();
      House.GameObject.marker.destroy();
   }
});


frp.Houses.prototype.Refresh = function () {

   if (this.GameObject == null) { 
      const GameObjects = { 
         colshape: mp.colshapes.newSphere(this.Position.x, this.Position.y, this.Position.z, 1.8, this.Dimension),
         blip: mp.blips.new(40, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z), { dimension: this.Dimension, name: 'House', color: 59, shortRange: true, scale: 0.75, drawDistance: 25 }),
         marker: mp.markers.new(27, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z - 0.98), 1.8, {
            color: frp.Globals.MarkerColors.Houses, 
            rotation: new mp.Vector3(0, 0, 90), 
            visible: true, 
            dimension: this.Dimension
         })
      };


      GameObjects.colshape.OnPlayerEnter = (player) => { 

         const white = frp.Globals.Colors.whitesmoke;

         player.SendMessage('[House] !{' + white + '} Kucaraaa ', frp.Globals.Colors.property);
      };

      this.GameObject = GameObjects;
   } else { 
      const BlipColor = this.Owner == 0 ? 49 : 52;   
      this.GameObject.blip.color = BlipColor;
   }
};


frp.Houses.Create = async function (player, type, price) { 
   if (HouseTypes[type]) { 
      type = HouseTypes[type];
      const Position = player.position;
      const House = await frp.Houses.create({ Type: type.id, Price: price, Position: Position });
   }
;};



(async () => {

   await frp.Houses.sync();

   const Houses = await frp.Houses.findAll();
   Houses.forEach((House) => {
      House.Refresh();
   });

   frp.Main.Terminal(3, Houses.length + ' Houses Loaded !');
})();
