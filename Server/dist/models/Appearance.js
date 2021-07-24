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
let Appearances = class Appearances extends sequelize_typescript_1.Model {
    Apply(Player, Gender) {
        const Genders = [mp.joaat('mp_m_freemode_01'), mp.joaat('mp_f_freemode_01')];
        Player.model = Genders[Gender];
        Player.setHeadBlend(this.Blend_Data[0], this.Blend_Data[1], 0, this.Blend_Data[2], this.Blend_Data[3], 0, this.Blend_Data[4], this.Blend_Data[5], 0);
        Player.eyeColor = parseInt(this.Eyes);
        Player.setClothes(2, parseInt(this.Hair[0]), 0, 2);
        Player.setHairColor(parseInt(this.Hair[1]), parseInt(this.Hair[2]));
        for (let i = 0; i < 20; i++) {
            Player.setFaceFeature(i, this.Face_Features[i]);
        }
    }
    ;
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Appearances.prototype, "ID", void 0);
__decorate([
    sequelize_typescript_1.Unique(true),
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Appearances.prototype, "Character", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.ARRAY),
    __metadata("design:type", Array)
], Appearances.prototype, "Face_Features", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.ARRAY),
    __metadata("design:type", Array)
], Appearances.prototype, "Blend_Data", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Appearances.prototype, "Hair", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Appearances.prototype, "Beard", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Appearances.prototype, "Eyes", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.ARRAY),
    __metadata("design:type", Array)
], Appearances.prototype, "Overlays", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.ARRAY),
    __metadata("design:type", Array)
], Appearances.prototype, "Overlays_Colors", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Appearances.prototype, "Created_At", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Appearances.prototype, "Updated_At", void 0);
Appearances = __decorate([
    sequelize_typescript_1.Table
], Appearances);
exports.default = Appearances;
(async () => {
    // await Appearances.sync();
})();
