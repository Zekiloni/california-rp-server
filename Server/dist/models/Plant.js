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
var Plant_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Messages_1 = require("../Global/Messages");
const Globals_1 = require("../Global/Globals");
var GrowStage;
(function (GrowStage) {
    GrowStage[GrowStage["Seed"] = 0] = "Seed";
    GrowStage[GrowStage["Small_Plant"] = 1] = "Small_Plant";
    GrowStage[GrowStage["Medium_Plant"] = 2] = "Medium_Plant";
    GrowStage[GrowStage["Big_Plant"] = 3] = "Big_Plant";
    GrowStage[GrowStage["Harvest_Ready"] = 4] = "Harvest_Ready";
})(GrowStage || (GrowStage = {}));
var Specie;
(function (Specie) {
    Specie[Specie["Cannabis"] = 0] = "Cannabis";
    Specie[Specie["Coca"] = 1] = "Coca";
    Specie[Specie["Opium"] = 2] = "Opium";
})(Specie || (Specie = {}));
let Plant = Plant_1 = class Plant extends sequelize_typescript_1.Model {
    GetTotalGrowTime() {
        // IZ SEED ITEMA
    }
    Die() {
        // ADD Dead plants LOG
        for (let i = 0; i < this.GameObjects.length; i++) {
            this.GameObjects[i].destroy();
        }
        this.GameObjects = [];
        this.destroy();
    }
    Refresh() {
        this.GameObjects[1].destroy(); // Unistimo biljku pa je odma napravimo da izgleda kao da raste
        switch (this.CurrentStage) {
            case GrowStage.Small_Plant:
                this.GameObjects[1] = mp.objects.new(mp.joaat(this.ObjectModels[0]), this.Position, {
                    alpha: 255,
                    dimension: 0
                });
                break;
            case GrowStage.Medium_Plant:
                this.GameObjects[1] = mp.objects.new(mp.joaat(this.ObjectModels[1]), this.Position, {
                    alpha: 255,
                    dimension: 0
                });
                break;
            case GrowStage.Big_Plant:
                this.GameObjects[1] = mp.objects.new(mp.joaat(this.ObjectModels[2]), this.Position, {
                    alpha: 255,
                    dimension: 0
                });
                break;
        }
    }
    Plant(Player, Type) {
        // Provera da li ima seed item
        // Namestiti da ne moze svuda da se planta
        //
        const GrowTime = Plant_1.GetPlantGrowTime(Type);
        Plant_1.create({ Type: Type, Owner: Player.Character, Grow_Time: GrowTime, Position: new mp.Vector3(Player.position.x + 0.2, Player.position.y + 0.3, Player.position.z) });
    }
    Harvest(Player) {
        if (this.CurrentStage != GrowStage.Harvest_Ready)
            return Player.Notification(Messages_1.Messages.NOT_READY_FOR_HARVEST, Globals_1.Globals.Notification.Error, 6);
        switch (this.Type) {
            case Specie.Cannabis:
                // Daje svež kanabis koji se suši pa prodaje ili puši
                break;
            case Specie.Coca:
                // Daje sveže listove koji se prerađuju dalje
                break;
            case Specie.Opium:
                // Daje sveže semenke koje idu dalje na preradu
                break;
        }
        if (this.GameObjects.length > 0) {
            for (let i = 0; i < this.GameObjects.length; i++) {
                this.GameObjects[i].destroy();
            }
        }
        this.destroy();
    }
    static GetPlantGrowTime(Type) {
        switch (Type) {
            case Specie.Cannabis:
                return 72;
            case Specie.Coca:
                return 96;
            case Specie.Opium:
                return 96;
        }
    }
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    __metadata("design:type", Number)
], Plant.prototype, "ID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Plant.prototype, "Type", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(0),
    __metadata("design:type", Number)
], Plant.prototype, "StagePoint", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Plant.prototype, "Grow_Time", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Plant.prototype, "Owner", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Object)
], Plant.prototype, "Position", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(0),
    __metadata("design:type", Number)
], Plant.prototype, "Fertilized", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(50),
    __metadata("design:type", Number)
], Plant.prototype, "Water", void 0);
Plant = Plant_1 = __decorate([
    sequelize_typescript_1.Table
], Plant);
exports.default = Plant;
const PlantTimer = setInterval(async () => {
    const AllPlants = await Plant.findAll();
    for (const i in AllPlants) {
        const Plant = AllPlants[i];
        // Svako zalivanje dodaje 5 vode a svaki sat se gubi 0.3 vode, znači ako biljka ne bude zalivena nakon 16h umire.
        Plant.Water -= 0.3;
        if (Plant.Water <= 0) {
            Plant.Die();
        }
        // Proveravamo ukoliko je biljka nađubrena, ako jeste onda dobija ukupno 2 pointa po satu, ako nije onda dobija 1, znači ako se drži non stop nađubrena skoro duplo brže raste
        // Opada za 0.5 svaki sat a jedno đubrenje dodaje 1.5
        if (Plant.Fertilized > 0 && Plant.StagePoint != GrowStage.Harvest_Ready) {
            Plant.Fertilized -= 0.5;
            Plant.StagePoint += 0.1;
        }
        // Dodaje 0.1 stage pointa
        if (Plant.StagePoint != GrowStage.Harvest_Ready) {
            Plant.StagePoint += 0.1;
        }
        switch (true) {
            case Plant.StagePoint > 0 && Plant.StagePoint <= 1:
                Plant.CurrentStage = GrowStage.Seed;
                break;
            case Plant.StagePoint > 1 && Plant.StagePoint <= 2:
                Plant.CurrentStage = GrowStage.Small_Plant;
                break;
            case Plant.StagePoint > 2 && Plant.StagePoint <= 3:
                Plant.CurrentStage = GrowStage.Medium_Plant;
                break;
            case Plant.StagePoint > 3 && Plant.StagePoint <= 4:
                Plant.CurrentStage = GrowStage.Big_Plant;
                break;
            case Plant.StagePoint > 4 && Plant.StagePoint <= 5:
                Plant.CurrentStage = GrowStage.Harvest_Ready;
                break;
        }
        Plant.Refresh();
    }
}, 60000 * 60);
