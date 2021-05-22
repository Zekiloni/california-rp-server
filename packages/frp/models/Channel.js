'use strict';
const { DataTypes } = require('sequelize');
frp.Channels = frp.Database.define('Channel', {
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
});
frp.Channels.New = async function (player, frequency, name = null, password = null) {
    let exist = await frp.Channels.count({ where: { Frequency: frequency } });
    if (exist != 0)
        return; // PORUKA: Vec Postoji frekvencija
    let Character = await player.Character();
    frp.Channels.create({ Frequency: frequency, Name: name, Password: password, Owner: Character.id });
    Character.Frequency = Frequency;
    // PORUKA: Uspesno ste kreirali frekvenciju
};
frp.Channels.Delete = async function (player) {
    let Character = await player.Character();
    let Channel = await this.findOne({ where: { Frequency: Character.Frequency } });
    await Channel.destroy();
    // PORUKA: Uspesno ste se izbrisali frekvenciju
};
frp.Channels.Join = async function (player, frequency, password = null) {
    let Character = await player.Character();
    let Channel = await frp.Channels.findOne({ where: { Frequency: frequency } });
    if (Channel) {
        if (Channel.Password != null) {
            if (Channel.Password != password) {
                // PORUKA: Nije tacna sifra frekvencije
                return;
            }
        }
        Character.Frequency = frequency;
        // PORUKA: Uspesno ste se prodruzili frekvenciji
    }
    else {
        // PORUKA: Frekvencija ne postoji
    }
};
frp.Channels.New(1, 911, null, 'kapakapa');
(async () => {
    frp.Channels.sync();
})();
