

import { Sequelize } from 'sequelize-typescript';
import { Config } from '../Server/Config';
import { Main, LogType } from './Main';
import Characters from '../Models/Character';
import Accounts from '../Models/Account';
import Bans from '../Models/Ban';

console.log(__dirname)

const Database = new Sequelize({
   database: Config.Database.Name,
   dialect: 'mysql',
   username: Config.Database.User,
   password: Config.Database.Password,
   storage: ':memory:',
   models: [ Characters, Accounts, Bans ] 
});

Database.authenticate()
.then(() => { 
   Main.Terminal(LogType.Succes, 'Connected');
})
.then(() => { 
   return Database.sync()
})
.catch((Error: any) => { 
   Main.Terminal(LogType.Error, Error);
});



// Accounts.create({ Username: 'Zekiloni', Password: 'test' });
Characters.create({ Name: 'Zachary Parker', Account: 1 });

export default Database;