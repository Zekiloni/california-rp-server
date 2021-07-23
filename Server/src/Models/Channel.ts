import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, AllowNull, ForeignKey } from 'sequelize-typescript';

@Table
export default class Channel extends Model {
   @Column
   @PrimaryKey
   @AutoIncrement
   ID: number;

   @Column
   @Unique(true)
   @AllowNull(false)
   Frequency: number;

   @Column
   @AllowNull(false)
   Password: string;

   @Column
   @AllowNull(false)
   Owner: number;

   @Column
   @CreatedAt
   Created_At: Date;

   @Column
   @UpdatedAt
   Updated_At: Date;

   static async New(Player: PlayerMp, NewFreq: number, NewPass: string) {
      const NewChannel = await Channel.create({ Frequency: NewFreq, Password: NewPass, Owner: Player.CHARACTER_ID });
   }

   static async Exists(FreqForCheck: number) {
      const Exist = await Channel.count({ where: { Frequency: FreqForCheck } });
      if (Exist > 0)
         return true;
      else
         return false;
   }

   async ChangePassword(NewPassword: string) {
      this.Password = NewPassword;
      await this.save();
   }

}

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