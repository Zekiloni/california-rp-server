
const player = mp.players.local;
let onlinePlayers = mp.players.length;
let playerHUD = mp.browsers.new('package://player/hud-interface/hud.html'), isDriving = false;

let screenshotBrowser = false;
let photoName = null;


mp.events.add({
	'client:hud.show': (show) => {
		if (show)  {
			playerHUD.execute(`hud.toggle = true;`); 
			setInterval(() => { updatePlayerHud(); }, 1000);
		}
		else { 
			playerHUD.execute(`hud.toggle = false;`); 
		}
	},

	'client:notification.show': (message, type, time) => {
		playerHUD.execute(`hud.notification(\"${message}\", \"${type}\", \"${time}\");`);
	}
})


updatePlayerHud = () => { 
	let street = mp.game.pathfind.getStreetNameAtCoord(player.position.x, player.position.y, player.position.z, 0, 0),
		zoneName = mp.game.gxt.get(mp.game.zone.getNameOfZone(player.position.x, player.position.y, player.position.z)),
		streetName = mp.game.ui.getStreetNameFromHashKey(street.streetName),
		heading = getPlayerHeading();
	playerHUD.execute(
		`hud.location.street = \"${streetName}\", hud.location.zone = \"${zoneName}\", 
		hud.location.heading = \"${heading}\", hud.money = \"${player.money}\",
		hud.onlinePlayers =  \"${onlinePlayers}\", hud.id = \"${player.remoteId}\";`
	); 
}

mp.keys.bind(0x77, true, function () {  //F8-Key
	var date = new Date();
	photoName = "focusrp-" + date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + "-" + date.getHours() + "." + date.getMinutes() + "." + date.getSeconds() + ".png";
	mp.gui.takeScreenshot(`${photoName}`, 1, 10, 0);
	mp.events.call("client:screenshot.taken");
});

getPlayerHeading = () => { 
	let heading = player.getHeading(), headingString;
	if (heading >= 0 && heading <= 30) { headingString = "N"; }
	else if (heading >= 30 && heading <= 90) { headingString = "NW"; }
	else if (heading >= 90 && heading <= 135) { headingString = "W"; }
	else if (heading >= 135 && heading <= 180) { headingString = "SW"; }
	else if (heading >= 180 && heading <= 225) { headingString = "S"; }
	else if (heading >= 225 && heading <= 270) { headingString = "SE"; }
	else if (heading >= 270 && heading <= 315) { headingString = "E" ; }
	else if (heading >= 315 && heading <= 360) { headingString = "NE"; }
	return headingString;
}

mp.events.add({
	'render': () => { // hiding default GTA Hud
		mp.game.ui.hideHudComponentThisFrame(7); // HUD_AREA_NAME
		mp.game.ui.hideHudComponentThisFrame(9); // HUD_STREET_NAME
		mp.game.ui.hideHudComponentThisFrame(6); // HUD_VEHICLE_NAME
		mp.game.ui.hideHudComponentThisFrame(2); // HUD_WEAPON_ICON
		mp.game.ui.hideHudComponentThisFrame(3); // HUD_CASH
		mp.game.ui.hideHudComponentThisFrame(4); // HUD_MP_CASH
		mp.game.ui.hideHudComponentThisFrame(14); // CROSSHAIR
		//mp.game.ui.hideHudComponentThisFrame(19); // HUD_WEAPON_WHEEL
		//mp.game.ui.hideHudComponentThisFrame(20); // HUD_WEAPON_WHEEL_STATS

	
		mp.game.invoke('0x9E4CFFF989258472');
		mp.game.invoke('0xF4F2C0D4EE209E20');

		// disable tab weapon wheel
		//mp.game.controls.disableControlAction(32, 37, true); // eanbeati


		// show Crosshair if player is aiming with AWP
		let playerWeapon = player.weapon;
		if (playerWeapon == '0x05FC3C11' || playerWeapon == '0x0C472FE2' || playerWeapon == '0xA914799' || playerWeapon == '0xC734385A' || playerWeapon == '0x6A6C02E0') {
			mp.game.ui.showHudComponentThisFrame(14);
		}

		// update veh speed if driver
		if (player.vehicle && isDriving) { vehicle() }
	},

	'client:hud.vehicle': (toggle) => { 
		playerHUD.execute(`hud.vehicle.driving = ${toggle};`); 
		isDriving = toggle;
	},

	'client:hud.black_screen': () => { 
		playerHUD.execute(`hud.black_screen = !hud.black_screen;`); 
	},

	'client:screenshot.taken': () => {
		screenshotBrowser = mp.browsers.new("package://player/hud-interface/screenshot.html");
	},

	'browserDomReady': (browser) => {
		if(browser != screenshotBrowser) return;
		screenshotBrowser.call("client:screenshot.receive", `http://screenshots/${photoName}`);
  },

  'client:screenshot.send.to.server': (base64) => {
		let street = mp.game.pathfind.getStreetNameAtCoord(player.position.x, player.position.y, player.position.z, 0, 0);
		let zoneName = mp.game.gxt.get(mp.game.zone.getNameOfZone(player.position.x, player.position.y, player.position.z));
		let streetName = mp.game.ui.getStreetNameFromHashKey(street.streetName);
		mp.events.callRemote('server:disord.screenshot.send', base64, zoneName, streetName);
		setTimeout(() => {
			screenshotBrowser.destroy();
			screenshotBrowser = false;
		}, 6500);
	}
})

vehicle = () => { 
	let vehicle = player.vehicle;
	let vehicleSpeed = vehicle.getSpeed();
	let lights = vehicle.getLightsState(1, 1);
	let lightsStatus = 0;
	vehicleSpeed = vehicleSpeed * 3.6;

	if (lights.lightsOn == 0 && lights.highbeamsOn == 0) { lightsStatus = 0; }
	else if (lights.lightsOn == 0 && lights.highbeamsOn == 1) { lightsStatus = 2; }
	else if (lights.lightsOn == 1 && lights.highbeamsOn == 0) { lightsStatus = 1; }
	else if (lights.lightsOn == 1 && lights.highbeamsOn == 1) { lightsStatus = 2; }

	playerHUD.execute(`hud.vehicle.speed = ${vehicleSpeed}, hud.vehicle.lights = ${lightsStatus};`); 
}

