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
var Bans_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Globals_1 = require("../Global/Globals");
const Messages_1 = require("../Global/Messages");
const Main_1 = require("../Server/Main");
const Account_1 = __importDefault(require("./Account"));
let Bans = Bans_1 = class Bans extends sequelize_typescript_1.Model {
    // Target can be IP/Exact_Character_Name
    static async New(player, target, reason, date, expiring) {
        const IP = Main_1.Main.ValidateIP(target);
        if (IP) {
            const UserAcc = player.Account;
            const Banned = await Bans_1.create({ IP: target.ip, Reason: reason, Date: date, Expiring: expiring, Issuer: player.Account.id });
            if (UserAcc) {
                Banned.Account = UserAcc.id;
                Banned.HardwareId = UserAcc.Hardwer;
                Banned.Social = UserAcc.Social_Club;
            }
            await Banned.save();
        }
        else {
            let Online = mp.players.find(target);
            if (Online) {
                const Account = await Online.Account;
                Bans_1.create({ Account: Online.Account.id, Character: Online.Character.id, IP: Account.IP_Adress, Hardwer: Account.Hardwer, Social: Account.Social_Club, Date: date, Expiring: expiring, Issuer: player.Account.id });
                Online.kick(reason);
            }
            else {
                const OfflineAcc = await Account_1.default.findOne({ where: { Name: target } });
                if (OfflineAcc) {
                    Bans_1.create({ Account: OfflineAcc.id, Character: OfflineAcc.id, IP: OfflineAcc.IP_Adress, Hardwer: OfflineAcc.Hardwer, Social: OfflineAcc.Social_Club, Date: date, Expiring: expiring, Issuer: player.Account.id });
                }
                else {
                    // That user is not found
                    player.Notification(Messages_1.Messages.USER_NOT_FOUND, Globals_1.Globals.Notification.Error, 5);
                }
            }
        }
    }
    ;
    static async Delete(player) {
        const Result = await this.Check(player);
        if (Result) {
            Result.destroy();
            // Log
        }
    }
    static async Check(player) {
        const Result = await Bans_1.findOne({ where: { IP: player.ip, Social: player.socialClub } });
        return Result ? Result : false;
    }
    ;
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Bans.prototype, "ID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Bans.prototype, "Account", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Bans.prototype, "Character", void 0);
__decorate([
    sequelize_typescript_1.Default(''),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bans.prototype, "IP", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bans.prototype, "HardwareId", void 0);
__decorate([
    sequelize_typescript_1.Default(''),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bans.prototype, "Social", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Bans.prototype, "Issuer", void 0);
__decorate([
    sequelize_typescript_1.Default(''),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bans.prototype, "Reason", void 0);
__decorate([
    sequelize_typescript_1.Default(Date.now()),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bans.prototype, "Date", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Bans.prototype, "Expiring", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Bans.prototype, "Created_At", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Bans.prototype, "Updated_At", void 0);
Bans = Bans_1 = __decorate([
    sequelize_typescript_1.Table
], Bans);
exports.default = Bans;
(async () => {
    Bans.sync();
})();
