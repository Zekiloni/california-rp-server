
const db = require('../core/database')
let factionsConst = require('./factionsConst')
let factionsEvents = require('./factionsEvents')
let factionCmds = require('./factionCmds')

module.exports = { 

   initFactions: function () {
      let counter = 0;
      FACTIONS.forEach(function (f) {
         let label = mp.labels.new(`${f.NAME}~n~${f.DESC}`, new mp.Vector3(f.LABEL_POINT_X, f.LABEL_POINT_Y, f.LABEL_POINT_Z), { los: true, font: 0, drawDistance: 4});
         let blip = mp.blips.new(f.BLIP, new mp.Vector3(f.BLIP_POINT_X, f.BLIP_POINT_Y, f.BLIP_POINT_Z ), { name: f.NAME, color: 4, shortRange: true, });
         
         let weaponMarker = mp.markers.new(27, new mp.Vector3(f.WEAPON_POINT_X, f.WEAPON_POINT_Y, f.WEAPON_POINT_Z - 0.99), 0.8,
         { direction: new mp.Vector3(90, 0, 0), rotation: new mp.Vector3(0, 0, 90), color: [f.COLOR_R, f.COLOR_G, f.COLOR_B, 255], visible: true, dimension: 0 });
         let weaponCol = mp.colshapes.newRectangle(f.WEAPON_POINT_X, f.WEAPON_POINT_Y, 1.5, 2, 0)
         weaponCol.name = 'weapon';

         let equipMarker = mp.markers.new(27, new mp.Vector3(f.EQUIP_POINT_X, f.EQUIP_POINT_Y, f.EQUIP_POINT_Z - 0.99), 0.8,
         { direction: new mp.Vector3(90, 0, 0), rotation: new mp.Vector3(0, 0, 90), color: [f.COLOR_R, f.COLOR_G, f.COLOR_B, 255], visible: true, dimension: 0 });
         equipMarker.name = 'duty';

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
         player.outputChatBox('Korisnik nije pronadjen'); 
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
         player.outputChatBox('Korisnik nije pronadjen.'); 
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