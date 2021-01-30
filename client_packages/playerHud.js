
const player = mp.players.local;
var playerHUD;

mp.game.gameplay.setFadeOutAfterDeath(false);

mp.events.add('client:showPlayerHUD', (show) => {
	if(show)  {
		playerHUD = mp.browsers.new('package://hud-interface/index.html');
		setInterval(() => { updatePlayerHud() }, 1000);
	}
	else { 
		playerHUD.destroy()
	}
})

updatePlayerHud = () => { 
	let street = mp.game.pathfind.getStreetNameAtCoord(player.position.x, player.position.y, player.position.z, 0, 0);
	let zoneName = mp.game.gxt.get(mp.game.zone.getNameOfZone(player.position.x, player.position.y, player.position.z));
	let streetName = mp.game.ui.getStreetNameFromHashKey(street.streetName);
	let heading = getPlayerHeading();
	let money = player.cash;
	playerHUD.execute(`UpdateHud(\"${streetName}\", \"${zoneName}\", \"${heading}\", \"${money}\");`); 
}

getPlayerHeading = () => { 
	var heading = player.getHeading();
	var headingString;
	if (heading >= 0 && heading <= 30) { headingString = "N"; }
	else if (heading >= 30 && heading <= 90) { headingString = "NE"; }
	else if (heading >= 90 && heading <= 135) { headingString = "E"; }
	else if (heading >= 135 && heading <= 180) { headingString = "SE"; }
	else if (heading >= 180 && heading <= 225) { headingString = "S"; }
	else if (heading >= 225 && heading <= 270) { headingString = "SW"; }
	else if (heading >= 270 && heading <= 315) { headingString = "W"; }
	else if (heading >= 315 && heading <= 360) { headingString = "NW"; }
	return headingString;
}


mp.events.add('render', function() { // hiding default GTA Hud
	mp.game.ui.hideHudComponentThisFrame(7); // HUD_AREA_NAME
	mp.game.ui.hideHudComponentThisFrame(9); // HUD_STREET_NAME
	mp.game.ui.hideHudComponentThisFrame(6); // HUD_VEHICLE_NAME
	mp.game.ui.hideHudComponentThisFrame(2); // HUD_WEAPON_ICON
	mp.game.ui.hideHudComponentThisFrame(3); // HUD_CASH
	mp.game.ui.hideHudComponentThisFrame(4); // HUD_MP_CASH
	mp.game.ui.hideHudComponentThisFrame(14); // CROSSHAIR
 
  mp.game.invoke('0x9E4CFFF989258472');
  mp.game.invoke('0xF4F2C0D4EE209E20');

	// show Crosshair if player is aiming with AWP
	let playerWeapon = player.weapon;
	if(playerWeapon == '0x05FC3C11' || playerWeapon == '0x0C472FE2' || playerWeapon == '0xA914799' || playerWeapon == '0xC734385A' || playerWeapon == '0x6A6C02E0') {
		mp.game.ui.showHudComponentThisFrame(14);
	}
})
