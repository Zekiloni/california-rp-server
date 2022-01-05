

import { Sequelize } from 'sequelize-typescript';
import { Main, LogType } from './Main';
import Characters from '../Models/Character';
import Accounts from '../Models/Account';
import { Config } from '../constants';
import Appearances from '../Models/Appearance';

//console.log(__dirname)

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
   Main.Terminal(LogType.Succes, 'Connected');
})
.then(() => { 
   return Database.sync()
})
.catch((Error: any) => { 
   Main.Terminal(LogType.Error, Error);
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