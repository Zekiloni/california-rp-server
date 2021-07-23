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
var Channel_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
let Channel = Channel_1 = class Channel extends sequelize_typescript_1.Model {
    static async New(Player, NewFreq, NewPass) {
        const NewChannel = await Channel_1.create({ Frequency: NewFreq, Password: NewPass, Owner: Player.CHARACTER_ID });
    }
    static async Exists(FreqForCheck) {
        const Exist = await Channel_1.count({ where: { Frequency: FreqForCheck } });
        if (Exist > 0)
            return true;
        else
            return false;
    }
    async ChangePassword(NewPassword) {
        this.Password = NewPassword;
        await this.save();
    }
};
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    __metadata("design:type", Number)
], Channel.prototype, "ID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.Unique(true),
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Number)
], Channel.prototype, "Frequency", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", String)
], Channel.prototype, "Password", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.AllowNull(false),
    __metadata("design:type", Number)
], Channel.prototype, "Owner", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Channel.prototype, "Created_At", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Channel.prototype, "Updated_At", void 0);
Channel = Channel_1 = __decorate([
    sequelize_typescript_1.Table
], Channel);
exports.default = Channel;
(async () => {
    await Channel.sync();
})();
/*
frp.Channels = frp.Database.define('channel', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Frequency: { type: DataTypes.INTEGER, unique: true, allowNull: false },
      Password: { type: DataTypes.STRING, defaultValue: null },
      Owner: { type: DataTypes.INTEGER, defaultValue: 0 }
   }, {
      timestamps: true,
      underscrored: true,
      createdAt: 'Created_Date',
      updatedAt: 'Update_Date'
   }
);


frp.Channels.New = async function (player, frequency, password = null) {

   if (!frp.Items.HasItem(player.character, 'Handheld Radio')) return player.Notification(frp.Globals.messages.YOU_DONT_HAVE + ' Handheld Radio.', frp.Globals.Notification.Error, 4);
   const exist = await frp.Channels.count({ where: { Frequency: frequency } });
   if (exist) return player.Notification(frp.Globals.messages.CHANNEL_ALREADY_EXISTS, frp.Globals.Notification.Error, 4);

   const Character = await player.Character();
   if (Character.Frequency != 0) return player.Notification(frp.Globals.messages.ALREADY_IN_CHANNEL, frp.Globals.Notification.Error, 4);

   frp.Channels.create({ Frequency: frequency, Password: password, Owner: Character.id });

   Character.Frequency = frequency;
   await Character.save();

   Character.GiveMoney(player, -frp.Settings.Frequency.Price);

   player.Notification(frp.Globals.messages.CHANNEL_SUCCESFULLY_CREATED, frp.Globals.Notification.Succes, 5);
};


frp.Channels.prototype.Delete = async function (player) {
   const Character = await player.Character();

   if (this.Owner == Character.id) return;

   Character.Frequency = 0;
   await Character.save();

   const Members = await frp.Characters.findAll({ where: { Frequency: this.Frequency }});
   Members.forEach(async (Member) => {
      Member.Frequency = 0;
      await Member.save();
   });

   await this.destroy();
   player.Notification(frp.Globals.messages.CHANNEL_SUCCESFULLY_DELETED, frp.Globals.Notification.Succes, 5);
};


frp.Channels.prototype.Send = async function (message) {
   mp.players.forEach(async (Target) => {
      if (Target.data.spawned) {
         const Character = await Target.Character();
         if (Character.Frequency == this.Frequency) {
            Target.SendMessage(message, frp.Globals.Colors.radio);
         }
      }
   });
};


frp.Channels.Edit = async function (player, password) {

   const Character = await player.Character();
   if (Character.Frequency == 0) return;

   const Channel = frp.Channels.findOne({ where: { Frequency: Character.Frequency } });

   if (Channel.Owner != player.character) return player.Notification(frp.Globals.messages.NOT_ALLOWED, frp.Globals.Notification.Error, 5);

   Channel.Password = password;
   await Channel.save();

   player.Notification(frp.Globals.messages.CHANNEL_SUCCESFULLY_EDITED, frp.Globals.Notification.Succes, 5);
};


frp.Channels.Join = async function (player, frequency, password = null) {
   const exist = await frp.Channels.count({ where: { Frequency: frequency } });
   if (!exist) return player.Notification(frp.Globals.messages.CHANNEL_NOT_FOUND, frp.Globals.Notification.Error, 4);

   if (this.Password != null && this.Password != password) return player.Notification(frp.Globals.messages.CHANNEL_WRONG_PASSWORD, frp.Globals.Notification.Error, 4);

   const Character = await player.Character();
   Character.Frequency = frequency;
   await Character.save();

   player.Notification(frp.Globals.messages.SUCCESSFULY_JOINED_CHANNEL, frp.Globals.Notification.Succes, 4);
};

frp.Channels.Leave = async function (player) {
   const Character = await player.Character();
   if (Character.Frequency == 0) return player.Notification(frp.Globals.messages.NOT_IN_CHANNEL, frp.Globals.Notification.Error, 4);

   const Frequency = await frp.Channels.findOne({ where: { Frequency: Character.Frequency } });
   if (Frequency.Owner == player.character) return player.Notification(frp.Globals.messages.NOT_ALLOWED, frp.Globals.Notification.Error, 4);

   Character.Frequency = 0;
   await Character.save();

   player.Notification(frp.Globals.messages.CHANNEL_SUCCESFULLY_LEAVED, frp.Globals.Notification.Succes, 4);
};


(async () => {
   frp.Channels.sync();
})();
*/ 
