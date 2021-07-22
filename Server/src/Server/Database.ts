

import { Sequelize } from 'sequelize-typescript';
import { Config } from '../Config';
import { Main, LogType } from './Main';


const Database = new Sequelize({
   database: Config.Database.Name,
   dialect: 'mysql',
   username: Config.Database.User,
   password: Config.Database.Password,
   storage: ':memory:',
   models: [__dirname + '/models'] 
});

Database.authenticate().then(() => { 

}).catch((Error: any) => { 
   Main.Terminal(LogType.Error, Error);
});

export default Database;