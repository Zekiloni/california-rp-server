"use strict";
const { DataTypes } = require('sequelize');
frp.Appearances = frp.Database.define('appearance', {
    Character: { type: DataTypes.INTEGER, unique: true },
    Eyes: { type: DataTypes.INTEGER, defaultValue: 0 },
    Face_Features: {
        type: DataTypes.TEXT, defaultValue: null,
        get: function () { return JSON.parse(this.getDataValue('Face_Features')); },
        set: function (value) { this.setDataValue('Face_Features', JSON.stringify(value)); }
    },
    Blend_Data: {
        type: DataTypes.TEXT, defaultValue: null,
        get: function () { return JSON.parse(this.getDataValue('Blend_Data')); },
        set: function (value) { this.setDataValue('Blend_Data', JSON.stringify(value)); }
    },
    Hair: {
        type: DataTypes.TEXT, defaultValue: null,
        get: function () { return JSON.parse(this.getDataValue('Hair')); },
        set: function (value) { this.setDataValue('Hair', JSON.stringify(value)); }
    },
    Beard: {
        type: DataTypes.TEXT, defaultValue: null,
        get: function () { return JSON.parse(this.getDataValue('Beard')); },
        set: function (value) { this.setDataValue('Beard', JSON.stringify(value)); }
    },
    Overlays: {
        type: DataTypes.TEXT, defaultValue: null,
        get: function () { return JSON.parse(this.getDataValue('Overlays')); },
        set: function (value) { this.setDataValue('Overlays', JSON.stringify(value)); }
    },
    Overlays_Colors: {
        type: DataTypes.TEXT, defaultValue: null,
        get: function () { return JSON.parse(this.getDataValue('Overlays_Colors')); },
        set: function (value) { this.setDataValue('Overlays_Colors', JSON.stringify(value)); }
    }
}, {
    timestamps: true,
    underscrored: true,
    createdAt: false,
    updatedAt: 'Update_Date',
});
frp.Appearances.prototype.Apply = function (player, gender) {
    const Genders = [mp.joaat('mp_m_freemode_01'), mp.joaat('mp_f_freemode_01')];
    player.model = Genders[gender];
    player.setHeadBlend(parseInt(this.Blend_Data[0]), parseInt(this.Blend_Data[1]), 0, parseInt(this.Blend_Data[2]), parseInt(this.Blend_Data[3]), 0, parseFloat(this.Blend_Data[4]), parseFloat(this.Blend_Data[5]), 0);
    player.eyeColor = parseInt(this.Eyes);
    player.setClothes(2, parseInt(this.Hair[0]), 0, 2);
    player.setHairColor(parseInt(this.Hair[1]), parseInt(this.Hair[2]));
    for (let i = 0; i < 20; i++) {
        player.setFaceFeature(i, parseFloat(this.Face_Features[i]));
    }
    // uraditi apply odece
};
(async () => {
    frp.Appearances.sync();
})();
