
const db = require('../core/database')
let factionsConst = require('./factionsConst')
let factionsEvents = require('./factionsEvents')
let factionCmds = require('./factionCmds')

module.exports = { 

   initFactions: function () {
      let counter = 0;
      FACTIONS.forEach(function (f) {
         
         let labPos = f.LABEL_POINT, 
            bliPos = f.BLIP_POINT, 
            garagePos = f.GARAGE_POINT,
            weaPos = f.WEAPON_POINT,
            equPos = f.EQUIP_POINT;

         let label = mp.labels.new(`${f.NAME}~n~${f.DESC}`, new mp.Vector3(labPos.x, labPos.y, labPos.z), { los: true, font: 0, drawDistance: 4});
         let blip = mp.blips.new(f.BLIP, new mp.Vector3(bliPos.x, bliPos.y, bliPos.z), { name: f.NAME, color: 4, shortRange: true, });
         
         mp.markers.new(27, new mp.Vector3(weaPos.x, weaPos.y, weaPos.z - 0.99), 0.8,
         { direction: new mp.Vector3(90, 0, 0), rotation: new mp.Vector3(0, 0, 90), color: [SERVER_COLOR.R, SERVER_COLOR.G, SERVER_COLOR.B, 255], visible: true, dimension: 0 });
         let weaponCol = mp.colshapes.newRectangle(weaPos.x, weaPos.y, 1.5, 2, 0)
         weaponCol.name = 'weapon';

         let equipMarker = mp.markers.new(27, new mp.Vector3(equPos.x, equPos.y, equPos.z - 0.99), 0.8,
         { direction: new mp.Vector3(90, 0, 0), rotation: new mp.Vector3(0, 0, 90), color: [SERVER_COLOR.R, SERVER_COLOR.G, SERVER_COLOR.B, 255], visible: true, dimension: 0 });
         equipMarker.name = 'duty';
         let equipCol = mp.colshapes.newRectangle(equPos.x, equPos.y, 1.5, 2, 0)
         equipCol.name = 'equip';

         let garageMarker = mp.markers.new(27, new mp.Vector3(garagePos.x, garagePos.y, garagePos.z - 0.99), 0.8,
         { direction: new mp.Vector3(90, 0, 0), rotation: new mp.Vector3(0, 0, 90), color: [SERVER_COLOR.R, SERVER_COLOR.G, SERVER_COLOR.B, 255], visible: true, dimension: 0 });
         let garageCol = mp.colshapes.newRectangle(garagePos.x, garagePos.y, 1.5, 2, 0)
         garageCol.name = 'garage';

         counter ++;
     });
     core.terminal(3, `${counter} Factions Loaded !`)
   },

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
         account.notification(player, MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4) 
         return false; 
      } 

      let isLeader = await this.isFactionLeader(player, player.faction);
      if (!isLeader) { player.outputChatBox('Niste lider ove fakcije.'); return false; }
      if (recipient.faction != 0) { player.outputChatBox('Korisnik je vec u fakciji.'); return false } 

      let faction = fac.getFaction(player.faction)
      recipient.inviteRequest = player.faction;
      recipient.outputChatBox(`${player.name} vam je poslao zahtev da se pridruzite ${faction.NAME} !`);
      player.outputChatBox(`Poslali ste ${recipient.name} zahtev za invite !`);
   },

   uninvite: async function (player, target) { 
      let recipient = account.findPlayer(target);
      if (!recipient) { 
         account.notification(player, MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4) 
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
      let faction = fac.getFaction(player.faction);
      if (faction.TYPE == type) { 
         return true;
      }
      else { 
         return false;
      }
   }
}