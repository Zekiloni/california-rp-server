

const Player = mp.players.local;
let browser = mp.browsers.new('package://player/game-interface/main.html');
let active = false, Timer = null;

global.GameInterface = browser;

mp.events.add({
   'client:player.interface:toggle': () => { 
      active = !active;
      browser.execute('hud.toggle = !hud.toggle;');
      if (active) 
         Timer = setInterval(Update, 1000);
      else
         if (Timer) clearInterval(Timer);
   },

   'client:player.interface:notification': Notify,

   'client:player.interface:black': () => { browser.execute('hud.black = !hud.black;'); },

   'render': () => { 
      HideDefault();

      if (Player.vehicle) Vehicle();

      if (Player.weapon != mp.game.joaat('weapon_unarmed')) { 
         let Weapon = utils.weaponString(Player.weapon);
         let ammoCount = getAmmoCount(playerWeapon);
         browser.execute('hud.weapon.hash = \"' + Weapon + '\", hud.weapon.ammo = ')
      } else if (Player.weapon == mp.game.joaat('weapon_unarmed')) { 
         browser.execute('hud.weapon.hash = null;')
      }
   },

   'playerEnterVehicle': (vehicle, seat) => { 
      if (seat == -1) {
         if (browser) browser.execute('hud.Vehicle(true);')
      }
   },

   'playerLeaveVehicle': (vehicle, seat) => { 
      if (seat == -1) {
         if (browser) browser.execute('hud.Vehicle(false);')
      }
   }
		
});


function Update () { 
   if (browser) { 
      browser.execute('hud.players = ' + mp.players.length + ', hud.money = ' + Player.Money + ', hud.id = ' + Player.remoteId + ';');
      LocationUpdate();
   }
}


function getGear (i) { 
   let vehicle = Player.vehicle;

   if (i == 0 && !vehicle.isStopped()) return 'R';
   else if (i == 0) return 'N';
   else return i;
}


function Vehicle () { 
   let vehicle = Player.vehicle;
   let Speed = vehicle.getSpeed() * 3.6;
   let Gear = getGear(vehicle.gear).toString();
   let Lights = vehicle.getLightsState(1, 1);
   let Indicators = [vehicle.getVariable('IndicatorLeft'), vehicle.getVariable('IndicatorRight')];
   let EngineFailure = vehicle.getEngineHealth() < 300 ? true : false;
   // Mileage, Fuel...

   browser.execute('hud.Fuel(' + (100 - Speed) + ')');
   browser.execute('hud.vehicle.gear = \"' + Gear + '\";');
   browser.execute('hud.vehicle.indicators = ' + JSON.stringify(Indicators));
   browser.execute('hud.vehicle.engine_failure = ' + EngineFailure);
   browser.execute('hud.vehicle.lights = ' + JSON.stringify(Lights));
   browser.execute('hud.seatbelt = ' + Player.getVariable('Seatbelt'));
}

function Notify (message, type, time = 3) { 
   if (browser) browser.execute('hud.Notification(\"' + message + '\", \"' + type + '\");')
}


function getHeading () { 
   let H = Player.getHeading(), Heading;
   switch (true) {
      case (H < 30): Heading = 'N'; break;
      case (H < 90): Heading = 'NW'; break;
      case (H < 135): Heading = 'W'; break;
      case (H < 180): Heading = 'SW'; break;
      case (H < 225): Heading = 'S'; break;
      case (H < 270): Heading = 'SE'; break;
      case (H < 315): Heading = 'E'; break;
      case (H < 360): Heading = 'NE'; break;
      default: Heading = 'N'; break;
   }
   return Heading;
}


function LocationUpdate () { 
   let path = mp.game.pathfind.getStreetNameAtCoord(Player.position.x, Player.position.y, Player.position.z, 0, 0);
   let Zone = mp.game.gxt.get(mp.game.zone.getNameOfZone(Player.position.x, Player.position.y, Player.position.z));
   let Street = mp.game.ui.getStreetNameFromHashKey(path.streetName);
   let Heading = getHeading();

   browser.execute('hud.location.street = \"' + Street + '\";');
   browser.execute('hud.location.zone = \"' + Zone + '\";');
   browser.execute('hud.location.heading = \"' + Heading + '\";');
}




function HideDefault () {
   mp.game.ui.hideHudComponentThisFrame(7); // HUD_AREA_NAME
   mp.game.ui.hideHudComponentThisFrame(9); // HUD_STREET_NAME
   mp.game.ui.hideHudComponentThisFrame(6); // HUD_VEHICLE_NAME
   mp.game.ui.hideHudComponentThisFrame(2); // HUD_WEAPON_ICON
   mp.game.ui.hideHudComponentThisFrame(3); // HUD_CASH
   mp.game.ui.hideHudComponentThisFrame(4); // HUD_MP_CASH
   mp.game.ui.hideHudComponentThisFrame(14); // CROSSHAIR
   mp.game.ui.hideHudComponentThisFrame(19); // HUD_WEAPON_WHEEL
   mp.game.ui.hideHudComponentThisFrame(20); // HUD_WEAPON_WHEEL_STATS

   mp.game.invoke('0x9E4CFFF989258472');
   mp.game.invoke('0xF4F2C0D4EE209E20');

   // disable tab weapon wheel
   mp.game.controls.disableControlAction(32, 37, true); 

   // show Crosshair if player is aiming with AWP
   let playerWeapon = Player.weapon;
   if (playerWeapon == '0x05FC3C11' || playerWeapon == '0x0C472FE2' || playerWeapon == '0xA914799' || playerWeapon == '0xC734385A' || playerWeapon == '0x6A6C02E0') {
      mp.game.ui.showHudComponentThisFrame(14);
   }
}
