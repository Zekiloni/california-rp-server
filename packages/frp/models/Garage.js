const { DataTypes } = require('sequelize');

const GarageTypes = require('../data/Garages.json')

frp.Garages = frp.Database.define('garage', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Owner: { type: DataTypes.STRING, defaultValue: 0 },
      Type: { type: DataTypes.ENUM,
      values: ['Mala', 'Srednja', 'Velika'] }, // Mala max 1 vozilo, Srednja max 2 vozila, Velika max 4 vozila
      Price: { type: DataTypes.STRING },
      Locked: { type: DataTypes.BOOLEAN, defaultValue: true },
      Entrance: { 
         type: DataTypes.TEXT, defaultValue: null, 
         get: function () { return JSON.parse(this.getDataValue('Entrance')); },
         set: function (value) { this.setDataValue('Entrance', JSON.stringify(value)); }
      },
      Dimension: { type: DataTypes.INTEGER, defaultValue: 0 },
      Veh_Spawn_Positions: { 
         type: DataTypes.TEXT, defaultValue: null, 
         get: function () { return JSON.parse(this.getDataValue('Veh_Spawn_Positions')); },
         //set: function (value) { this.setDataValue('Veh_Spawn_Positions', JSON.stringify(value)); }
      },
      Interior_Dimension: { type: DataTypes.INTEGER, defaultValue: this.id },
      GameObject: { 
         type: DataTypes.VIRTUAL, defaultValue: null,
         get () { return frp.GameObjects.Garages[this.getDataValue('id')]; },
         set (x) { frp.GameObjects.Garages[this.getDataValue('id')] = x; }
      }
   }, {
      // Options
      timestamps: true,
      underscrored: true,
      createdAt: 'Created_Date',
      updatedAt: 'Update_Date',
   }
);


frp.Garages.afterCreate(async (Garage, Options) => {
   Garages.Refresh();
});


frp.Garages.afterDestroy(async (Garage, Options) => {
   if (Garages.GameObject) {
      /* House.GameObject.colshape.destroy();
      House.GameObject.blip.destroy();
      House.GameObject.marker.destroy(); */
   }
});

(async () => {

   await frp.Garages.sync();

   const Garages = await frp.Garages.findAll();
   Garages.forEach((Garage) => {
      Garages.Refresh();
   });

   frp.Main.Terminal(3, Garage.length + ' Garages Loaded !');
})();