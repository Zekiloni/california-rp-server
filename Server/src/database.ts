

import { Sequelize } from 'sequelize-typescript';

import { Logger } from './utils';

import { logType } from './globals/enums';


import { databaseConfig } from './configs';


const Database = new Sequelize({
   database: databaseConfig.name,
   dialect: 'mysql',
   username: databaseConfig.user,
   password: databaseConfig.password,
   storage: ':memory:',
   models: [ 
      accounts, 
      Bans, 
      Characters, 
      Appearances, 
      Banks,
      Items,
      Business, 
      Houses,
   ],
   logging: false
});

Database.authenticate()
   .then(() => { 
      Logger(logType.SUCCESS, 'Connected');
   })
   .then(() => { 
      return Database.sync()
   })
   .catch((Error: any) => { 
      Logger(logType.ERROR, Error);
   });


(async () => { 

   const Admins = [
      { Username: 'divine', Password: 'divine' },
      { Username: 'Zekiloni', Password: 'kapakapa' },
      { Username: 'pitix', Password: 'pitix' },
      { Username: 'deker', Password: 'deker' },
      { Username: 'shamzy', Password: 'shamzy' }
   ];

   for (const Admin of Admins) { 
      const Exist = await Accounts.findOne({ where: { username: Admin.Username } });
      if (Exist == null) { 
         console.log('Admin Account Created ' + Admin.Username);
         Accounts.create({ username: Admin.Username, password: Admin.Password, administrator: 7 });
      }
   }


   Items.findAll({ where: { on_ground: true } }).then(items => { 
      items.forEach(item => { 
         Items.refresh(item);
      })
   })

   Houses.findAll().then(houses => { 
      houses.forEach(house => { 
         house.refresh();
      })
   });
})();


export default Database;