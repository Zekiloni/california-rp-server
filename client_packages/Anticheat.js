


const FlaggedWords       =   ['Cit', 'Čit', 'Admin'],
      BlacklistedWeapons = [mp.game.joaat("weapon_grenadelauncher_smoke"), mp.game.joaat("weapon_rayminigun"), mp.game.joaat("weapon_hominglauncher"),
                           mp.game.joaat("weapon_compactlauncher"), mp.game.joaat("weapon_railgun"), mp.game.joaat("weapon_minigun"),
                           mp.game.joaat("weapon_grenadelauncher_smoke"), mp.game.joaat("weapon_grenadelauncher"), mp.game.joaat("weapon_rpg"),
                           mp.game.joaat("weapon_raycarbine"), mp.game.joaat("weapon_raypistol")],
      Player             = mp.players.local,
      LastDamage         = 0;

let AnticheatSafe        = false,
    AnticheatSafeTimer   = null,
    Positions            = [],
    Waypoint             = null,
    CurrentWeapon        = null,
    CurrentAmmo          = 0,
    CurrentClipSize      = 0;
    


// Main timer
 setInterval(() => {
   
   Player.spawned ? AnticheatSafe = false : AnticheatSafe = true; 

   // Enabled checks for admins
   SpeedHack ();
   FlyHack ();
   UnAllowedWeapons ();
   Misc ();
   // Disable checks for admins
   //if (Player.admin) return;

 }, 1000);


/* Teleport hack timer
setInterval(() => {
   TeleportHack ();
}, 1000);*/




/*   
   0 : 'Health hack',
   1 : 'Armour hack',
   2 : 'Godmode',
   3 : 'Teleport hack',
   4 : 'Ammo hack',
   5 : 'Blacklisted weapon',
   6 : 'High ping',
   7 : 'Headshot Aim',
   8 : 'Aim',
   9 : 'No Reload',
   10 : 'Speed hack (OnFoot)',
   11 : 'Speed hack (Vehicle)',
   12 : 'Vehicle Repair',
   13 : 'Vehicle Mods',
   14 : 'Fly/Teleport Hack (OnFoot)',
   15 : 'Fly/Teleport Hack (Vehicle)',
   16 : 'Fly/Teleport Hack (Water)',
   17 : 'Fly/Teleport Hack (Waypoint)' */

/*
function TeleportHack() {
   Positions.push(Player.position);
   if (Positions.length === 2) {
      const Vector1 = Positions[0];
      const Vector2 = Positions[1];

      const Distance = utils.Distance(Vector1, Vector2);
      if (Player.vehicle) {
         if (Distance > 55) {
            Waypoint === null ? mp.events.callRemote('server:ac.dc', 16, 'warn') : mp.events.callRemote('server:ac.dc', 17, 'warn', 'WP');
         }
      } else if (!Player.vehicle) { 
         if (Distance > 7 && !Player.isFalling()) {
            Waypoint === null ? mp.events.callRemote('server:ac.dc', 15, 'warn') : mp.events.callRemote('server:ac.dc', 15, 'warn', 'WP');
         }
      } else if (Player.isInWater()) {
         if (Distance > 5) {
            Waypoint === null ? mp.events.callRemote('server:ac:.etected', 17, 'warn') : mp.events.callRemote('server:ac.dc', 15, 'warn', 'WP');
         }
      }
      Positions = [];
   }
}
*/

function NoReload () {
   if (AnticheatSafe) return;
   if (!Player.weapon) return;
}

function UnAllowedWeapons () {
   if (AnticheatSafe) return;
   for (const WeaponHash in BlacklistedWeapons) {
      if (Player.Weapon === WeaponHash) {
         mp.events.callRemote('server:ac.dc', 6, 'ban'); // Blacklisted weapons
      }
   }
}

function SubtractVector(v1, v2) {
   return {"x": v1.x - v2.x,"y": v1.y - v2.y,"z": v1.z - v2.z}
}

function FlyHack () {
   if (AnticheatSafe) return;

   const GroundZ = mp.game.gameplay.getGroundZFor3dCoord(Player.position.x, Player.position.y, Player.position.z, parseFloat(0), false);
   if (Player.position.z > GroundZ + 5) {
      if (!Player.isInAnyHeli() && !Player.isInAnyPlane() && !Player.isRagdoll() && !Player.isFalling()) {
         mp.events.callRemote('server:ac.dc', 14, 'warn'); // Flyhack
      }
   }
}

function IsOnFoot() { // Is Player Walking?
   if(Player.isFalling() || Player.isRagdoll()) return false
   else if(!Player.vehicle) return true
}

function SpeedHack () {
   if (AnticheatSafe) return;
   if (Player.vehicle) {
      const Vehicle = Player.vehicle;
      const VehSpeed = Vehicle.getSpeed();
      const MaxSpeed = mp.game.vehicle.getVehicleModelMaxSpeed(Vehicle.model);
      
      if (VehSpeed > MaxSpeed + 10) {
         mp.events.callRemote('server:ac.dc', 11, 'warn'); // Vehicle speed hack
      }
   } 
   else {
      const PedSpeed = Player.getSpeed();
      if (PedSpeed > 7.2) {
        mp.events.callRemote('server:ac.dc', 10, 'warn'); // On Foot Speedhack
      }
   }
}




// Dodati Player.frozen sharovanu varijablu zbog anti unfreeze cheate
function Misc () {
   if (AnticheatSafe) return;

   switch (Player.action)
   {
      case 'moving':
         // Anti unfreeze hack
         if (Player.action === 'moving') {
            if (Player.frozen) {
               if (Player.vehicle) {
                  Player.vehicle.freezePosition(true);
               }
               else { 
                  Player.freezePosition(true);
                  mp.events.callRemote('server:ac.dc', 19, 'warn');
               }
            }
         }
         break;
      case 'jumping':
         // Anti BH
         break;
   }
   

   
}


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


// Chat filter
mp.events.add({
   'playerChat': (text) => {
      for (const i of FlaggedWords) {
         if (text.toLowerCase().includes(i.toLowerCase())) {
           // mp.events.callRemote('server:ac.chat', text); Forbidden words
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

   'incomingDamage': (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {
      if (targetEntity.entity == 'player' && targetEntity.entity.remoteId == Player.remoteId) {
         LastHealth = targetEntity.getHealth();
         setTimeout(() => {
            const NewHealth = targetEntity.getHealth();
            if (NewHealth == (LastHealth - damage)) {
               // Radi
            }
         }, 250);
      }
   },

   'outgoingDamage': (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {
      if (targetEntity.entity == 'player') {
         if (targetEntity.getHealth() <= damage) { // Ukoliko će ovaj hit ubiti igrača
            return true;
         }
      }
   },

   'playerWeaponChange': (oldWeapon, newWeapon) => {
       CurrentWeapon = mp.game.invoke(`0x0A6DB4965674D243`, Player.handle); //GET_SELECTED_PED_WEAPON
       CurrentAmmo = CurrentWeapon.getWeaponAmmo;
       CurrentClipSize = mp.game.weapon.getWeaponClipSize(weaponHash);
   }
});