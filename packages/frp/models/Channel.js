


const { DataTypes } = require('sequelize');


frp.Channels = frp.Database.define('Channel', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Frequency: { type: DataTypes.INTEGER, unique: true, allowNull: false },
      Password: { type: DataTypes.STRING, defaultValue: 'no' },
      Owner: { type: DataTypes.INTEGER }
   },
   {
      timestamps: true,
      underscrored: true,
      createdAt: "Register_Date",
      updatedAt: "Update_Date"
   }
);

(async () => {
   frp.Channels.sync();
})();


