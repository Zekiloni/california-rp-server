

const { DataTypes } = require('sequelize');

const Types = { 
   0: 'server',
   1: 'player',
   2: 'admin',
   3: 'money',
   4: 'sell',
   5: 'give'
}

frp.Logs = frp.Database.define('Log', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Type: { type: DataTypes.STRING, defaultValue: 0 },
      Account: { type: DataTypes.INTEGER },
      Character: { type: DataTypes.INTEGER },
      Participant: { type: DataTypes.INTEGER },
      Message: { type: DataTypes.STRING },
   },
   {
      timestamps: true,
      createdAt: 'Date',
      updatedAt: false,
   }
);

(async () => {
   frp.Logs.sync();
})();

