"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Config_1 = require("../Server/Config");
const Main_1 = require("./Main");
const Character_1 = __importDefault(require("../Models/Character"));
const Account_1 = __importDefault(require("../Models/Database/Account"));
//import Bans from '../Models/Ban';
//console.log(__dirname)
const Database = new sequelize_typescript_1.Sequelize({
    database: Config_1.Config.Database.Name,
    dialect: 'mysql',
    username: Config_1.Config.Database.User,
    password: Config_1.Config.Database.Password,
    storage: ':memory:',
    models: [Account_1.default, Character_1.default],
    logging: false
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
(async () => {
    const Admins = [
        { Username: 'Zekiloni', Password: 'kapakapa' },
        { Username: 'Mile', Password: 'micko123' },
        { Username: 'Kopra', Password: 'vodavoda' },
        { Username: 'Pazzi', Password: '321123' },
        // Test accs
        { Username: 'Test', Password: '321123' },
        { Username: 'Test2', Password: '321123' }
    ];
    for (const Admin of Admins) {
        const Exist = await Account_1.default.findOne({ where: { Username: Admin.Username } });
        console.log(Admin);
        if (Exist == null) {
            Account_1.default.create({ Username: Admin.Username, Password: Admin.Password });
        }
    }
})();
exports.default = Database;
