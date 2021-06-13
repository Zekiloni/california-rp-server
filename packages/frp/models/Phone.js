
const { DataTypes } = require('sequelize');

frp.Contacts = frp.Database.define('contact', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Phone: { type: DataTypes.INTEGER, unique: true, allowNull: false },
      Name: { type: DataTypes.STRING, allowNull: false },
      number: { type: DataTypes.INTEGER, allowNull: false }
   }, {
      timestamps: true,
      underscrored: true,
      createdAt: "Date",
      updatedAt: false
   }
);


frp.Messages = frp.Database.define('message', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Phone: { type: DataTypes.INTEGER, unique: true, allowNull: false },
      Target: { type: DataTypes.INTEGER, allowNull: false },
      Message: { type: DataTypes.STRING, allowNull: false }
   }, {
      timestamps: true,
      underscrored: true,
      createdAt: "Date",
      updatedAt: false
   }
);


(async () => {
   frp.Messages.sync();
   frp.Contacts.sync();
})();
