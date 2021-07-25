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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicles = exports.VehicleEntities = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Settings_1 = require("../Server/Settings");
const Business_1 = __importDefault(require("./Business"));
const Messages_1 = require("../Global/Messages");
const Globals_1 = require("../Global/Globals");
/*
const VehicleEntities = {
   Player: 0, Business: 1, Faction: 2, Job: 3
};*/
let TemporaryVehicles = [];
;
var VehicleEntities;
(function (VehicleEntities) {
    VehicleEntities[VehicleEntities["Player"] = 0] = "Player";
    VehicleEntities[VehicleEntities["Business"] = 1] = "Business";
    VehicleEntities[VehicleEntities["Faction"] = 2] = "Faction";
    VehicleEntities[VehicleEntities["Job"] = 3] = "Job";
})(VehicleEntities = exports.VehicleEntities || (exports.VehicleEntities = {}));
class Vehicles extends sequelize_typescript_1.Model {
    static async AfterCreating(Veh) { Veh.Spawn(); }
    static async AfterDestroying(Vehicle, Options) {
        if (Vehicle.Vehicle) {
            Vehicle.Vehicle.destroy();
        }
    }
    static async New(model, entity, owner, position, rotation) {
        const Vehicle = await Vehicles.create({
            Model: model,
            Entity: entity,
            Owner: owner,
            Position: position,
            Rotation: rotation,
            Fuel: 100
        });
        return Vehicle;
    }
    static async CreateTemporary(model, position, rotation, color, plate, dimension = Settings_1.Settings.Default.dimension) {
        const [primary, secondary] = color;
        const Vehicle = mp.vehicles.new(mp.joaat(model), position, {
            heading: rotation.z, alpha: 255, locked: false,
            numberPlate: plate, dimension: dimension, engine: false
        });
        Vehicle.setColor(primary, secondary);
        Vehicle.setVariable('Mileage', 0.0);
        Vehicle.setVariable('Fuel', 100.0);
        Vehicle.setVariable('Admin', true);
        TemporaryVehicles.push(Vehicle);
        return Vehicle;
    }
    ;
    async Dimension(i) {
        this.Vehicle.dimension = i;
    }
    Spawn() {
        if (this.Vehicle)
            return;
        const Vehicle = mp.vehicles.new(mp.joaat(this.Model), this.Position, {
            heading: this.Rotation.z,
            numberPlate: this.Numberplate.Content,
            alpha: 255,
            locked: this.Locked,
            engine: false,
            dimension: this.Garage
        });
        const [primary, secondary] = this.Color;
        Vehicle.setColor(primary, secondary);
        Vehicle.DATABASE = this.id;
        Vehicle.setVariable('Mileage', this.Mileage);
        Vehicle.setVariable('Fuel', this.Fuel);
        Vehicle.setVariable('Hood', false);
        Vehicle.setVariable('Trunk', false);
        Vehicle.setVariable('Windows', [false, false, false, false]);
        this.Vehicle = Vehicle;
    }
    Respawn() {
        if (this.Vehicle) {
            this.Vehicle.position = this.Parking;
            this.Vehicle.rotation = this.Rotation;
        }
    }
    static async GetVehicleInstance(Vehicle) {
        const Veh = await Vehicles.findAll();
        Veh.forEach((Instance) => {
            if (Instance.Vehicle == Vehicle)
                return Instance;
        });
    }
    async Park(Position, Rotation, garage = null) {
        if (this.Vehicle) {
            this.Parking = Position;
            this.Rotation = Rotation;
            if (garage != null) {
                this.Garage = garage;
            }
            this.Vehicle.position = Position;
            this.Vehicle.rotation = Rotation;
            await this.save();
        }
    }
    async Paint(primary, secondary) {
        this.Color = [primary, secondary];
        if (this.Vehicle)
            this.Vehicle.setColor(primary, secondary);
        await this.save();
    }
    async Lock(Player) {
        const Character = await Player.Character();
        switch (true) {
            case this.Entity == VehicleEntities.Player: {
                // if (this.Owner != Character.id) return Player.Notification(Messages.YOU_DONT_HAVE_VEHICLE_KEYS, Globals.Notification.Error, 6);
                this.Vehicle.locked = !this.Vehicle.locked;
                this.Locked = this.Vehicle.locked;
                await this.save();
                break;
            }
            case this.Entity == VehicleEntities.Business: {
                const Biz = await Business_1.default.findOne(({ where: { Owner: this.Owner } }));
                if (Biz == null)
                    return;
                if (Biz.Workers.includes(Character.id) == false)
                    return Player.Notification(Messages_1.Messages.YOU_DONT_HAVE_VEHICLE_KEYS, Globals_1.Globals.Notification.Error, 6);
                this.Vehicle.locked = !this.Vehicle.locked;
                this.Locked = this.Vehicle.locked;
                await this.save();
                break;
            }
            case this.Entity == VehicleEntities.Faction: {
                // if (this.Owner != Character.Faction) return Player.Notification(Messages.YOU_DONT_HAVE_VEHICLE_KEYS, Globals.Notification.Error, 6);
                this.Vehicle.locked = !this.Vehicle.locked;
                this.Locked = this.Vehicle.locked;
                await this.save();
                break;
            }
        }
    }
    async GeneratePlate(ExpiringDays = 92) {
        let CurrentDate = Date.now();
        const Plate = {
            Content: '1312-DB',
            Issued: CurrentDate,
            Expiring: CurrentDate + (ExpiringDays * 84000)
        };
        this.Numberplate = Plate;
        this.Vehicle.numberPlate = Plate.Content;
        await this.save();
    }
    Nearest(position, radius) {
        let Result = null;
        mp.vehicles.forEachInRange(position, radius, (Vehicle) => {
            if (Vehicle) {
                Result = Vehicle;
                return;
            }
        });
        return Result;
    }
    async Update(fuel, mileage, position) {
        this.Fuel = fuel;
        this.Vehicle.setVariable('Fuel', this.Fuel);
        this.Dirt = mileage;
        this.Vehicle.setVariable('Dirt', this.Dirt);
        this.Position = position;
        await this.save();
    }
    Window(i) {
        let Windows = this.Vehicle.getVariable('Windows');
        Windows[i] = !Windows[i];
        this.Vehicle.setVariable('Windows', Windows);
    }
    Tune() {
        const Components = this.Components;
        Components.forEach(component => {
            this.Vehicle.setMod(component.Component, component.Value);
        });
    }
}
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    __metadata("design:type", Number)
], Vehicles.prototype, "ID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", String)
], Vehicles.prototype, "Model", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Number)
], Vehicles.prototype, "Entity", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", String)
], Vehicles.prototype, "Owner", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Boolean)
], Vehicles.prototype, "Locked", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Object)
], Vehicles.prototype, "Numberplate", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Number)
], Vehicles.prototype, "Fuel", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Number)
], Vehicles.prototype, "Dirt", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Number)
], Vehicles.prototype, "Mileage", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Boolean)
], Vehicles.prototype, "Parked", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Number)
], Vehicles.prototype, "Garage", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Array)
], Vehicles.prototype, "Color", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Array)
], Vehicles.prototype, "Components", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Object)
], Vehicles.prototype, "Parking", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Object)
], Vehicles.prototype, "Position", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Object)
], Vehicles.prototype, "Rotation", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Vehicles.prototype, "Created_At", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Vehicles.prototype, "Updated_At", void 0);
__decorate([
    sequelize_typescript_1.AfterCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Vehicles]),
    __metadata("design:returntype", Promise)
], Vehicles, "AfterCreating", null);
__decorate([
    sequelize_typescript_1.AfterDestroy,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Vehicles, Object]),
    __metadata("design:returntype", Promise)
], Vehicles, "AfterDestroying", null);
exports.Vehicles = Vehicles;
(async () => {
    await Vehicles.sync();
    const Vehicle = await Vehicles.findAll();
    Vehicle.forEach((Veh) => {
        Veh.Spawn();
    });
})();
