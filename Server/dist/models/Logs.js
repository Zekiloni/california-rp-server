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
var Logs_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Types = {
    0: 'SERVER',
    1: 'PLAYER',
    2: 'ADMIN',
    3: 'MONEY',
    4: 'SELL',
    5: 'GIVE'
};
let Logs = Logs_1 = class Logs extends sequelize_typescript_1.Model {
    static async New(accountId, characterId, participant, message) {
        Logs_1.create({ Account: accountId, Character: characterId, Participant: participant, Message: message });
    }
};
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    __metadata("design:type", Number)
], Logs.prototype, "ID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(''),
    __metadata("design:type", String)
], Logs.prototype, "Type", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Logs.prototype, "Account", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Logs.prototype, "Character", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Logs.prototype, "Participant", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(''),
    __metadata("design:type", Number)
], Logs.prototype, "Message", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Logs.prototype, "Created_At", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Logs.prototype, "Updated_At", void 0);
Logs = Logs_1 = __decorate([
    sequelize_typescript_1.Table
], Logs);
exports.default = Logs;
(async () => {
    Logs.sync();
})();