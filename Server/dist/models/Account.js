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
var Account_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Messages_1 = require("../Globals/Messages");
const Salt = bcryptjs_1.default.genSaltSync(10);
let Account = Account_1 = class Account extends sequelize_typescript_1.Model {
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
            const Already = await Account_1.findOne({ where: { Social_Club: Player.socialClub, Hardwer: Player.serial } });
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
    sequelize_typescript_1.Column,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    __metadata("design:type", Number)
], Account.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Unique(true),
    __metadata("design:type", String)
], Account.prototype, "Username", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Unique(true),
    __metadata("design:type", String)
], Account.prototype, "Email", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Account.prototype, "Password", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(0),
    __metadata("design:type", Number)
], Account.prototype, "Administrator", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(null),
    __metadata("design:type", Date)
], Account.prototype, "Login_Date", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(null),
    __metadata("design:type", String)
], Account.prototype, "IP_Adress", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(null),
    __metadata("design:type", String)
], Account.prototype, "Social_Club", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(null),
    __metadata("design:type", String)
], Account.prototype, "Hardwer", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(0),
    __metadata("design:type", Number)
], Account.prototype, "Warns", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(0),
    __metadata("design:type", Number)
], Account.prototype, "Donator", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(0),
    __metadata("design:type", Number)
], Account.prototype, "Coins", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(false),
    __metadata("design:type", Boolean)
], Account.prototype, "Online", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(-1),
    __metadata("design:type", Number)
], Account.prototype, "Last_Character", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Account.prototype, "Created_At", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Account.prototype, "Updated_At", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Account]),
    __metadata("design:returntype", void 0)
], Account, "Creating", null);
Account = Account_1 = __decorate([
    sequelize_typescript_1.Table
], Account);
exports.Account = Account;
(async () => {
    Account.sync();
})();
