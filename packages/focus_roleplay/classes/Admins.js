
mp.admins = {
   1: 'Supporter',
   2: 'Junior Admin',
   3: 'Admin',
   4: 'Senior Admin',
   5: 'Lead Admin',
   6: 'Founder'
}

class Admin { 
   constructor () { 
      mp.events.add({
         'event': (player, ...args) => { 

         }
      })
   }


   set = (player, level) => { 

   }

   broadcast = (player, message) => { 
      mp.players.forEach( (target) => { 
         if (target.logged) {
            if (mp.accounts[target.account]) {
               if (mp.accounts[target.account].admin >= 1) { 
                  target.sendMessage(`${mp.admins[mp.accounts[target.account].admin]} ${player.name} [${player.id}]: ${message}`, mp.colors.admin)
               }
            }
         }
      })
   }
}

mp.admin = new Admin();

mp.reports = {};

class Report { 
   constructor (player, message) { 
      this.player = player;
      this.message = message;

      mp.reports[this.player] = this.message;
      console.log(mp.reports)
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

