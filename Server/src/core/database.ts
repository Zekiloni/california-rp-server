

import { Sequelize } from 'sequelize-typescript';
import Characters from '../models/Character';
import Accounts from '../models/Account';
import { Config } from '../constants';
import Appearances from '../models/Appearance';
import { Logger } from '../utils';
import { LogType } from '@Shared/enums';


const Database = new Sequelize({
   database: Config.Database.Name,
   dialect: 'mysql',
   username: Config.Database.User,
   password: Config.Database.Password,
   storage: ':memory:',
   models: [ Accounts, Characters, Appearances ],
   logging: false
});

Database.authenticate()
.then(() => { 
   Logger(LogType.SUCCESS, 'Connected');
})
.then(() => { 
   return Database.sync()
})
.catch((Error: any) => { 
   Logger(LogType.ERROR, Error);
});


(async () => { 

   const Admins = [
      { Username: 'Zekiloni', Password: 'kapakapa' }
   ];

   for (const Admin of Admins) { 
      const Exist = await Accounts.findOne({ where: { Username: Admin.Username } });
      console.log(Admin);
      if (Exist == null) { 
         Accounts.create({ Username: Admin.Username, Password: Admin.Password });
      }
   }

})();


export default Database;