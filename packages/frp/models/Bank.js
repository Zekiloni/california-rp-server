

const { DataTypes } = require('sequelize');

frp.Accounts = frp.Database.define('Account', {
      Number: { type: DataTypes.INTEGER, unique: true },
      Pin: { type: DataTypes.INTEGER, allowNull: false },
      Balance: { type: DataTypes.INTEGER, defaultValue: 0 },
      Savings: { type: DataTypes.INTEGER, defaultValue: 0 },
      Paycheck: { type: DataTypes.INTEGER, defaultValue: 0 },
      Credit: { type: DataTypes.INTEGER, defaultValue: 0 },
      Active: { type: DataTypes.BOOLEAN, defaultValue: true }

   },

   {
      timestamps: true,
      underscrored: true,
      createdAt: "Created_Date",
      updatedAt: "Update_Date"
   }
);