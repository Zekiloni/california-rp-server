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
var House_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Houses_json_1 = __importDefault(require("../data/Houses.json"));
const Colors_1 = require("../Global/Colors");
const Globals_1 = require("../Global/Globals");
const Messages_1 = require("../Global/Messages");
const Main_1 = require("../Server/Main");
let House = House_1 = class House extends sequelize_typescript_1.Model {
    static async AfterCreating(HouseObj) { await HouseObj.Refresh(); }
    static async AfterDestroying(HouseObj, Options) {
        if (HouseObj.GameObject) {
            HouseObj.GameObject.colshape.destroy();
            HouseObj.GameObject.blip.destroy();
            HouseObj.GameObject.marker.destroy();
        }
    }
    async Refresh() {
        if (this.GameObject == null) {
            const GameObjects = {
                colshape: mp.colshapes.newSphere(this.Position.x, this.Position.y, this.Position.z, 1.8, this.Dimension),
                blip: mp.blips.new(40, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z), { dimension: this.Dimension, name: 'House', color: 59, shortRange: true, scale: 0.75, drawDistance: 25 }),
                marker: mp.markers.new(27, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z - 0.98), 1.8, {
                    color: [255, 255, 255, 255],
                    rotation: new mp.Vector3(0, 0, 90),
                    visible: true,
                    dimension: this.Dimension
                })
            };
            GameObjects.colshape.OnPlayerEnter = (player) => {
                const white = Colors_1.Colors.whitesmoke;
                player.SendMessage('[House] !{' + white + '} Kucaraaa ', Colors_1.Colors.property);
            };
            this.GameObject = GameObjects;
        }
        else {
            const BlipColor = this.Owner == 0 ? 49 : 52;
            this.GameObject.blip.color = BlipColor;
        }
    }
    async Buy(Player) {
        if (this.Owner != 0)
            return Player.Notification(Messages_1.Messages.HOUSE_ALREADY_OWNER, Globals_1.Globals.Notification.Error, 5);
        const Character = await Player.Character();
        const Houses = await Player.Properties().Houses;
        if (Houses.length == Character.Max_Houses)
            return; // PORUKA: Imate maksimalno kuca;
        if (this.Price > Character.Money)
            return Player.Notification(Messages_1.Messages.NOT_ENOUGH_MONEY, Globals_1.Globals.Notification.Error, 5);
        Character.GiveMoney(Player, -this.Price);
        Player.Notification(Messages_1.Messages.SUCCCESSFULLY_BUYED_HOUSE, Globals_1.Globals.Notification.Succes, 7);
        this.Owner = Character.id;
        await this.save();
    }
    async Lock(Player) {
        if (this.Owner != Player.CHARACTER_ID)
            return Player.Notification(Messages_1.Messages.YOU_DONT_HAVE_HOUSE_KEYS, Globals_1.Globals.Notification.Error, 5);
        if (!this.Tenants.includes(Player.CHARACTER_ID))
            return Player.Notification(Messages_1.Messages.YOU_DONT_HAVE_HOUSE_KEYS, Globals_1.Globals.Notification.Error, 5);
        this.Locked = !this.Locked;
        await this.save();
    }
    async Create(Player, HouseType, Price) {
        if (Houses_json_1.default[HouseType] == undefined)
            return Player.Notification(Messages_1.Messages.TYPES_ARE_IN_RANGE + '0 - ' + Houses_json_1.default.length + '.', Globals_1.Globals.Notification.Error, 5);
        this.Type = HouseType;
        const DefaultType = Houses_json_1.default[HouseType];
        const Position = Player.position;
        House_1.create({
            Type: DefaultType.id,
            Price: Price,
            Position: Position,
            Dimension: Player.dimension,
            Interior_Position: DefaultType.Position,
            IPL: DefaultType.IPL ? DefaultType.IPL : null,
        });
    }
};
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    __metadata("design:type", Number)
], House.prototype, "ID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Unique(true),
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Number)
], House.prototype, "Owner", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Number)
], House.prototype, "Type", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Number)
], House.prototype, "Price", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Default(false),
    __metadata("design:type", Boolean)
], House.prototype, "Locked", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Object)
], House.prototype, "Position", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Default(0),
    __metadata("design:type", Number)
], House.prototype, "Dimension", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Object)
], House.prototype, "Interior_Position", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", String)
], House.prototype, "IPL", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Default(false),
    __metadata("design:type", Boolean)
], House.prototype, "Rentable", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Default(0),
    __metadata("design:type", Number)
], House.prototype, "Rent", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Array)
], House.prototype, "Tenants", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], House.prototype, "Created_At", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], House.prototype, "Updated_At", void 0);
__decorate([
    sequelize_typescript_1.AfterCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [House]),
    __metadata("design:returntype", Promise)
], House, "AfterCreating", null);
__decorate([
    sequelize_typescript_1.AfterDestroy,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [House, Object]),
    __metadata("design:returntype", Promise)
], House, "AfterDestroying", null);
House = House_1 = __decorate([
    sequelize_typescript_1.Table
], House);
exports.default = House;
(async () => {
    await House.sync();
    const HouseList = await House.findAll();
    HouseList.forEach((House) => {
        House.Refresh();
    });
    Main_1.Main.Terminal(3, HouseList.length + ' Houses Loaded !');
})();
