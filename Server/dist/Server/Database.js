"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Config_1 = require("../Server/Config");
const Main_1 = require("./Main");
const Character_1 = __importDefault(require("../Models/Character"));
const Account_model_1 = __importDefault(require("../Models/Account.model"));
console.log(__dirname);
const Database = new sequelize_typescript_1.Sequelize({
    database: Config_1.Config.Database.Name,
    dialect: 'mysql',
    username: Config_1.Config.Database.User,
    password: Config_1.Config.Database.Password,
    storage: ':memory:',
    models: ['/Models/**/*.model.ts']
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
Database.addModels([__dirname + '/**/*.model.ts']);
(async () => {
    const Admins = [
        { Username: 'Zekiloni', Password: 'kapakapa' },
        { Username: 'Mile', Password: 'micko123' }
    ];
    for (const Admin of Admins) {
        const Exist = await Account_model_1.default.findOne({ where: { Username: Admin.Username } });
        console.log(Admin);
        if (Exist == null) {
            Account_model_1.default.create({ Username: Admin.Username, Password: Admin.Password });
        }
    }
    // const Acc = await Accounts.create({ Username: 'Zekiloni', Password: 'test' });
    // const char = new Characters({ Name: 'Zachary Parker', Account_id: Acc.id });
    // char.save();
    const aca = await Character_1.default.findAll({ include: [Account_model_1.default] });
    aca[0].Account.Username = 'Dzafur';
    aca[0].save();
    //Characters.create({ Name: 'Zachary Parker', Account: 1 });
})();
exports.default = Database;
