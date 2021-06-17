


const FlaggedWords = ['Cit', 'Čit', 'Admin'],
      BlacklistedWeapons =   [mp.game.joaat("weapon_grenadelauncher_smoke"), mp.game.joaat("weapon_rayminigun"), mp.game.joaat("weapon_hominglauncher"),
                              mp.game.joaat("weapon_compactlauncher"), mp.game.joaat("weapon_railgun"), mp.game.joaat("weapon_minigun"),
                              mp.game.joaat("weapon_grenadelauncher_smoke"), mp.game.joaat("weapon_grenadelauncher"), mp.game.joaat("weapon_rpg"),
                              mp.game.joaat("weapon_raycarbine"), mp.game.joaat("weapon_raypistol")],
      Player = mp.players.local;


      

function UnAllowedWeapons () {
   for (const WeaponHash in BlacklistedWeapons) {
      if (Player.Weapon === WeaponHash) {
         mp.events.callRemote('server:ac.detected', 6, 'ban');
      }
   }
}

function FlyHack () {
   if (Player.isInAir()) {
      if (!Player.isInAnyHeli() && !Player.isInAnyPlane()) {
         mp.events.callRemote('server:ac.detected', 4, 'warn');
      }
   }
}

function SpeedHack () {
   if (Player.vehicle) {
      let Vehicle = Player.vehicle;
      let VehSpeed = Vehicle.getSpeed();
      let MaxSpeed = mp.game.vehicle.getVehicleModelMaxSpeed(Vehicle.hash);
      
      if (VehSpeed > MaxSpeed + 10) {
         mp.events.callRemote('server:ac.detected', 12, 'warn'); // 6 Warnova kick/ban
      }
   } 
   else {
      let PedSpeed = mp.game.invoke('0xD5037BA82E12416F', Player);
      mp.gui.chat.push('OnFoot speed' + PedSpeed);
   }
}

// Main timer
setInterval(() => {
   SpeedHack ();
   FlyHack ();
   AllowedWeapons ();
}, 1000);


// Chat filter
mp.events.add("playerChat", (text) => {
   for (const i of FlaggedWords) {
      if (text.toLowerCase().includes(i.toLowerCase())) {
         mp.events.callRemote('server:ac.chat', text);
      }
   }
});