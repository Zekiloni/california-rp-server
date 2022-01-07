

import { Sequelize } from 'sequelize-typescript';

import { Logger } from './utils';
import { LogType } from './enums';
import { Config } from './config';

import Accounts from './models/account.model';
import Bans from './models/ban.model';
import Characters from './models/character.model';
import Appearances from './models/appearance.model';

const Database = new Sequelize({
   database: Config.Database.Name,
   dialect: 'mysql',
   username: Config.Database.User,
   password: Config.Database.Password,
   storage: ':memory:',
   models: [ 
      Accounts, Bans, Characters, Appearances, 
   ],
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
         Accounts.create({ Username: Admin.Username, Password: Admin.Password, Administrator: 7 });
      }
   }

})();


export default Database;