'use strict';

const { DataTypes } = require('sequelize');


frp.Vehicles = frp.Database.define('Vehicle', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Model: { type: DataTypes.STRING },
      Owner: { type: DataTypes.INTEGER, defaultValue: 0 },
      Locked: { type: DataTypes.BOOLEAN, defaultValue: false },
      Numberplate: { type: DataTypes.STRING, defaultValue: null },
      Fuel: { type: DataTypes.INTEGER, defaultValue: 100 },
      Dirt: { type: DataTypes.INTEGER, defaultValue: 0 },
      Mileage: { type: DataTypes.DOUBLE, defaultValue: 0.00 },
      Color: { 
         type: DataTypes.TEXT, defaultValue: null,
         get: function () { return JSON.parse(this.getDataValue('Color')); },
         set: function (value) { this.setDataValue('Color', JSON.stringify(value)); }  
      },
      Components: { 
         type: DataTypes.TEXT, defaultValue: null,
         get: function () { return JSON.parse(this.getDataValue('Components')); },
         set: function (value) { this.setDataValue('Components', JSON.stringify(value)); } 
      },
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


frp.Vehicles.prototype.Window = function (vehicle, index) { 
   this.windows[index] != this.windows[index];
   vehicle.setVariable('Windows', this.windows)
};


frp.Vehicles.prototype.Paint = async function (primary, secondary) { 
   this.Color = [primary, secondary];
   this.vehicle.setColorRGB(primary[0], primary[1], primary[2], secondary[0], secondary[1], secondary[2]);
   await this.save();
};


frp.Vehicles.prototype.Lock = async function () {
   this.Locked = !this.Locked;
   this.vehicle.locked = this.Locked;
   await this.save();
};


frp.Vehicles.prototype.Numberplate = function () { 
   const Plate = frp.Main.GenerateString(6);
   this.Numberplate = Plate;
   this.vehicle.numberPlate = Plate;
   await this.save();
};

frp.Vehicles.prototype.SetFuel = function (value) { 
   this.Fuel = value;
   this.vehicle.setVariable('Fuel', this.Fuel);
   await this.save();
};

frp.Vehicles.prototype.SetDirt = function (value) { 
   this.Dirt = value;
   this.vehicle.setVariable('Dirt', this.Dirt);
   await this.save();
};

frp.Vehicles.prototype.SetMileage = function (value) { 
   this.Mileage = value;
   this.vehicle.setVariable('Mileage', this.Mileage);
   await this.save();
};

frp.Vehicles.prototype.Window = function (i) { 
   this.Windows[i] = !this.Windows[i];
   this.vehicle.setVariable('Windows', this.Windows);
};

frp.Vehicles.prototype.Tune = function () { 
   const Components = this.Components;
   Components.forEach(component => {
      this.vehicle.setMod(component.index, component.value);
   });
};
 
frp.Vehicles.Create = function () { 

};


(async () => { 
   frp.Vehicles.sync();
})();

