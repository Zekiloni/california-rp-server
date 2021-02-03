

mp.events.add({

   'server:policeGiveWeapon': (player, name, weapon, ammo) => {
      let weaponHash = mp.joaat(weapon);
      player.giveWeapon(weaponHash, parseInt(ammo) || 15);
      account.sendProxMessage(player, CHAT_RADIUS.ME, `* ${player.name} uzima ${name} iz ormarica.`, 'F9B7FF', 'E6A9EC', 'C38EC7', 'D2B9D3');
   },

   'server:policeSpawnVehicle': (player, name, model) => {
      let faction = factions.getFaction(player.faction);
      let vPos = faction.VEH_POINT;
      let vehPos = new mp.Vector3(vPos.x, vPos.y, vPos.z)
      let hash = mp.joaat(model);
      let numberPlate = Math.floor(1000 + Math.random() * 9000);
      let vehicle = mp.vehicles.new(hash, vehPos, { numberPlate: `LSPD ${numberPlate}`, heading: 90,color: [[255, 255, 246], [0, 255, 0]], locked: false, dimension: 0 });
      vehicle.faction = player.faction;
      vehicle.callsign = null;
   },

});