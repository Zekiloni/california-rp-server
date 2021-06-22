'use strict';

const { DataTypes } = require('sequelize');


frp.Vehicles = frp.Database.define('vehicle', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Model: { type: DataTypes.STRING },
      Owner: { type: DataTypes.INTEGER, defaultValue: 0 },
      Locked: { type: DataTypes.BOOLEAN, defaultValue: false },
      Numberplate: { type: DataTypes.STRING, defaultValue: null },
      Fuel: { type: DataTypes.FLOAT(3, 1), defaultValue: 99 },
      Dirt: { type: DataTypes.INTEGER, defaultValue: 0 },
      Heading: { type: DataTypes.INTEGER, defaultValue: 0 },
      Mileage: { type: DataTypes.FLOAT, defaultValue: 0.0 },
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
      },

      Parking: {
         type: DataTypes.TEXT, defaultValue: null,
         get: function () { return JSON.parse(this.getDataValue('Parking')); },
         set: function (value) { this.setDataValue('Parking', JSON.stringify(value)); }
      },
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


frp.Vehicles.prototype.Respawn = function () { 
   if (this.vehicle) { 
      this.vehicle.position = new mp.Vector3(this.Parking.x, this.Parking.y, this.Parking.z);;
      this.vehicle.setHeading(this.Heading);
   }
}


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


frp.Vehicles.prototype.SetNumberplate = async function () { 
   const Plate = frp.Main.GenerateString(6);
   this.Numberplate = Plate;
   this.vehicle.numberPlate = Plate;
   await this.save();
};

frp.Vehicles.prototype.SetFuel = async function (value) { 
   this.Fuel = value;
   this.vehicle.setVariable('Fuel', this.Fuel);
   await this.save();
};

frp.Vehicles.prototype.SetDirt = async function (value) { 
   this.Dirt = value;
   this.vehicle.setVariable('Dirt', this.Dirt);
   await this.save();
};

frp.Vehicles.prototype.SetMileage = async function (value) { 
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

frp.Vehicles.prototype.Park = async function (position = null) { 
   if (this.vehicle) { 
      if (position) this.Parking = position;
      this.vehicle.destroy();
      await this.save();
   }
};

 
frp.Vehicles.Create = async function (model, owner, position) {
   const VehicleModel = await frp.Vehicles.create({ Model: model, Owner: owner, Position: position });
   const Vehicle = mp.vehicles.new(mp.game.joaat(model), position,
   {
      heading: 180,
      numberPlate: 'AAAA', // NAPRAVITI FUNKCIJU ZA LICENSE PLATE
      alpha: 255,
      color: 0,
      locked: false,
      engine: false,
      dimension: 0
   });
};

frp.Vehicles.afterCreate(async (Vehicle, Options) => {
   Vehicles.Refresh();
});

(async () => { 
   frp.Vehicles.sync();
})();

