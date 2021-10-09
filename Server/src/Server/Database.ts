

import { Sequelize } from 'sequelize-typescript';
import { Config } from '../Server/Config';
import { Main, LogType } from './Main';
import Characters from '../Models/Character';
import Accounts from '../Models/Database/Account';
//import Bans from '../Models/Ban';

//console.log(__dirname)

const Database = new Sequelize({
   database: Config.Database.Name,
   dialect: 'mysql',
   username: Config.Database.User,
   password: Config.Database.Password,
   storage: ':memory:',
   models: [ Accounts, Characters ],
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
      { Username: 'Zekiloni', Password: 'kapakapa' },
      { Username: 'Mile', Password: 'micko123' },
      { Username: 'Kopra', Password: 'vodavoda' },
      { Username: 'Pazzi', Password: '321123' },
      // Test accs
      { Username: 'Test', Password: '321123' },
      { Username: 'Test2', Password: '321123' }
   ];

   for (const Admin of Admins) { 
      const Exist = await Accounts.findOne({ where: { Username: Admin.Username } });
      if (Exist == null) { 
         Accounts.create({ Username: Admin.Username, Password: Admin.Password });
      }
   }

})();



export default Database;