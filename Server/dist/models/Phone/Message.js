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
class Message extends sequelize_typescript_1.Model {
    static async Send(NumberFrom, NumberTo, Text) {
        const NewSMS = Message.create({ Sim_Number_From: NumberFrom, Sim_Number_To: NumberTo, MessageText: Text });
    }
    async Seen() {
        this.Readed = true;
        await this.save();
    }
}
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    __metadata("design:type", Number)
], Message.prototype, "ID", void 0);
__decorate([
    sequelize_typescript_1.Column
    //@ForeignKey(() => SimCard)
    ,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Number)
], Message.prototype, "Sim_Number_From", void 0);
__decorate([
    sequelize_typescript_1.Column
    //@ForeignKey(() => SimCard)
    ,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Number)
], Message.prototype, "Sim_Number_To", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", String)
], Message.prototype, "MessageText", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Default(false),
    __metadata("design:type", Boolean)
], Message.prototype, "Readed", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Message.prototype, "Created_At", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Message.prototype, "Updated_At", void 0);
exports.default = Message;
(async () => {
    await Message.sync();
})();
