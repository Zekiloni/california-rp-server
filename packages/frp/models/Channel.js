'use strict';

const { DataTypes } = require('sequelize');

frp.Channels = frp.Database.define('channel', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Frequency: { type: DataTypes.INTEGER, unique: true, allowNull: false },
      Name: { type: DataTypes.STRING, defaultValue: null },
      Password: { type: DataTypes.STRING, defaultValue: null },
      Owner: { type: DataTypes.INTEGER, defaultValue: 0 }
   }, {
      timestamps: true,
      underscrored: true,
      createdAt: 'Created_Date',
      updatedAt: 'Update_Date'
   }
);


frp.Channels.New = async function (player, frequency, name = null, password = null) {
   if (!frp.Items.HasItem(player.character, 'Handheld Radio')) return player.Notification(frp.Globals.messages.YOU_DONT_HAVE + ' Handheld Radio.', frp.Globals.Notification.Error, 4);
   const exist = await frp.Channels.count({ where: { Frequency: frequency } });
   if (exist) return player.Notification(frp.Globals.messages.CHANNEL_ALREADY_EXISTS, frp.Globals.Notification.Error, 4);
   const Character = await player.Character();
   if (Character.Frequency != 0) return player.Notification(frp.Globals.messages.ALREADY_IN_CHANNEL, frp.Globals.Notification.Error, 4);
   frp.Channels.create({ Frequency: frequency, Name: name, Password: password, Owner: Character.id });
   Character.Frequency = Frequency;
   Character.GiveMoney(player, -frp.Settings.Frequency.Price);
   player.Notification(frp.Globals.messages.CHANNEL_SUCCESFULLY_CREATED, frp.Globals.Notification.Succes, 5);
};


frp.Channels.prototype.Delete = async function (player) {
   const Character = await player.Character();
   Character.Frequency = 0;
   const Members = await frp.Characters.findAll({ where: { Frequency: this.Frequency }});
   Members.forEach(Member => {
      Member.setDataValue('Frequency', 0);
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


frp.Channels.prototype.Edit = async function (player, data, value) { 
   if (this.Owner != player.character) return player.Notification(frp.Globals.messages.NOT_ALLOWED, frp.Globals.Notification.Error, 5);

   switch (data) { 
      case 'name' : this.Name = value; break;
      case 'password': this.Password = value; break;
   }

   await this.save();
   player.Notification(frp.Globals.messages.CHANNEL_SUCCESFULLY_EDITED, frp.Globals.Notification.Succes, 5);
};

frp.Channels.prototype.Join = async function (player, password = null) { 
   let Character = await player.Character();

   if (this.Password != null && this.Password != password) return; // PORUKA: Nije tacna sifra frekvencij 
   Character.Frequency = frequency;
};



(async () => {
    frp.Channels.sync();
})();
