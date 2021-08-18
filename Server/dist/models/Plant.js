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
    GrowStage[GrowStage["Small_Plant"] = 1] = "Small_Plant";
    GrowStage[GrowStage["Medium_Plant"] = 2] = "Medium_Plant";
    GrowStage[GrowStage["Big_Plant"] = 3] = "Big_Plant";
    GrowStage[GrowStage["Harvest_Ready"] = 4] = "Harvest_Ready";
})(GrowStage || (GrowStage = {}));
let Plant = class Plant extends sequelize_typescript_1.Model {
    GetTotalGrowTime() {
        // IZ SEED ITEMA
    }
    Die() {
        this.GameObject.destroy();
        this.destroy();
    }
    Refresh() {
        if (this.GameObject != null)
            this.GameObject.destroy();
        switch (this.CurrentStage) {
            case GrowStage.Small_Plant:
                this.GameObject = mp.objects.new(mp.joaat(this.ObjectModels[0]), this.Position, {
                    alpha: 255,
                    dimension: 0
                });
                break;
            case GrowStage.Medium_Plant:
                this.GameObject = mp.objects.new(mp.joaat(this.ObjectModels[1]), this.Position, {
                    alpha: 255,
                    dimension: 0
                });
                break;
            case GrowStage.Big_Plant:
                this.GameObject = mp.objects.new(mp.joaat(this.ObjectModels[2]), this.Position, {
                    alpha: 255,
                    dimension: 0
                });
                break;
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
    __metadata("design:type", String)
], Plant.prototype, "Model", void 0);
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
        if (Plant.Water <= 0) {
            Plant.Die();
        }
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
