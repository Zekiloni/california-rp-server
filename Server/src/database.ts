

import { Sequelize } from 'sequelize-typescript';

import { Logger } from './utils';
import { logType } from './globals/enums';
import { Config } from './config';

import Accounts from './models/account.model';
import Bans from './models/ban.model';
import Characters from './models/character.model';
import Appearances from './models/appearance.model';
import Items from './models/inventory.item.model';
import Business from './models/business.model';
import Houses from './models/house.model';

const Database = new Sequelize({
   database: Config.Database.Name,
   dialect: 'mysql',
   username: Config.Database.User,
   password: Config.Database.Password,
   storage: ':memory:',
   models: [ 
      Accounts, Bans, Characters, Appearances, Items, Business, Houses
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