


const FlaggedWords = ['Cit', 'Čit', 'Admin'],
      BlacklistedWeapons =   [mp.game.joaat("weapon_grenadelauncher_smoke"), mp.game.joaat("weapon_rayminigun"), mp.game.joaat("weapon_hominglauncher"),
                              mp.game.joaat("weapon_compactlauncher"), mp.game.joaat("weapon_railgun"), mp.game.joaat("weapon_minigun"),
                              mp.game.joaat("weapon_grenadelauncher_smoke"), mp.game.joaat("weapon_grenadelauncher"), mp.game.joaat("weapon_rpg"),
                              mp.game.joaat("weapon_raycarbine"), mp.game.joaat("weapon_raypistol")],
      Player = mp.players.local;


      

function UnAllowedWeapons () {
   for (const WeaponHash in BlacklistedWeapons) {
      if (Player.Weapon === WeaponHash) {
         mp.events.callRemote('server:anti_cheat:detected', 6, 'ban');
      }
   }
}

function FlyHack () {
   if (Player.isInAir()) {
      if (!Player.isInAnyHeli() && !Player.isInAnyPlane()) {
         mp.events.callRemote('server:anti_cheat:detected', 4, 'warn');
      }
   }
}

function SpeedHack () {
   if (Player.vehicle) {
      let Vehicle = Player.vehicle;
      let CurrSpeed = Vehicle.getSpeed();
      let MaxSpeed = mp.game.vehicle.getVehicleModelMaxSpeed(Vehicle.model);
      
      if (CurrSpeed > MaxSpeed + 10) {
         mp.events.callRemote('server:anti_cheat:detected', 12, 'warn'); // 6 Warnova kick/ban
      }
   } else {

   }
}

// Main timer
setInterval(() => {
   SpeedHack ();
   FlyHack ();
   UnAllowedWeapons ();
}, 1000);


// Chat filter
mp.events.add("playerChat", (text) => {
   for (const i of FlaggedWords) {
      if (text.toLowerCase().includes(i.toLowerCase())) {
         mp.events.callRemote('server:ac.chat', text);
      }
   }
});