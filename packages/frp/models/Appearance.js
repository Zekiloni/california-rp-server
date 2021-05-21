

const { DataTypes } = require('sequelize');


frp.Appearances = frp.Database.define('Appearance', {
   
      Character: { type: DataTypes.TEXT, unique: true },
      Mask: { type: DataTypes.TEXT, defaultValue: '[0, 0]' },
      Shirt: { type: DataTypes.TEXT, defaultValue: '[0, 0]' },
      Undershirt: { type: DataTypes.TEXT, defaultValue: '[0, 0]' },
      Legs: { type: DataTypes.TEXT, defaultValue: '[0, 0]' },
      Shoes: { type: DataTypes.TEXT, defaultValue: '[0, 0]' },
      Bags: { type: DataTypes.TEXT, defaultValue: '[0, 0]' },
      Armour: { type: DataTypes.TEXT, defaultValue: '[0, 0]' },
      Accessories: { type: DataTypes.TEXT, defaultValue: '[0, 0]' },

      Hat: { type: DataTypes.TEXT, defaultValue: '[0, 0]' },
      Glasses: { type: DataTypes.TEXT, defaultValue: '[0, 0]' },
      Ears: { type: DataTypes.TEXT, defaultValue: '[0, 0]' },
      Watch: { type: DataTypes.TEXT, defaultValue: '[0, 0]' },
      Bracelet: { type: DataTypes.TEXT, defaultValue: '[0, 0]' },

      FaceFeatures: { type: DataTypes.TEXT, defaultValue: '[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]' },
      BlendData: { type: DataTypes.TEXT, defaultValue: '' },
      Eyes: { type: DataTypes.INTEGER, defaultValue: 0 },
      Hair: { type: DataTypes.TEXT, defaultValue: '[0, 0]' },
      Beard: { type: DataTypes.TEXT, defaultValue: '[0, 0]' },
      Eyes: { type: DataTypes.TEXT, defaultValue: '[0, 0]' },
   },

   {
      timestamps: false,
      underscrored: true,
      createdAt: false,
      updatedAt: false,
   }
);

(async () => { 
   frp.Appearances.sync();
})();

frp.Appearances.prototype.Apply = function (Character, player) { 

   console.log(this);

   // hair
   let hair = JSON.parse(this.Hair);
   player.setClothes(2, parseInt(hair[0]), 0, 2);

   // beard
   let beard = JSON.parse(this.Beard);
   if (Character.Gender == 0) { player.setHeadOverlay(1, [parseInt(beard[0]), 1.0, parseInt(beard[1]), 0]); }


}


