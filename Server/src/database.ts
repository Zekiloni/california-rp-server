

import { Sequelize } from 'sequelize-typescript';

import { DatabaseConfig } from '@configs';
import * as models from '@models';
import { Lang } from '@constants';


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
      models.Items, 
      models.Vehicles,
      models.VehicleComponents,
      models.banks,
      models.transactions,
      models.MoneyLogs,
      models.KillLogs,
      models.objects,
      models.houses,
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
      models.logs.succes(Lang.successDbConnection);
   })
   .then(() => { 
      return Database.sync()
   })
   .catch((error: any) => { 
      models.logs.error(error);
   });




export default Database;