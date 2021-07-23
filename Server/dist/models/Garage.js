"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Garages_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Globals_1 = require("../Global/Globals");
const Messages_1 = require("../Global/Messages");
const Main_1 = require("../Server/Main");
const GarageTypes = [
    { Type: 'Small', Position: new mp.Vector3(0, 0, 0) },
    { Type: 'Big', Position: new mp.Vector3(0, 0, 0) } // Garage type 1
];
let Garages = Garages_1 = class Garages extends sequelize_typescript_1.Model {
    static async AfterCreating(garage) { await garage.Refresh(); }
    static async New(Player, NewType, NewPrice) {
        const NewGarage = await Garages_1.create({ Type: NewType, Price: NewPrice, Entrance: Player.position });
    }
    async ParkVehicle(player) {
        const Vehicle = await frp.Vehicles.GetVehicleInstance(player.vehicle);
        if (Vehicle) {
            if (this.Type == 0) {
                Vehicle.Park(GarageTypes[0].Position);
                Vehicle.Respawn();
            }
            else if (this.Type == 1) {
                // if (Main.IsAnyVehicleAtPoint(GarageTypes[0].Position)) {
                //    Vehicle.Park(GarageTypes[1].Position);
                //    Vehicle.Respawn();
                // } else {
                //    Vehicle.Park(GarageTypes[0].Position);
                //    Vehicle.Respawn();
                // } 
            }
        }
    }
    ;
    async Refresh() {
        if (this.GameObject == null) {
            const GameObjects = {
                colshape: mp.colshapes.newSphere(this.Entrance.x, this.Entrance.y, this.Entrance.z, 3, this.Dimension),
                blip: mp.blips.new(50, new mp.Vector3(this.Entrance.x, this.Entrance.y, this.Entrance.z), { dimension: this.Dimension, name: 'Garage', color: 37, shortRange: true, scale: 0.85 }),
                marker: mp.markers.new(27, new mp.Vector3(this.Entrance.x, this.Entrance.y, this.Entrance.z - 0.98), 2.5, {
                    rotation: new mp.Vector3(0, 0, 90),
                    visible: true,
                    dimension: this.Dimension
                })
            };
            GameObjects.colshape.OnPlayerEnter = async (player) => {
                if (player.vehicle) {
                    if (this.Owner == player.CHARACTER_ID && !this.Locked) {
                        // Park vehicle function
                        const Garage = await Garages_1.findOne({ where: { Owner: player.CHARACTER_ID, id: this.id } });
                        if (Garage) {
                            Garage.ParkVehicle(player);
                        }
                    }
                    else {
                        // player.SendMessage('Garaža nije u tvom vlasništvu.', Globals.); 
                    }
                }
                else {
                    if (!this.Locked) {
                        // PlayerEnterGarage(player)
                    }
                    else {
                        player.Notification(Messages_1.Messages.IS_LOCKED, Globals_1.Globals.Notification.Error, 4);
                    }
                }
                //const white = frp.Globals.Colors.whitesmoke;
            };
            this.GameObject = GameObjects;
        }
    }
};
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    __metadata("design:type", Number)
], Garages.prototype, "ID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Number)
], Garages.prototype, "Owner", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Number)
], Garages.prototype, "Type", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(20000),
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Number)
], Garages.prototype, "Price", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Boolean)
], Garages.prototype, "Locked", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Object)
], Garages.prototype, "Entrance", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Number)
], Garages.prototype, "Dimension", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Garages.prototype, "Created_At", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Garages.prototype, "Updated_At", void 0);
__decorate([
    sequelize_typescript_1.AfterCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Garages]),
    __metadata("design:returntype", Promise)
], Garages, "AfterCreating", null);
Garages = Garages_1 = __decorate([
    sequelize_typescript_1.Table
], Garages);
exports.default = Garages;
/*
//const GarageTypes = require('../data/Garages.json')

const Garages = [
   { Position: new mp.Vector3(0, 0, 0)}, // Garage type 0
   { Position: new mp.Vector3(0, 0, 0)} // Garage type 1
]

frp.Garages = frp.Database.define('garage', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Owner: { type: DataTypes.STRING, defaultValue: 0 },
      Type: { type: DataTypes.INTEGER, defaultValue: 0 }, // 0 - Mala | 1 - Velika | Mala max 1 vozilo, Velika max 2 vozila
      Price: { type: DataTypes.STRING },
      Locked: { type: DataTypes.BOOLEAN, defaultValue: true },
      Entrance: {
         type: DataTypes.TEXT, defaultValue: null,
         get: function () { return JSON.parse(this.getDataValue('Entrance')); },
         set: function (value) { this.setDataValue('Entrance', JSON.stringify(value)); }
      },
      Dimension: { type: DataTypes.INTEGER, defaultValue: 0 },
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
      Garages.GameObject.colshape.destroy();
      Garages.GameObject.blip.destroy();
      Garages.GameObject.marker.destroy();
   }
});

/* frp.Items.prototype.Delete = async function () {
   this.object.destroy();
   await this.destroy();
};

frp.Garages.prototype.Refresh = function () {

   if (this.GameObject == null) {
      const GameObjects = {
         colshape: mp.colshapes.newSphere(this.Position.x, this.Position.y, this.Position.z, 3, this.Dimension),
         blip: mp.blips.new(50, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z), { dimension: this.Dimension, name: this.Name, color: 37, shortRange: true, scale: 0.85 }),
         marker: mp.markers.new(27, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z - 0.98), 2.5, {
            color: frp.Globals.MarkerColors.Garages,
            rotation: new mp.Vector3(0, 0, 90),
            visible: true,
            dimension: this.Dimension
         })
      };


      GameObjects.colshape.OnPlayerEnter = (player) => {
         if (player.vehicle) {
            if (this.Owner == player.character && !this.Locked) {
               // Park vehicle function
               const Garage = await frp.Garages.findOne({ where: { Owner: player.character, id: this.id } });
               Garage.ParkVehicle(player);
               
            } else {
               player.SendMessage('Garaža nije u tvom vlasništvu.');
            }
         }
         else {
            if (!this.Locked) {
               // PlayerEnterGarage(player)
               
            } else {
               player.Notification(frp.Globals.messages.IS_LOCKED, frp.Globals.Notification.Error, 4);
            }
         }
         //const white = frp.Globals.Colors.whitesmoke;

         /* player.SendMessage('[House] !{' + white + '} Ime: ' + this.Name + ', Tip: ' + BusinessTypes[this.Type].name + ', No ' + this.id + '.', frp.Globals.Colors.property);
         player.SendMessage('[House] !{' + white + '} ' + ForSale + ' Cena: ' + Price + ', Status: ' + Locked + '.', frp.Globals.Colors.property);
         player.SendMessage((this.Walk_in ? '/buy' : '/enter') + ' ' + (this.Owner == 0 ? '/buy house' : ''), frp.Globals.Colors.whitesmoke);
      };

      this.GameObject = GameObjects;
   }
};

frp.Garages.prototype.Refresh = function () {
   this.Owner == 0 ? (this.blip.color = 1) : (this.blip.color = 2);
   this.Owner == 0 ? (this.blip.name = 'Garaža je na prodaju !') : (this.blip.name = 'Garaza');
};

frp.Garages.New = async function (player, type, price) {
   const Garage = await frp.Garages.create({ Type: type, Price: price, Position: player.position });
   Garage.Init();
};

frp.Garages.prototype.ParkVehicle = async function(player) {
   const Vehicle = await frp.Vehicles.GetVehicleInstance(player.vehicle);
   if (Vehicle) {
      if (this.Type == 0) {
         Vehicle.Park(Garages[0].Position);
         Vehicle.Respawn();
      } else if (this.Type == 1) {
         if (frp.Main.IsAnyVehicleAtPoint(Garages[0].Position)) {
            Vehicle.Park(Garages[1].Position);
            Vehicle.Respawn();
         } else {
            Vehicle.Park(Garages[0].Position);
            Vehicle.Respawn();
         }
      }
   }
};



*/
(async () => {
    await Garages.sync();
    const Garage = await Garages.findAll();
    Garage.forEach((GarageObj) => {
        GarageObj.Refresh();
    });
    Main_1.Main.Terminal(3, Garage.length + ' Garages Loaded !');
})();
