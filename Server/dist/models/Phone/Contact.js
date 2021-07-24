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
var Contact_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
let Contact = Contact_1 = class Contact extends sequelize_typescript_1.Model {
    static async New(PhoneNumber, TargetName) {
        const NewContact = await Contact_1.create({ Number: PhoneNumber, Name: TargetName });
    }
    static async Exists(PhoneNumber, TargetName) {
        const Exist = await Contact_1.findOne({ where: { Number: PhoneNumber, Name: TargetName } });
        if (Exist)
            return true;
        else
            return false;
    }
    async Update(NewNumber, NewName) {
        this.Number = NewNumber;
        this.Name = NewName;
        await this.save();
    }
};
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    __metadata("design:type", Number)
], Contact.prototype, "ID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Unique(true),
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Number)
], Contact.prototype, "Number", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", String)
], Contact.prototype, "Name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Contact.prototype, "Created_At", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Contact.prototype, "Updated_At", void 0);
Contact = Contact_1 = __decorate([
    sequelize_typescript_1.Table
], Contact);
exports.default = Contact;
(async () => {
    await Contact.sync();
})();
