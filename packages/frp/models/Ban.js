


const { DataTypes } = require('sequelize');

frp.Bans = frp.Database.define('Ban', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Account: { type: DataTypes.INTEGER, defaultValue: 0 },
      Character: { type: DataTypes.INTEGER, defaultValue: 0 },
      IP: { type: DataTypes.STRING },
      Hardwer: { type: DataTypes.STRING },
      Social: { type: DataTypes.STRING },
      Issuer: { type: DataTypes.INTEGER, defaultValue: 0 },
      Reason: { type: DataTypes.STRING, defaultValue: 'Server' },
      Date: { type: DataTypes.STRING, defaultValue: Math.floor(Date.now() / 1000) },
      Expiring: { type: DataTypes.STRING, defaultValue: Math.floor(Date.now() / 1000) }
   },

   {
      timestamps: false,
      underscrored: true,
      createdAt: false,
      updatedAt: false
   }
);

(async () => {
   frp.Bans.sync()
})();
