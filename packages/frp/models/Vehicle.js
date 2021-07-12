'use strict';

const { DataTypes } = require('sequelize');

const VehicleEntities = { 
   Player: 0, Business: 1, Faction: 2, Job: 3
};

module.exports = { VehicleEntities };

frp.Vehicles = frp.Database.define('vehicle', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Model: { type: DataTypes.STRING },
      Entity: { type: DataTypes.INTEGER, defaultValue: 0 },
      Owner: { type: DataTypes.INTEGER, defaultValue: 0 },
      Locked: { type: DataTypes.BOOLEAN, defaultValue: false },
      Numberplate: { type: DataTypes.STRING, defaultValue: '' },
      Fuel: { type: DataTypes.INTEGER, defaultValue: 100 },
      Dirt: { type: DataTypes.INTEGER, defaultValue: 0 },
      Mileage: { type: DataTypes.FLOAT, defaultValue: 0.0 },
      Parked: { type: DataTypes.BOOLEAN, defaultValue: false },
      Garage: { type: DataTypes.INTEGER, defaultValue: 0 },
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
      Parking: {
         type: DataTypes.TEXT, defaultValue: null,
         get: function () { 
            const Position = JSON.parse(this.getDataValue('Parking'));
            return new mp.Vector3(Position.x, Position.y, Position.z);
         },
         set: function (value) { this.setDataValue('Parking', JSON.stringify(value)); }
      },
      Position: {
         type: DataTypes.TEXT, defaultValue: null,
         get: function () { 
            const Position = JSON.parse(this.getDataValue('Position'));
            return new mp.Vector3(Position.x, Position.y, Position.z);
         },
         set: function (value) { this.setDataValue('Position', JSON.stringify(value)); }
      },
      Rotation: {
         type: DataTypes.TEXT, defaultValue: null,
         get: function () { 
            const Rotation = JSON.parse(this.getDataValue('Rotation'));
            return new mp.Vector3(Rotation.x, Rotation.y, Rotation.z);
         },
         set: function (value) { this.setDataValue('Rotation', JSON.stringify(value)); }
      },
      GameObject: { 
         type: DataTypes.VIRTUAL, defaultValue: null,
         get () { return frp.GameObjects.Vehicles[this.getDataValue('id')]; },
         set (x) { frp.GameObjects.Vehicles[this.getDataValue('id')] = x; }
      }
   }, {
      timestamps: true,
      underscrored: true,
      createdAt: 'Created_Date',
      updatedAt: 'Update_Date',
   }
);


frp.Vehicles.Create = async function (model, entity = VehicleEntities.Player, owner, position, rotation, color) {

   const Vehicle = await frp.Vehicles.create({ 
      Model: model, 
      Entity: entity,
      Owner: owner, 
      Position: position,
      Rotation: rotation,
      Color: color
   });

};

frp.Vehicles.afterCreate(async (Vehicle, Options) => {
   Vehicle.Spawn();
});

frp.Vehicles.prototype.Spawn = function () { 
   if (this.GameObject) return;

   const Vehicle = mp.vehicles.new(mp.joaat(this.Model), this.Position, {
      heading: this.Heading,
      numberPlate: this.Numberplate,
      alpha: 255,
      color: 0,
      locked: this.Locked,
      engine: false,
      dimension: this.Garage
   });

   Vehicle.Database = this.id;

   Vehicle.setVariable('Mileage', this.Mileage);
   Vehicle.setVariable('Fuel', this.Fuel);

   this.GameObject = Vehicle;
};


frp.Vehicles.CreateTemporary = function (model, position, rotation, color, plate, entity = VehicleEntities.Player, player = null, dimension = frp.Settings.default.dimension) {
   const [primary, secondary] = color;

   let Vehicle = mp.vehicles.new(mp.joaat(model), position, { 
      rotation: rotation, alpha: 255,  color: [[0, 0, 0], [0, 0, 0]], 
      numberPlate: plate, dimension: dimension 
   });

   Vehicle.setColor(primary, secondary);
   Vehicle.engine = false;
   Vehicle.setVariable('Mileage', 0.00);
   Vehicle.setVariable('Fuel', 100);
   // Vehicle.Entity = entity;
   // Vehicle.Captain = player;

   frp.GameObjects.TemporaryVehicles[Vehicle.id] = Vehicle;
   
   return Vehicle;
};


frp.Vehicles.prototype.Dimension = function (i) { 
   this.GameObject.dimension = i;
};


frp.Vehicles.prototype.Respawn = function () { 
   if (this.GameObject) { 
      this.GameObject.position = this.Parking;
      this.GameObject.rotation = this.Rotation;
   }
};


frp.Vehicles.GetVehicleInstance = async function (Vehicle) { 
   const Vehicles = await frp.Vehicles.findAll();
   Vehicles.forEach((Instance) => { 
      if (Vehicle.GameObject == Vehicle) return Instance;
   })
};


frp.Vehicles.prototype.Park = async function (position, rotation, garage = null) { 
   if (this.GameObject) { 
      this.Parking = position;
      this.Rotation = rotation;

      if (garage != null) { 
         this.Garage = garage;
      }

      this.GameObject.position = position;
      this.GameObject.rotation = rotation;

      await this.save();
   }
};

frp.Vehicles.prototype.Dimension = function (i) { 
   if (this.GameObject) {
      this.GameObject.dimension = i;
   }
};


frp.Vehicles.prototype.Paint = async function (primary, secondary) { 
   this.Color = [priamry, secondary];
   if (this.GameObject) this.GameObject.setColor(primary, secondary);
   await this.save();
};


frp.Vehicles.prototype.Lock = async function () {
   this.Locked = !this.Locked;
   this.GameObject.locked = this.Locked;
   await this.save();
};


frp.Vehicles.prototype.SetNumberplate = async function () { 
   const Plate = frp.Main.GenerateString(6);
   this.Numberplate = Plate;
   this.GameObject.numberPlate = Plate;
   await this.save();
};


frp.Vehicles.Nearest = function (position, radius) { 
   mp.vehicles.forEachInRange(position, radius, (Vehicle) => { 
      if (Vehicle) return Vehicle;
   });
};


frp.Vehicles.prototype.SetFuel = async function (value) { 
   this.Fuel = value;
   this.GameObject.setVariable('Fuel', this.Fuel);
   await this.save();
};


frp.Vehicles.prototype.SetDirt = async function (value) { 
   this.Dirt = value;
   this.vehicle.setVariable('Dirt', this.Dirt);
   await this.save();
};


frp.Vehicles.prototype.SetMileage = async function (value) { 
   this.Mileage = value;
   this.GameObject.setVariable('Mileage', this.Mileage);
   await this.save();
};


frp.Vehicles.Dimension = function (i) { 
   this.GameObject.dimension = i
};


frp.Vehicles.prototype.Window = function (i) { 
   this.Windows[i] = !this.Windows[i];
   this.GameObject.setVariable('Windows', this.Windows);
};


frp.Vehicles.prototype.Tune = function () { 
   const Components = this.Components;
   Components.forEach(component => {
      this.vehicle.setMod(component.index, component.value);
   });
};


(async () => { 
   await frp.Vehicles.sync();

   const Vehicles = await frp.Vehicles.findAll();
   Vehicles.forEach((Vehicle) => { 
      Vehicle.Spawn();
   });
})();

