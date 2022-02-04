

import { Sequelize } from 'sequelize-typescript';

import { databaseConfig } from '@configs';
import { logs, accounts, characters, appearances, banks, houses, business, bans, inventories } from '@models';
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
      appearances,
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
      { Username: 'Parzival', Password: 'parzival' },
      { Username: 'pitix', Password: 'pitix' },
      { Username: 'deker', Password: 'deker' },
      { Username: 'VessX', Password: 'vessx' },
      { Username: 'Daquan', Password: 'daquan' },
      { Username: 'Wale', Password: 'wale' },
      { Username: 'The Primus', Password: 'theprimus' },
      { Username: 'Weber', Password: 'weber' },
      { Username: 'wuzi', Password: 'wuzi' },
      { Username: 'Milos', Password: 'milos' },
      { Username: 'villa', Password: 'villa' },
      { Username: 'Bolic', Password: 'jasampicka' },
      { Username: 'Frank', Password: 'frank' },
      { Username: 'Nimles', Password: 'nimles' },
      { Username: 'stepa', Password: 'stepa' },
      { Username: 'Nemac', Password: 'nemac' },
      { Username: 'don', Password: 'don' },
      { Username: 'armando', Password: 'armando' },
      { Username: 'kljadza', Password: 'kljadza' },
      { Username: 'irnes', Password: 'irnes' },
      { Username: 'bluakt', Password: 'bluakt' },
      { Username: 'jose', Password: 'jose' },
      { Username: 'rale', Password: 'rale' },
      { Username: 'vukodlak', Password: 'vukodlak' }
   ];

   for (const admin of admins) { 
      const exist = await accounts.findOne({ where: { username: admin.Username } });
      if (exist == null) { 
         accounts.create({ username: admin.Username, password: admin.Password, administrator: 7 });
      }
   }

   // TO DO
   inventories.findAll({ where: { on_ground: true } }).then(items => { 
      items.forEach(item => { 
         inventories.refresh(item);
      })
   })

   // Houses.findAll().then(houses => { 
   //    houses.forEach(house => { 
   //       house.refresh();
   //    })
   // });
})();


export default Database;