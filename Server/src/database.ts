

import { Sequelize } from 'sequelize-typescript';

import { databaseConfig } from '@configs';
import { logs, accounts, characters, apppearances, banks, houses, business, bans, inventories } from '@models';
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
      apppearances,
      inventories, 
      banks,
      houses,
      business
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


(async () => { 

   const admins = [
      { Username: 'divine', Password: 'divine' },
      { Username: 'Zekiloni', Password: 'kapakapa' },
      { Username: 'pitix', Password: 'pitix' },
      { Username: 'deker', Password: 'deker' },
      { Username: 'shamzy', Password: 'shamzy' }
   ];

   for (const admin of admins) { 
      const exist = await accounts.findOne({ where: { username: admin.Username } });
      if (exist == null) { 
         accounts.create({ username: admin.Username, password: admin.Password, administrator: 7 });
      }
   }

   // TO DO
   // Items.findAll({ where: { on_ground: true } }).then(items => { 
   //    items.forEach(item => { 
   //       Items.refresh(item);
   //    })
   // })

   // Houses.findAll().then(houses => { 
   //    houses.forEach(house => { 
   //       house.refresh();
   //    })
   // });
})();


export default Database;