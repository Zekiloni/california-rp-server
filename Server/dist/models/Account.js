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
var Accounts_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Messages_1 = require("../Global/Messages");
const Salt = bcryptjs_1.default.genSaltSync(10);
let Accounts = Accounts_1 = class Accounts extends sequelize_typescript_1.Model {
    static Creating(Account) {
        Account.Password = bcryptjs_1.default.hashSync(Account.Password, Salt);
    }
    Login(Password) {
        return bcryptjs_1.default.compareSync(Password, this.Password);
    }
    async Logged(Player, Toggle, Character) {
        this.Online = Toggle;
        this.Last_Character = Character;
        this.Login_Date = new Date();
        this.IP_Adress = Player.ip;
        Player.setVariable('Logged', true);
        if (this.Hardwer == null || this.Social_Club == null) {
            const Already = await Accounts_1.findOne({ where: { Social_Club: Player.socialClub, Hardwer: Player.serial } });
            if (Already)
                Player.kick(Messages_1.Messages.USER_ALREADY_EXIST);
            this.Hardwer = Player.serial;
            this.Social_Club = Player.socialClub;
        }
    }
    MakeAdministrator(Player, Level) {
        this.Administrator = Level;
        Player.setVariable('Admin', Level);
        this.save();
    }
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    __metadata("design:type", Number)
], Accounts.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Unique(true),
    __metadata("design:type", String)
], Accounts.prototype, "Username", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Unique(true),
    __metadata("design:type", String)
], Accounts.prototype, "Email", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Accounts.prototype, "Password", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(0),
    __metadata("design:type", Number)
], Accounts.prototype, "Administrator", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(null),
    __metadata("design:type", Date)
], Accounts.prototype, "Login_Date", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(null),
    __metadata("design:type", String)
], Accounts.prototype, "IP_Adress", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(null),
    __metadata("design:type", String)
], Accounts.prototype, "Social_Club", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(null),
    __metadata("design:type", String)
], Accounts.prototype, "Hardwer", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(0),
    __metadata("design:type", Number)
], Accounts.prototype, "Warns", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(0),
    __metadata("design:type", Number)
], Accounts.prototype, "Donator", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(0),
    __metadata("design:type", Number)
], Accounts.prototype, "Coins", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(false),
    __metadata("design:type", Boolean)
], Accounts.prototype, "Online", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(-1),
    __metadata("design:type", Number)
], Accounts.prototype, "Last_Character", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Accounts.prototype, "Created_At", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Accounts.prototype, "Updated_At", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Accounts]),
    __metadata("design:returntype", void 0)
], Accounts, "Creating", null);
Accounts = Accounts_1 = __decorate([
    sequelize_typescript_1.Table
], Accounts);
exports.default = Accounts;
(async () => {
    Accounts.sync();
})();
