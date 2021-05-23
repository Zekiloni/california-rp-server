'use strict';

const { DataTypes } = require('sequelize');


frp.Vehicles = frp.Database.define('Vehicle', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Model: { type: DataTypes.STRING },
      Owner: { type: DataTypes.INTEGER, defaultValue: 0 },
      Locked: { type: DataTypes.BOOLEAN, defaultValue: false },
      Position: {
         type: DataTypes.TEXT, defaultValue: null,
         get: function () { return JSON.parse(this.getDataValue('Position')); },
         set: function (value) { this.setDataValue('Position', JSON.stringify(value)); }
      },
      Rotation: {
         type: DataTypes.TEXT, defaultValue: null,
         get: function () { return JSON.parse(this.getDataValue('Rotation')); },
         set: function (value) { this.setDataValue('Rotation', JSON.stringify(value)); }
      }
   }, {
      timestamps: true,
      underscrored: true,
      createdAt: "Created_Date",
      updatedAt: "Update_Date",
   }
);


// paint (vehicle, color) {
//    this.color = color;
//    vehicle.setColorRGB(parseInt(color[0][0]), parseInt(color[0][1]), parseInt(color[0][2]), parseInt(color[1][0]), parseInt(color[1][1]), parseInt(color[1][2]));
// }

// Fuel (vehicle, value) { 
//    this.fuel = value;
//    vehicle.setVariable('Fuel', this.fuel);
// }

// Mileage (vehicle, value) { 
//    this.mileage = value;
//    vehicle.setVariable('Mileage', this.mileage);
// }

// Dirt (vehicle, value) { 
//  this.dirt = value;
//  vehicle.setVariable('Dirt', this.dirt)
// }

// tune (vehicle, components) { 
//    components.forEach(component => { vehicle.setMod(component.index, component.value) })
// }  

frp.Vehicles.prototype.Window = function (vehicle, index) { 
   this.windows[index] != this.windows[index];
   vehicle.setVariable('Windows', this.windows)
};


frp.Vehicles.prototype.Lock = function (vehicle) {
   this.Locked = !this.Locked;
   vehicle.setVariable('Locked', this.Locked);
};


frp.Vehicles.Create = function () { 

};


(async () => { 
   frp.Vehicles.sync();
})();

