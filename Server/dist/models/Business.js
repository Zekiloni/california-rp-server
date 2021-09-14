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
const Main_1 = require("../Server/Main");
const Items_1 = require("../Items/Items");
const Businesses_json_1 = __importDefault(require("../data/Businesses.json"));
const Settings_1 = require("../Server/Settings");
const Colors_1 = require("../Global/Colors");
const Globals_1 = require("../Global/Globals");
class Business extends sequelize_typescript_1.Model {
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
        //console.log(Products)
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
        const GasStations = await Business.findAll({ where: { Type: Globals_1.Globals.Business.Types.GasStation } });
        for (const Station of GasStations) {
            const Position = new mp.Vector3(Station.Position.x, Station.Position.y, Station.Position.z);
            if (player.dist(Position) < 50)
                return Station;
        }
    }
    ;
    async Save() {
        await this.save();
    }
    async Buy(player) {
        const Character = player.Character;
        if (this.Owner != 0)
            return; // PORUKA: Neko vec poseduje ovaj biznis
        if (this.Price > Character.Money)
            return; // PORUKA: Nemate dovoljno novca
        this.Owner = Character.id;
        Character.GiveMoney(player, -this.Price);
        // PORUKA: Uspesno ste kupili biznis
        await this.save();
    }
    ;
    async Menu(player) {
        const Character = player.Character;
        switch (this.Type) {
            case Globals_1.Globals.Business.Types.Dealership: {
                if (this.Vehicle_Point) {
                    //const Info = { Name: this.Name, id: this.id, Point: this.Vehicle_Point, Multiplier: BusinessTypes[this.Type].multiplier, Products: this.DealershipMenu(this.Products) }
                    //player.call('client:business.dealership:menu', [Info]);
                    break;
                }
            }
            case Globals_1.Globals.Business.Types.Rent: {
                player.call('client:business:menu', ['rent', this]);
                break;
            }
            case Globals_1.Globals.Business.Types.Restaurant: {
                break;
            }
            case Globals_1.Globals.Business.Types.Cafe: {
                const Info = { Name: this.Name, id: this.id, Multiplier: Businesses_json_1.default[this.Type].multiplier, Products: {} };
                for (const i in this.Products) {
                    Info.Products[i] = { hash: Items_1.Items.List[i].Model, multiplier: this.Products[i].Multiplier, supplies: this.Products[i].Supplies };
                }
                player.call('client:business.drinks:menu', [Info]);
                break;
            }
            case Globals_1.Globals.Business.Types.NightClub: {
                const Info = { Name: this.Name, id: this.id, Multiplier: Businesses_json_1.default[this.Type].multiplier, Products: {} };
                for (const i in this.Products) {
                    Info.Products[i] = { hash: Items_1.Items.List[i].Model, multiplier: this.Products[i].Multiplier, supplies: this.Products[i].Supplies };
                }
                player.call('client:business.drinks:menu', [Info]);
                break;
            }
            case Globals_1.Globals.Business.Types.Clothing: {
                const Info = {
                    Name: this.Name,
                    id: this.id,
                    Multiplier: Businesses_json_1.default[this.Type].multiplier
                };
                player.call('client:business.clothing:menu', [Info]);
                break;
            }
            default: {
                const Info = {
                    Name: this.Name,
                    Multiplier: Businesses_json_1.default[this.Type].multiplier,
                    id: this.id,
                    Products: {}
                };
                for (const i in this.Products) {
                    if (i != 'Fuel') {
                        Info.Products[i] = { hash: Items_1.Items.List[i].Model, multiplier: this.Products[i].Multiplier, supplies: this.Products[i].Supplies };
                    }
                }
                player.call('client:business.market:menu', [Info]);
            }
        }
    }
    ;
    async Sell(player, target = 0, price = 0) {
        let Character = player.Character;
        if (price == 0)
            price = (this.Price / 100) * 65;
        Character.GiveMoney(player, price);
        this.Owner = target;
        if (target != 0) {
            let TargetCharacter = await target.Character();
            TargetCharacter.GiveMoney(player, -price);
            // PORUKA: targetu Uspesno ste kupiili biznis od player.name za price
        }
        // PORUKA: Prodali ste biznis
        await this.save();
    }
    ;
    async AddProduct(player, product, multiplier, amount = 5) {
        let Products = this.Products;
        Products[product] = { Multiplier: multiplier, Supplies: amount };
        this.Products = Products;
        // PORUKA: Uspesno ste dodali produkt u vas bizni
        await this.save();
        return this.Products;
    }
    ;
    /*
    async EditProduct(player: PlayerMp, product: number, multiplier: number) {
        let Products = this.Products;
        Products[product] = multiplier;
        this.Products = Products;
        // PORUKA: Uspesno ste editovali produkt
        await this.save();
    };*/
    async RemoveProduct(player, product) {
        let Products = this.Products;
        delete Products[product];
        this.Products = Products;
        // PORUKA: Uspesno ste izbrisali produkt
        await this.save();
    }
    ;
    async WorkersAdd(player) {
        let Workers = this.Workers;
        Workers.push(player.Character.id);
        this.Workers = Workers;
        // PORUKA: Uspesno ste zaposlili igraca da radi u vas biznis
        await this.save();
    }
    ;
    async WorkerRemove(characterId) {
        let Workers = this.Workers;
        let x = Workers.find(worker => worker === characterId);
        if (x) {
            let i = Workers.indexOf(x);
            Workers.splice(i, 1);
        }
        this.Workers = Workers;
        // PORUKA: Uspesno ste dali otkaz igracu koji je radio u vasem biznisu
        await this.save();
    }
    ;
    /*
    async DealershipMenu(products: any) {
        let Menu = [];
        for (const i in products) {
            Menu.push({
                Model: i, Name: 'Ime vozila', Multiplier: products[i].multiplier, Category: VehiclesList[i].category,
                Stats: {
                    MaxSpeed: Vehicles[i].stats.max_speed,
                    MaxOccupants: Vehicles[i].stats.max_occupants,
                    MaxBraking: Vehicles[i].stats.max_braking,
                    MaxAcceleration: Vehicles[i].stats.max_acceleration
                }
            })
        }
        return Menu;
    }; */
    async Refresh() {
        const Info = Businesses_json_1.default[this.Type];
        const Sprite = this.Sprite ? this.Sprite : Info.blip;
        if (this.GameObject == null) {
            const GameObjects = {
                colshape: mp.colshapes.newRectangle(this.Position.x, this.Position.y, 1.8, 2.0, 0),
                blip: mp.blips.new(Sprite, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z), { dimension: this.Dimension, name: this.Name, color: 37, shortRange: true, scale: 0.85 }),
                marker: mp.markers.new(27, new mp.Vector3(this.Position.x, this.Position.y, this.Position.z - 0.98), 1.8, {
                    color: [255, 255, 255, 1],
                    rotation: new mp.Vector3(0, 0, 90),
                    visible: true,
                    dimension: this.Dimension
                })
            };
            GameObjects.colshape.OnPlayerEnter = (player) => {
                const Price = Main_1.Main.Dollars(this.Price);
                const ForSale = this.Owner == 0 ? 'Na prodaju !' : 'Biznis u vlasništvu';
                const Locked = this.Locked ? 'Zatvoren' : 'Otvoren';
                player.SendMessage('[Business] !{' + Colors_1.Colors.whitesmoke + '} Ime: ' + this.Name + ', Tip: ' + Businesses_json_1.default[this.Type].name + ', No ' + this.id + '.', Colors_1.Colors.property);
                player.SendMessage('[Business] !{' + Colors_1.Colors.whitesmoke + '} ' + ForSale + ' Cena: ' + Price + ', Status: ' + Locked + '.', Colors_1.Colors.property);
                player.SendMessage((this.Walk_In ? '/buy' : '/enter') + ' ' + (this.Owner == 0 ? '/buy business' : ''), Colors_1.Colors.whitesmoke);
            };
            if (this.Color) {
                GameObjects.blip.color = this.Color;
            }
            else {
                if (Info.color) {
                    GameObjects.blip.color = Info.color;
                }
            }
            this.GameObject = GameObjects;
        }
        else {
            if (this.GameObject.blip) {
                this.GameObject.blip.sprite = this.Sprite ? this.Sprite : Info.blip;
                this.GameObject.blip.color = this.Color ? this.Color : Info.color;
            }
        }
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
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Business.prototype, "Created_At", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Business.prototype, "Updated_At", void 0);
exports.default = Business;
(async () => {
    await Business.sync();
    const Biz = await Business.findAll();
    Biz.forEach((Business) => {
        Business.Refresh();
    });
    Main_1.Main.Terminal(3, Biz.length + ' Businesses Loaded !');
})();
