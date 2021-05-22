const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(frp.Config.database.name, frp.Config.database.user, frp.Config.database.password, {
    host: frp.Config.database.host,
    dialect: 'mysql',
    logging: frp.Settings.database.logging,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
sequelize
    .authenticate()
    .then(() => {
    frp.Main.Terminal(3, 'MYSQL Connection Successful.');
})
    .catch((err) => {
    frp.Main.Terminal(1, 'Error Connecting to Database ' + err);
});
module.exports = sequelize;
