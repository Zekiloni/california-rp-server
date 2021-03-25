

const Types = {
   Law: 0, Fmd: 1, Gov: 2, News: 3, Gang: 4, Mafia: 5, Party: 6, Cartel: 7
}

mp.factions = [
    LSPD = { 
      id: 1, name: 'Los Santos Police Department', motd: 'To protect & Serve', type: Types.Law
   }
]

const factions = { 
   init () { 
      for (faction of mp.factions) { 
         // napraviti markere, blipove i labele
         //
      }
      core.terminal(3, mp.factions.length + ' Factions Loaded')
   }
}

factions.init()

class Factions { 
   constructor () { 
      mp.events.add({
         'server:faction.invite': (player, target) => { 

         },

         'server:faction.uninvite': (player, target) => { 
            
         },

         'server:faction.rank': (player, target, rank) => { 
            
         },

         'server:police.giveWeapon': (player, name, weapon, ammo) => {
            let weaponHash = mp.joaat(weapon);
            player.giveWeapon(weaponHash, parseInt(ammo) || 15);
            account.sendProxMessage(player, CHAT_RADIUS.ME, `* ${player.name} uzima ${name} iz ormarica.`, PURPLE_1, PURPLE_2, PURPLE_3, PURPLE_4, PURPLE_5);
         },

         'server:police.spawnVehicle': (player, name, model) => {
            let faction = factions.getFaction(player.faction);
            let vPos = faction.VEH_POINT;
            let vehPos = new mp.Vector3(vPos.x, vPos.y, vPos.z)
            let hash = mp.joaat(model);
            let numberPlate = Math.floor(1000 + Math.random() * 9000);
            let vehicle = mp.vehicles.new(hash, vehPos, { numberPlate: `LSPD ${numberPlate}`, heading: 90,color: [[255, 255, 246], [0, 255, 0]], locked: false, dimension: 0 });
            vehicle.faction = player.faction;
            vehicle.callsign = null;
         },
      })

      mp.commands.add({
         'invite': (player, fullText) => { 

         },

         'uninvite': (player, fullText) => { 

         },


      })
   }
}


