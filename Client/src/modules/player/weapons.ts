



// don't remove weapon after run out of ammo
mp.game.weapon.unequipEmptyWeapons = false;
mp.players.local.setCanSwitchWeapon(false);


// disable weapon switch
for (let i = 157; i < 164; i++) {
   mp.game.controls.disableControlAction(0, i, true);
}

// disable weapon behaviour
mp.game.controls.disableControlAction(0, 12, true);
mp.game.controls.disableControlAction(0, 13, true);
mp.game.controls.disableControlAction(0, 14, true);
mp.game.controls.disableControlAction(0, 15, true);