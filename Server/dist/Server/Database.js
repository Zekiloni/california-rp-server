"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Config_1 = require("../Server/Config");
const Main_1 = require("./Main");
const Database = new sequelize_typescript_1.Sequelize({
    database: Config_1.Config.Database.Name,
    dialect: 'mysql',
    username: Config_1.Config.Database.User,
    password: Config_1.Config.Database.Password,
    storage: ':memory:',
    models: [__dirname + '/models']
});
Database.authenticate().then(() => {
}).catch((Error) => {
    Main_1.Main.Terminal(Main_1.LogType.Error, Error);
});
exports.default = Database;
