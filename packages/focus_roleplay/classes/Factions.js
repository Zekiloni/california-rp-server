

const FactionTypes = {
   Law: 0, Fmd: 1, Gov: 2, News: 3, Gang: 4, Mafia: 5, Party: 6, Cartel: 7
}


mp.factions = [
   LSPD = { 
      id: 1, name: 'Los Santos Police Department', motd: 'To protect & Serve', type: FactionTypes.Law, sprite: 60,
      label: new mp.Vector3(434.080, -981.913, 30.7093), blip: new mp.Vector3(433.91, -981.98, 0),
      garage: new mp.Vector3(455.4101, -1017.4461, 27.6155), equip: new mp.Vector3(452.97064, -992.0955, 30.6896),
      armory: new mp.Vector3(452.0938415, -980.22052, 30.68961), vehicle: new mp.Vector3(439.02337, -1019.7479, 28.72946),
      
   }
];


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
   }

   init () { 
      let counter = 0;
      for (let faction of mp.factions) { 
         if (faction.label) { 
            mp.labels.new(faction.name + '~n~' + faction.motd, faction.label, { los: true, font: 0, drawDistance: 4} );
         }

         if (faction.blip) { 
            mp.blips.new(faction.sprite, faction.blip, {
               name: faction.name,
               color: 3,
               shortRange: true,
            })
         }

         if (faction.garage) { 
            faction.garage.marker = mp.markers.new(27, faction.garage, 0.85, {
               color: mp.settings.color.rgba, rotation: new mp.Vector3(0, 0, 90), visible: true, dimension: 0
            })
            faction.garage.colshape = mp.colshapes.newRectangle(faction.garage.x, faction.garage.y, 1.75, 2, 0);
            faction.garage.colshape.name = 'garage';
         }


         if (faction.equip) { 
            faction.equip.marker = mp.markers.new(27, faction.equip, 0.85, {
               color: mp.settings.color.rgba, rotation: new mp.Vector3(0, 0, 90), visible: true, dimension: 0
            })
            faction.equip.colshape = mp.colshapes.newRectangle(faction.equip.x, faction.equip.y, 1.5, 2, 0);
            faction.equip.colshape.name = 'equip';
         }

         if (faction.armory) { 
            faction.armory.marker = mp.markers.new(27, faction.armory, 0.85, {
               color: mp.settings.color.rgba, rotation: new mp.Vector3(0, 0, 90), visible: true, dimension: 0
            })
            faction.armory.colshape = mp.colshapes.newRectangle(faction.armory.x, faction.armory.y, 1.5, 2, 0);
            faction.armory.colshape.name = 'weapon';
         }

         counter ++;
      } 
      core.terminal(3, counter + ' Factions loaded')
   }
}

mp.fation = new Factions();
mp.fation.init();

