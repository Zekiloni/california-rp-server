


const FlaggedWords = ['Cit', 'Čit', 'Admin'],
      BlacklistedWeapons =   [mp.game.joaat("weapon_grenadelauncher_smoke"), mp.game.joaat("weapon_rayminigun"), mp.game.joaat("weapon_hominglauncher"),
                              mp.game.joaat("weapon_compactlauncher"), mp.game.joaat("weapon_railgun"), mp.game.joaat("weapon_minigun"),
                              mp.game.joaat("weapon_grenadelauncher_smoke"), mp.game.joaat("weapon_grenadelauncher"), mp.game.joaat("weapon_rpg"),
                              mp.game.joaat("weapon_raycarbine"), mp.game.joaat("weapon_raypistol")],
      Player = mp.players.local;

let AnticheatSafe = false,
    AnticheatSafeTimer = null,
    Positions = [],
    Waypoint = null;

// Main timer
setInterval(() => {
   //if (Player.admin) return;
   //if (!Player.spawned) { AnticheatSafe = true; } else { AnticheatSafe = false; }

   SpeedHack ();
   FlyHack ();
   UnAllowedWeapons ();
}, 1000);


/*
// Teleport hack timer
setInterval(() => {
   TeleportHack ();
}, 1000);


function TeleportHack() {
   Positions.push(Player.position);
   if (Positions.length === 2) {
      const Vector1 = Positions[0];
      const Vector2 = Positions[1];

      const Distance = utils.Distance(Vector1, Vector2);
      if (Player.vehicle) {
         if (Distance > 55) {
            Waypoint === null ? mp.events.callRemote('server:anti_cheat:detected', 16, 'warn') : mp.events.callRemote('server:anti_cheat:detected', 17, 'warn', 'WP');
         }
      } else if (!Player.vehicle) { 
         if (Distance > 7 && !Player.isFalling()) {
            Waypoint === null ? mp.events.callRemote('server:anti_cheat:detected', 15, 'warn') : mp.events.callRemote('server:anti_cheat:detected', 15, 'warn', 'WP');
         }
      } else if (Player.isInWater()) {
         if (Distance > 5) {
            Waypoint === null ? mp.events.callRemote('server:anti_cheat:detected', 17, 'warn') : mp.events.callRemote('server:anti_cheat:detected', 15, 'warn', 'WP');
         }
      }
      Positions = [];
   }
}
*/

function UnAllowedWeapons () {
   if (AnticheatSafe) return;
   for (const WeaponHash in BlacklistedWeapons) {
      if (Player.Weapon === WeaponHash) {
        // mp.events.callRemote('server:anti_cheat:detected', 6, 'ban');
      }
   }
}

function SubtractVector(v1, v2) {
   return {"x": v1.x - v2.x,"y": v1.y - v2.y,"z": v1.z - v2.z}
}

function FlyHack () {
   /*
   if (AnticheatSafe) return;
   if (Player.isInAir()) {
<<<<<<< HEAD
      if (!Player.isInAnyHeli() && !Player.isInAnyPlane() && !Player.isRagdoll() && !Player.isFalling() && !Player.isJumping()) {
        // mp.events.callRemote('server:anti_cheat:detected', 4, 'warn');
=======
      if (!Player.isInAnyHeli() && !Player.isInAnyPlane() && !Player.isRagdoll() && !Player.isFalling()) {
         mp.events.callRemote('server:anti_cheat:detected', 4, 'warn');
      } 
   }*/

   const GroundZ = mp.game.gameplay.getGroundZFor3dCoord(Player.position.x, Player.position.y, Player.position.z, parseFloat(0), false);
   if (Player.position.z > GroundZ + 5) {
      if (!Player.isInAnyHeli() && !Player.isInAnyPlane() && !Player.isRagdoll() && !Player.isFalling()) {
         mp.events.callRemote('server:anti_cheat:detected', 4, 'warn');
         mp.gui.chat.push(`Ground z: ${GroundZ}`);
>>>>>>> d65cdf95cc785f5f848a8b68b46248de6ca89aee
      }
   }
}

function IsOnFoot() {
   if(mp.players.local.isFalling() || mp.players.local.isRagdoll()) return false
   else if(!mp.players.local.vehicle) return true
}

function SpeedHack () {
   if (AnticheatSafe) return;
   if (Player.vehicle) {
      let Vehicle = Player.vehicle;
      let VehSpeed = Vehicle.getSpeed();
      let MaxSpeed = mp.game.vehicle.getVehicleModelMaxSpeed(Vehicle.model);
      
      if (VehSpeed > MaxSpeed + 10) {
        // mp.events.callRemote('server:ac.detected', 12, 'warn'); // 6 Warnova kick/ban
      }
   } 
   else {
      let PedSpeed = Player.getSpeed();
      if (PedSpeed > 6.2) {
        // mp.events.callRemote('server:ac.detected', 11, 'warn');
      }
   }
}

/*
mp.events.addDataHandler({
   'ac_safe': (entity, newValue, oldValue) => {
      if (entity.type === 'player') {
         if (newValue) {
            AnticheatSafe = true;
            if (AnticheatSafeTimer != null) {
               clearTimeout(AnticheatSafeTimer);
               AnticheatSafeTimer = setTimeout(() => {
                  AnticheatSafe = false;
               }, 1000);
            }
         }
      }
   }
});
*/
// Chat filter
mp.events.add({
   'playerChat': (text) => {
      for (const i of FlaggedWords) {
         if (text.toLowerCase().includes(i.toLowerCase())) {
           // mp.events.callRemote('server:ac.chat', text);
         }
      }
   },

   'playerCreateWaypoint': (position) => {
      if (Player.position === position) return;
      Waypoint = position;
   },

   'playerRemoveWaypoint': () => {
      if ( Waypoint != null )
         Waypoint = null;
   },

   'render': () => {
      
   },

   'playerWeaponShot': (targetPosition, targetEntity) => {
      
   }
});