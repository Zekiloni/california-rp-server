

mp.events.add({
   'playerEnterColshape': (player, shape) => {
      if(player.faction == FACTION_POLICE) { 
         switch(shape.name) {
            case 'weapon':
               player.call('client:showPoliceWeaponary');
               break;
   
            case 'garage':
               player.call('client:showPoliceVehicles');
               break;
   
            default:
               return false;
          }
      }
   },

   'server:policeGiveWeapon': (player, name, weapon, ammo) => {
      let weaponHash = mp.joaat(weapon);
      player.giveWeapon(weaponHash, parseInt(ammo) || 15);
      account.sendProxMessage(player, CHAT_RADIUS.ME, `* ${player.name} uzima ${name} iz ormarica.`, 'F9B7FF', 'E6A9EC', 'C38EC7', 'D2B9D3');
   },

   'server:policeSpawnVehicle': (player, name, model) => {
      let faction = fac.getFaction(player.faction);
      let vPos = faction.VEH_POINT;
      let vehPos = new mp.Vector3(vPos.x, vPos.y, vPos.z)
      let hash = mp.joaat(model);
      let numberPlate = Math.floor(1000 + Math.random() * 9000);
      let vehicle = mp.vehicles.new(hash, vehPos, { numberPlate: `LSPD ${numberPlate}`, color: [[0, 255, 0],[0, 255, 0]], locked: false, dimension: 0 });
      vehicle.faction = player.faction;
   },

});