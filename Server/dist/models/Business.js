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
const sequelize_typescript_1 = require("sequelize-typescript");
const Businesses_json_1 = __importDefault(require("../data/Businesses.json"));
const Settings_1 = require("../Server/Settings");
class Business extends sequelize_typescript_1.Model {
    static Destroyed(Business) {
        // if (Business.GameObject) {
        //     Business.GameObject.colshape.destroy();
        //     Business.GameObject.blip.destroy();
        //     Business.GameObject.marker.destroy();
        // }
    }
    ;
    static async New(Player, Type, WalkIn, Price) {
        if (!Businesses_json_1.default[Price])
            return;
        const Position = Player.position;
        const Dimension = Player.dimension;
        const Walk_in = WalkIn == true ? true : false;
        const Default = Businesses_json_1.default[Type];
        let Products = {};
        if (Default.products) {
            for (const i in Default.products) {
                let multiplier = Default.products[i];
                Products[i] = { multiplier: multiplier, supplies: Settings_1.Settings.Business.Default.Supplies }; // '\"' + i + '\"'
            }
        }
        console.log(Products);
        const NewBiz = await Business.create({ Name: Default.name, Type: Type, Price: Price, Walk_in: Walk_in, Products: Products, Position: Position, Dimension: Dimension });
        if (NewBiz) {
            // Log
        }
    }
    ;
    static async Nearest(player) {
        const Businesses = await Business.findAll();
        for (const Business of Businesses) {
            const Position = new mp.Vector3(Business.Position.x, Business.Position.y, Business.Position.z);
            if (player.dist(Position) < 2.5)
                return Business;
        }
    }
    ;
    static async GetNearestGasStation(player) {
        //   const GasStations = await Business.findAll({ where: { Type: frp.Globals.Business.Types.GasStation } });
        //   for (const Station of GasStations) {
        //       const Position = new mp.Vector3(Station.Position.x, Station.Position.y, Station.Position.z);
        //       if (player.dist(Position) < 50) return Station;
        //   }
    }
    ;
    async afterCreate(Business, Options) {
        Business.Refresh();
    }
    ;
    async Refresh() {
        const Info = Businesses_json_1.default[this.Type];
        const Sprite = this.Sprite ? this.Sprite : Info.blip;
        //   if (this.GameObject == null) {
        //       const GameObjects = {
        //           colshape: mp.colshapes.newRectangle(this.Position.x, this.Position.y, 1.8, 2.0, 0),
        //           blip: mp.blips.new(Sprite, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z), { dimension: this.Dimension, name: this.Name, color: 37, shortRange: true, scale: 0.85 }),
        //           marker: mp.markers.new(27, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z - 0.98), 1.8, {
        //               color: [255, 255, 255, 1], // PROMENITI
        //               rotation: new mp.Vector3(0, 0, 90),
        //               visible: true,
        //               dimension: this.Dimension
        //           })
        //       };
        //       GameObjects.colshape.OnPlayerEnter = (player) => {
        //           const Price = Main.Dollars(this.Price);
        //           const ForSale = this.Owner == 0 ? 'Na prodaju !' : 'Biznis u vlasništvu';
        //           const Locked = this.Locked ? 'Zatvoren' : 'Otvoren';
        //           player.SendMessage('[Business] !{' + Colors.whitesmoke + '} Ime: ' + this.Name + ', Tip: ' + BusinessTypes[this.Type].name + ', No ' + this.id + '.', Colors.property);
        //           player.SendMessage('[Business] !{' + Colors.whitesmoke + '} ' + ForSale + ' Cena: ' + Price + ', Status: ' + Locked + '.', Colors.property);
        //           player.SendMessage((this.Walk_In ? '/buy' : '/enter') + ' ' + (this.Owner == 0 ? '/buy business' : ''), Colors.whitesmoke);
        //       };
        //       if (this.Color) {
        //           GameObjects.blip.color = this.Color;
        //       } else {
        //           if (Info.color) {
        //               GameObjects.blip.color = Info.color;
        //           }
        //       }
        //       // this.GameObject = GameObjects;
        //   } else {
        //       // if (this.GameObject.blip) {
        //       //     this.GameObject.blip.sprite = this.Sprite ? this.Sprite : Info.blip;
        //       //     this.GameObject.blip.color = this.Color ? this.Color : Info.color;
        //       // }
        //   }
    }
    ;
}
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    __metadata("design:type", Number)
], Business.prototype, "ID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Business.prototype, "Name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Business.prototype, "Type", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(false),
    __metadata("design:type", Boolean)
], Business.prototype, "Locked", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Business.prototype, "Walk_In", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Business.prototype, "Price", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Business.prototype, "Owner", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(0),
    __metadata("design:type", Number)
], Business.prototype, "Budget", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(0),
    __metadata("design:type", Number)
], Business.prototype, "Dimension", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Business.prototype, "IPL", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Business.prototype, "Sprite", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Business.prototype, "Color", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default([]),
    __metadata("design:type", Array)
], Business.prototype, "Workers", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default([]),
    __metadata("design:type", Array)
], Business.prototype, "Products", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Object)
], Business.prototype, "Position", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Object)
], Business.prototype, "Vehicle_Point", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Object)
], Business.prototype, "Interior_Position", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Business.prototype, "Created_At", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Business.prototype, "Updated_At", void 0);
__decorate([
    sequelize_typescript_1.AfterDestroy,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Business]),
    __metadata("design:returntype", void 0)
], Business, "Destroyed", null);
