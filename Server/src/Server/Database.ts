

import { Sequelize } from 'sequelize-typescript';
import { Config } from '../Server/Config';
import { Main, LogType } from './Main';
import Characters from '../Models/Character';
import Accounts from '../Models/Account.model';
//import Bans from '../Models/Ban';

//console.log(__dirname)

const Database = new Sequelize({
   database: Config.Database.Name,
   dialect: 'mysql',
   username: Config.Database.User,
   password: Config.Database.Password,
   storage: ':memory:',
   models: [ Accounts, Characters ] 
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



   // const Acc = await Accounts.create({ Username: 'Zekiloni', Password: 'test' });
   // const char = new Characters({ Name: 'Zachary Parker', Account_id: Acc.id });
   // char.save();
   // const aca = await Characters.findAll({ include: [Accounts] })
   // aca[0].Account.Username = 'Dzafur';
   // aca[0].save();

   //Characters.create({ Name: 'Zachary Parker', Account: 1 });
})();



export default Database;