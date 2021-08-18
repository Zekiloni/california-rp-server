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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
var GrowStage;
(function (GrowStage) {
    GrowStage[GrowStage["Seed"] = 0] = "Seed";
    GrowStage[GrowStage["Seedling"] = 1] = "Seedling";
    GrowStage[GrowStage["Small_Plant"] = 2] = "Small_Plant";
    GrowStage[GrowStage["Medium_Plant"] = 3] = "Medium_Plant";
    GrowStage[GrowStage["Big_Plant"] = 4] = "Big_Plant";
    GrowStage[GrowStage["Harvest_Ready"] = 5] = "Harvest_Ready";
})(GrowStage || (GrowStage = {}));
let Plant = class Plant extends sequelize_typescript_1.Model {
    GetTotalGrowTime() {
        // IZ SEED ITEMA
    }
    Die() {
        this.destroy();
    }
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    __metadata("design:type", Number)
], Plant.prototype, "ID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Plant.prototype, "Model", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(0),
    __metadata("design:type", Number)
], Plant.prototype, "Stage", void 0);
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
    sequelize_typescript_1.Default(0),
    __metadata("design:type", Number)
], Plant.prototype, "Fertilized", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(50),
    __metadata("design:type", Number)
], Plant.prototype, "Water", void 0);
Plant = __decorate([
    sequelize_typescript_1.Table
], Plant);
exports.default = Plant;
// 
const PlantTimer = setInterval(async () => {
    const AllPlants = await Plant.findAll();
    for (const i in AllPlants) {
        const Plant = AllPlants[i];
        Plant.Water--;
        if (Plant.Stage != GrowStage.Harvest_Ready) {
            AllPlants[i].Stage += 0.1;
        }
    }
}, 60000 * 60);
