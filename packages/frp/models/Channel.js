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
      createdAt: "Created_Date",
      updatedAt: "Update_Date"
   }
);


frp.Channels.New = async function (player, frequency, name = null, password = null) {
   let exist = await frp.Channels.count({ where: { Frequency: frequency } });
   if (exist != 0) return; // PORUKA: Vec Postoji frekvencija
   let Character = await player.Character();
   frp.Channels.create({ Frequency: frequency, Name: name, Password: password, Owner: Character.id });
   Character.Frequency = Frequency;
   // PORUKA: Uspesno ste kreirali frekvenciju
};


frp.Channels.prototype.Delete = async function (player) {
   await this.destroy();
   // PORUKA: Uspesno ste se izbrisali frekvenciju
};


frp.Channels.prototype.Join = async function (player, password = null) { 
   let Character = await player.Character();

   if (this.Password != null && this.Password != password) return; // PORUKA: Nije tacna sifra frekvencij 
   Character.Frequency = frequency;
};



(async () => {
    frp.Channels.sync();
})();
