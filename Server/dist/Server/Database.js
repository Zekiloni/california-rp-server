"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Config_1 = require("../Server/Config");
const Main_1 = require("./Main");
const Character_1 = __importDefault(require("../Models/Character"));
const Account_1 = __importDefault(require("../Models/Account"));
const Ban_1 = __importDefault(require("../Models/Ban"));
console.log(__dirname);
const Database = new sequelize_typescript_1.Sequelize({
    database: Config_1.Config.Database.Name,
    dialect: 'mysql',
    username: Config_1.Config.Database.User,
    password: Config_1.Config.Database.Password,
    storage: ':memory:',
    models: [Character_1.default, Account_1.default, Ban_1.default]
});
Database.authenticate()
    .then(() => {
    Main_1.Main.Terminal(Main_1.LogType.Succes, 'Connected');
})
    .then(() => {
    return Database.sync();
})
    .catch((Error) => {
    Main_1.Main.Terminal(Main_1.LogType.Error, Error);
});
// Accounts.create({ Username: 'Zekiloni', Password: 'test' });
exports.default = Database;
