

import { Sequelize } from 'sequelize-typescript';

import { DatabaseConfig } from '@configs';
import * as models from '@models';
import { lang } from '@constants';


const Database = new Sequelize({
   database: DatabaseConfig.name,
   dialect: 'mysql',
   dialectOptions: {
      charset: 'UTF8_GENERAL_CI'
   },
   username: DatabaseConfig.user,
   password: DatabaseConfig.password,
   storage: ':memory:',
   models: [ 
      models.Bans,
      models.logs, 
      models.Accounts, 
      models.Characters, 
      models.appearances,
      models.inventories, 
      models.vehicles,
      models.banks,
      models.transactions,
      models.moneyLogs,
      models.killLogs,
      models.objects,
      models.houses,
      models.Products,
      models.Workers,
      models.Busines,
      models.factions,
      models.factionsRanks,
   ],
   logging: false
});

Database.authenticate()
   .then(() => { 
      models.logs.succes(lang.successDbConnection);
   })
   .then(() => { 
      return Database.sync()
   })
   .catch((error: any) => { 
      models.logs.error(error);
   });




export default Database;