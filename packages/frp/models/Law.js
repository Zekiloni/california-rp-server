
// const { DataTypes } = require('sequelize');

// frp.Warrants = frp.Database.define('warrant', {
//       id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//       Name: { type: DataTypes.STRING, allowNull: false },
//       Type: { type: DataTypes.STRING, allowNull: false },
//       Status: { type: DataTypes.INTEGER, defaultValue: 0 },
//       Address: { type: DataTypes.STRING, defaultValue: 'Unknown' },
//       Note: { type: DataTypes.STRING, defaultValue: '...' },
//       Issuer: { type: DataTypes.STRING, defaultValue: 'Officer' },
//    }, {
//       timestamps: true,
//       underscrored: true,
//       createdAt: 'Created_Date',
//       updatedAt: 'Update_Date'
//    }
// );


// frp.Tickets = frp.Database.define('ticket', {
//       id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//       Name: { type: DataTypes.STRING, allowNull: false },
//       Type: { type: DataTypes.STRING, allowNull: false },
//       Status: { type: DataTypes.INTEGER, defaultValue: 0 },
//       Address: { type: DataTypes.STRING, defaultValue: 'Unknown' },
//       Note: { type: DataTypes.STRING, defaultValue: '...' },
//       Issuer: { type: DataTypes.STRING, defaultValue: 'Officer' },
//    }, {
//       timestamps: true,
//       underscrored: true,
//       createdAt: 'Created_Date',
//       updatedAt: 'Update_Date'
//    }
// );


// frp.Tickets.prototype.Pay = async function (player) {


// };


// (async () => { 

//    await frp.Warrants.sync();
//    await frp.Tickets.sync();

// })();