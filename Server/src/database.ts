

import { Sequelize } from 'sequelize-typescript';

import { databaseConfig } from '@configs';
import { logs, accounts, characters, appearances, banks, houses, business, bans, inventories, products, workers } from '@models';
import { lang } from '@constants';


const Database = new Sequelize({
   database: databaseConfig.name,
   dialect: 'mysql',
   username: databaseConfig.user,
   password: databaseConfig.password,
   storage: ':memory:',
   models: [ 
      bans,
      logs, 
      accounts, 
      characters, 
      appearances,
      inventories, 
      banks,
      houses,
      business,
      products,
      workers
   ],
   logging: false
});

Database.authenticate()
   .then(() => { 
      logs.succes(lang.successDbConnection);
   })
   .then(() => { 
      return Database.sync()
   })
   .catch((error: any) => { 
      logs.error(error);
   });



export default Database;