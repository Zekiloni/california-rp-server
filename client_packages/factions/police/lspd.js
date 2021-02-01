
const player =  mp.players.local;
var vehiclesCEF, weaponCEF, equipCEF;

mp.events.add({
   'client:showPoliceVehicles': () => {
      vehiclesCEF = mp.browsers.new('package://factions/police/police-interfaces/vehicles.html');
      setTimeout(() => { mp.gui.cursor.show(true, true); }, 500);
   },

   'client:hidePoliceVehicles': () => {
      vehiclesCEF.destroy();
      setTimeout(() => { mp.gui.cursor.show(false, false); }, 500);
   },

   'client:spawnPoliceVehicle': (name, model) => {
      mp.events.callRemote('server:policeSpawnVehicle', name, model);
   },

   'client:showPoliceWeaponary': () => {
      weaponCEF = mp.browsers.new('package://factions/police/police-interfaces/weapons.html');
      setTimeout(() => { mp.gui.cursor.show(true, true); }, 500);
   },

   'client:hidePoliceWeaponary': () => {
      weaponCEF.destroy();
      setTimeout(() => { mp.gui.cursor.show(false, false); }, 500);
   },

   'client:policeGiveWeapon': (name, weapon, ammo) => {
      mp.events.callRemote('server:policeGiveWeapon', name, weapon, ammo);
   },

   'client:showPoliceEquipment': () => {
      equipCEF = mp.browsers.new('package://factions/police/police-interfaces/equipment.html');
      setTimeout(() => { mp.gui.cursor.show(true, true); }, 500);
   },

   'client:hidePoliceEquipment': () => {
      equipCEF.destroy();
      setTimeout(() => { mp.gui.cursor.show(false, false); }, 500);
   },

   'client:policeDragPlayer': (target, toggle) => { 
      if (toggle) {
         if (target && mp.players.exists(target))
            player.taskFollowToOffsetOf(target.handle, 0, -1, 0, 1.0, -1, 1.0, true)
      }
      else
         player.clearTasks();
   },

   'client:playerCuff': () => {
      player.setEnableHandcuffs(true);
   },

   'client:playerUncuff': () => {
      player.setEnableHandcuffs(false);
   },

})

