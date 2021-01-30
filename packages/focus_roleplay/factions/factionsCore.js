
const db = require('../core/database')
let factionsConst = require('./factionsConst')

module.exports = { 
   setLeader: function (player, faction) { 
      player.faction = faction;
   },

   getFaction: function (faction) { 
      return faction;
   },

   getLeader: async function (faction) { 
      await db.aQuery("SELECT * FROM `factions` WHERE `faction` = ?", faction).then(function (result) {
         return result[0].leader;
      })
   },

   invite: async function (player, target) { 
      let recipient = account.findPlayer(target);
      if (!recipient) { 
         player.outputChatBox('Korisnik nije pronadjen'); 
         return false; 
      } 

      let isLeader = await this.isFactionLeader(player, player.faction);
      if (!isLeader) { player.outputChatBox('Niste lider ove fakcije.'); return false; }
      if (recipient.faction != 0) { player.outputChatBox('Korisnik je vec u fakciji.'); return false } 

      recipient.inviteRequest = player.faction;
      recipient.outputChatBox(`${player.name} vam je poslao zahtev da se pridruzite njegovoj fakciji !`);
      player.outputChatBox(`Poslali ste ${recipient.name} zahtev za invite !`);
   },

   uninvite: async function (player, target) { 
      let recipient = account.findPlayer(target);
      if (!recipient) { 
         player.outputChatBox('Korisnik nije pronadjen.'); 
         return false; 
      } 

      let isLeader = await this.isFactionLeader(player, player.faction);
      if (!isLeader) { player.outputChatBox('Niste lider ove fakcije.'); return false; }
      if (recipient.faction != player.faction) { player.outputChatBox('Taj korisnik nije u vasoj fakciji.'); return false } 
      
      recipient.faction = 0;
      recipient.outputChatBox(`${player.name} vas je izbacio iz fakcije.`);
      player.outputChatBox(`Izbacili ste ${recipient.name} iz fakcije !`);
   },

   isFactionLeader: async function (player, faction) { 
      let result = await db.aQuery("SELECT * FROM `factions` WHERE `faction` = ?", faction)
      if(result[0].leader == player.databaseID) { 
         return true;
      }
      else { 
         return false;
      }
   }
}