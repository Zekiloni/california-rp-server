
const db = require('../core/database')
let factionsConst = require('./factionsConst')
let factionsEvents = require('./factionsEvents')
let factionCmds = require('./factionCmds')

var factions = {

   setLeader: function (player, faction) { 
      player.faction = faction;
   },

   getFaction: function (id) { 
      let result = FACTIONS.find( ({ ID }) => ID === id );
      return result;
   },

   getLeader: async function (faction) { 
      await db.aQuery("SELECT * FROM `factions` WHERE `faction` = ?", faction).then(function (result) {
         return result[0].leader;
      })
   },

   invite: async function (player, target) { 
      let recipient = account.findPlayer(target);
      if (!recipient) { 
         player.notification(MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4) 
         return false; 
      } 

      let isLeader = await this.isFactionLeader(player, player.faction);
      if (!isLeader) { player.outputChatBox('Niste lider ove fakcije.'); return false; }
      if (recipient.faction != 0) { player.outputChatBox('Korisnik je vec u fakciji.'); return false } 

      let faction = factions.getFaction(player.faction)
      recipient.inviteRequest = player.faction;
      recipient.outputChatBox(`${player.name} vam je poslao zahtev da se pridruzite ${faction.NAME} !`);
      player.outputChatBox(`Poslali ste ${recipient.name} zahtev za invite !`);
   },

   uninvite: async function (player, target) { 
      let recipient = account.findPlayer(target);
      if (!recipient) { 
         player.notification(MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4) 
         return false; 
      } 

      let isLeader = await this.isFactionLeader(player, player.faction);
      if (!isLeader) { player.outputChatBox('Niste lider ove fakcije.'); return false; }
      if (recipient.faction != player.faction) { player.outputChatBox('Taj korisnik nije u vasoj fakciji.'); return false } 
      
      recipient.faction = 0;
      recipient.rank = 'no';
      recipient.outputChatBox(`${player.name} vas je izbacio iz fakcije.`);
      player.outputChatBox(`Izbacili ste ${recipient.name} iz fakcije !`);
   },

   setRank: async function (player, target, rank) { 
      let isLeader = await this.isFactionLeader(player, player.faction);
      if (!isLeader) { player.outputChatBox('Niste lider ove fakcije.'); return false; }
      if (target.faction != player.faction) { player.outputChatBox('Taj korisnik nije u vasoj fakciji.'); return false } 

      target.rank = rank;
      target.outputChatBox(`${player.name} vam je postavio rank na ${rank}.`);
      player.outputChatBox(`Postavili ste ${target.name} rank na ${rank} !`);
   },

   nearFactionVehicle: function (player) { 
      var result;
      mp.vehicles.forEach (
			(vehicle) => {
				if (player.dist(vehicle.position) < 2.0) {
               if(player.faction == vehicle.faction) { 
                  result =  vehicle;
               } 
            }
			}
      );
      return result;
   },

   isFactionLeader: async function (player, faction) { 
      let result = await db.aQuery("SELECT * FROM `factions` WHERE `faction` = ?", faction)
      if(result[0].leader == player.databaseID) { 
         return true;
      }
      else { 
         return false;
      }
   },

   isPlayerFactionType: function (player, type) { 
      if (player.faction == 0) return player.outputChatBox(`Niste ni u jednoj fakciji !`);
      let faction = factions.getFaction(player.faction);
      if (faction.TYPE == type) { 
         return true;
      }
      else { 
         return false;
      }
   }
}

module.exports = factions;

