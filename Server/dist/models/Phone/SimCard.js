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
var SimCard_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
let SimCard = SimCard_1 = class SimCard extends sequelize_typescript_1.Model {
    static async New() {
        let NewNumber = SimCard_1.GenerateNumber(100000, 999999);
        do
            NewNumber = SimCard_1.GenerateNumber(100000, 999999);
        while (SimCard_1.Exists(NewNumber));
        const NewSim = await SimCard_1.create({ Number: NewNumber, PIN: SimCard_1.GenerateNumber(1000, 9999) });
    }
    static async Exists(PhoneNumber) {
        const Exist = await SimCard_1.count({ where: { Number: PhoneNumber } });
        if (Exist > 0)
            return true;
        else
            return false;
    }
    static GenerateNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    __metadata("design:type", Number)
], SimCard.prototype, "ID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Unique(true),
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Number)
], SimCard.prototype, "Number", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Default([]),
    __metadata("design:type", Object)
], SimCard.prototype, "Contacts", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Default(0) // Mozda staviti da imaju default neki kredit?
    ,
    __metadata("design:type", Number)
], SimCard.prototype, "Money", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", String)
], SimCard.prototype, "PIN", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], SimCard.prototype, "Created_At", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], SimCard.prototype, "Updated_At", void 0);
SimCard = SimCard_1 = __decorate([
    sequelize_typescript_1.Table
], SimCard);
exports.default = SimCard;
(async () => {
    await SimCard.sync();
})();
