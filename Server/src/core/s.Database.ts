

import { Sequelize } from 'sequelize-typescript';

import { DatabaseConfig } from '@configs';
import { Lang } from '@constants';
import * as models from '@models';


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
      models.Logs,
      models.Bans,
      models.Accounts, 
      models.Characters, 
      models.Appearances,
      models.Items, 
      models.Phones,
      models.PhoneContacts,
      models.PhoneMessages,
      models.Vehicles,
      models.VehicleComponents,
      models.Banks,
      models.transactions,
      models.MoneyLogs,
      models.KillLogs,
      models.PropertyObjects,
      models.Properties,
      models.Products,
      models.Workers,
      models.Busines,
      models.Factions,
      models.FactionsRanks,
   ],
   logging: false
});

Database.authenticate()
   .then(() => { 
      models.Logs.succes(Lang.successDbConnection);
   })
   .then(() => { 
      return Database.sync()
   })
   .catch((error: any) => { 
      models.Logs.error(error);
   });


export default Database;