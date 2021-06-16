

const Ban = require('../models/Ban');

const Ranks = {
   1: 'Helper',
   2: 'Junior Admin',
   3: 'Admin',
   4: 'Senior Admin',
   5: 'Leadership',
   6: 'CEO',
}

class Admin { 
   constructor () { 
      this.Reports = [];
   }

   Chat (player, message) { 
      if (!message.trim()) return;

      mp.players.forEach(async (target) => { 
         if (target.data.logged && target.data.spawned) { 
            let Account = await frp.Accounts.findOne({ where: { id: target.account }});
            if (Account.Administrator > 0) { 
               let Rank = Account.Administrator;
               target.sendMessage('(( ' + Ranks[Rank] + ' ' + player.name + ': ' + message + ' ))', frp.Globals.Colors.admin);
            }
         }
      })
   }

   async Broadcast (player, message) {
      if (!message.trim()) return;

      let Account = await frp.Accounts.findOne({ where: { id: player.account }});
      let Rank = Account.Administrator;

      mp.players.forEach((target) => { 
         if (target.data.logged && target.data.spawned) { 
            target.sendMessage('(( [ ! ] ' + Ranks[Rank] + ' ' + player.name + ': ' + message + ' ))', frp.Globals.Colors.broadcast);
         }
      });
   }

   async Ban (player, target, reason, days = 9999) { 
      const Now = Date.now();
      let Expiring = Now + (86400 * days);
      
      frp.Bans.New(player, target, reason, Now, Expiring);

   }

   Report = { 
      Add: (player, message) => { 

         let Report = { Sender: player, Content: message };
         this.Reports.push(Report);

         console.log(this.Reports)
      },

      Remove: (i) => { 
         this.Reports.splice(i, 1);
      }
    
   }
}

frp.Admin = new Admin();



