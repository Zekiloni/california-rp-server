
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

      mp.events.addCommand({
         'a': (player, message) => { 
            this.broadcast(player, message)
         }
      })
   }


   set = (player, level) => { 

   }

   broadcast = (player, message) => { 
      let playerAccount = mp.accounts[player.account];
      // if (!playerAccount.isAdmin(1)) return player.notificcation;
      
      mp.players.forEach( (target) => { 
         let account = mp.accounts[target.account];
         let admin = account.isAdmin(1);
         if (admin) { 
            target.outputChatBox(`!${"0080FF"} A | !${"FFFFFF"} ${message}`);
         }
      })
   }
}

mp.admin = new Admin();

