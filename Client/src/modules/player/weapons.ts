

mp.players.local.setCanSwitchWeapon(false);

mp.events.add(
   {
      'playerWeaponShot': onPlayerWeaponShot,
      'render': disableDefaultWeaponBehaviour
   }
)


function onPlayerWeaponShot (position: Vector3Mp, entity: any) {
   
   //@ts-ignore
   mp.game1.weapon.unequipEmptyWeapons = false;

   const { weapon } = mp.players.local;

   // do not keep aiming
   if (mp.players.local.getAmmoInClip(weapon) == 0) { 
      mp.players.local.clearTasks();
   }

   // call server-side ammo
   mp.events.callRemote('CLIENT::ITEM:WEAPON:SHOT');
};


function disableDefaultWeaponBehaviour () {
   // disable weapon switch
   for (let i = 157; i < 164; i++) {
      mp.game.controls.disableControlAction(0, i, true);
   }

   // disable weapon behaviour
   mp.game.controls.disableControlAction(0, 12, true);
   mp.game.controls.disableControlAction(0, 13, true);
   mp.game.controls.disableControlAction(0, 14, true);
   mp.game.controls.disableControlAction(0, 15, true);
}

