


const Ranks = {
   1: 'Helper',
   2: 'Junior Admin',
   3: 'Admin',
   4: 'Senior Admin',
   5: 'Leadership',
   6: 'CEO',
}

class Admin { 
   constructor () { /*
      mp.events.add({
         'event': (player, ...args) => { 

         }
      })*/
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
}

frp.Admin = new Admin();

frp.Reports = {};

class Report { 
   constructor (player, message) { 
      this.player = player;
      this.message = message;

      mp.reports[this.player] = this.message;
   }
}

mp.report = { 
   new: (player, message) => { 
      let report = new Report(player, message);
   },

   delete: (player) => { 
      delete mp.reports[player];
   }
}

