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
var Ban_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Messages_1 = require("../Globals/Messages");
const Main_1 = require("../Server/Main");
const Account_1 = require("./Account");
let Ban = Ban_1 = class Ban extends sequelize_typescript_1.Model {
    constructor() {
        super(...arguments);
        this.BanPlayer = async function (player, target, reason, date, expiring, isIp = false) {
            if (isIp) {
                const IP = Main_1.Main.ValidateIP(target.ip);
                if (IP) {
                    const UserAcc = await Account_1.Account.findOne({ where: { id: player.CHARACTER_ID } });
                    const Banned = await Ban_1.create({ IP: target.ip, Reason: reason, Date: date, Expiring: expiring, Issuer: player.ACCOUNT_ID });
                    if (UserAcc) {
                        Banned.Account = UserAcc.id;
                        Banned.HardwareId = UserAcc.Hardwer;
                        Banned.Social = UserAcc.Social_Club;
                    }
                    await Banned.save();
                }
            }
            else {
                let Online = mp.players.find(target);
                if (Online) {
                    const ActiveChar = await Character.findOne({ where: { id: Online.CHARACTER_ID } });
                    Ban_1.create({ Account: ActiveChar.id, Character: ActiveChar.id, IP: ActiveChar.ip, Hardwer: ActiveChar.Hardwer, Social: ActiveChar.Social_Club, Date: date, Expiring: expiring, Issuer: player.ACCOUNT_ID });
                    Online.kick(reason);
                }
                else {
                    const OfflineChar = await Character.findOne({ where: { Name: target } });
                    if (OfflineChar) {
                        Ban_1.create({ Account: OfflineChar.id, Character: OfflineChar.id, IP: OfflineChar.ip, Hardwer: OfflineChar.Hardwer, Social: OfflineChar.Social_Club, Date: date, Expiring: expiring, Issuer: player.ACCOUNT_ID });
                    }
                    else {
                        // That user is not found
                        player.Notification(Messages_1.Messages.USER_NOT_FOUND, frp.Globals.Notification.Error, 5);
                    }
                }
            }
        };
    }
};
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    __metadata("design:type", Number)
], Ban.prototype, "ID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Ban.prototype, "Account", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Ban.prototype, "Character", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(''),
    __metadata("design:type", String)
], Ban.prototype, "IP", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(0),
    __metadata("design:type", String)
], Ban.prototype, "HardwareId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(''),
    __metadata("design:type", String)
], Ban.prototype, "Social", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(0),
    __metadata("design:type", Number)
], Ban.prototype, "Issuer", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(''),
    __metadata("design:type", String)
], Ban.prototype, "Reason", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(Date.now()),
    __metadata("design:type", String)
], Ban.prototype, "Date", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Default(0),
    __metadata("design:type", String)
], Ban.prototype, "Expiring", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Ban.prototype, "Created_At", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Ban.prototype, "Updated_At", void 0);
Ban = Ban_1 = __decorate([
    sequelize_typescript_1.Table
], Ban);
(async () => {
    Ban.sync();
})();
