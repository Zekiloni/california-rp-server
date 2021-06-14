
const Player = mp.players.local;
const blockedClasses = [13, 14, 15, 16, 21]; 

let DistanceNow = null;
let DistanceTemporary;

mp.game.controls.useDefaultVehicleEntering = true;

const natives = { 
   MAX_PASSENGERS: '0x2AD93716F184EDA4',
   MAX_SPEED: '0xF417C2502FFFED43',
   MAX_BRAKING: '0xDC53FD41B4ED944C',
   MAX_TRACTION: '0x539DE94D44FDFD0D',
   MAX_ACCELERATION: '0x8C044C5C84505B6A',
   MANUFACTEUR: '0xF7AF4F159FF99F97',
}

mp.events.add({
   'entityStreamIn': (entity) => {
      if (entity.type === 'vehicle') {
         if (entity.hasVariable('IndicatorRight')) entity.setIndicatorLights(0, entity.getVariable('IndicatorRight'));
         if (entity.hasVariable('IndicatorLeft')) entity.setIndicatorLights(1, entity.getVariable('IndicatorLeft')); 
         if (entity.hasVariable('Windows')) Windows(entity, entity.getVariable('Windows'));
         if (entity.hasVariable('Fuel')) entity.Fuel = entity.getVariable('IndicatorLeft');
         if (entity.hasVariable('Mileage')) entity.Mileage = entity.getVariable('Mileage');
      }
   },

   'playerEnterVehicle': (vehicle, seat) => { 
      mp.game.vehicle.defaultEngineBehaviour = false;
      Player.setConfigFlag(429, true);

      if (vehicle.Fuel && seat == -1) { 
         DistanceNow = Date.now();
         DistanceTemporary = 0;
         mp.events.add('render', Driving);
      }
   },

   'playerLeaveVehicle': (vehicle, seat) => { 
      if (seat == -1) { 
         mp.events.remove('render', Driving);
         if (vehicle) mp.events.callRemote('server:vehicle:mileage', vehicle, vehicle.Mileage)
      }
   }
});

mp.events.addDataHandler({
   'IndicatorRight': (entity, value) => {
      if (entity.type === 'vehicle') entity.setIndicatorLights(0, (value == null) ? false : value);
   },

   'IndicatorLeft': (entity, value) => {
      if (entity.type === 'vehicle') entity.setIndicatorLights(1, (value == null) ? false : value);
   },

   'Windows': (entity, value) => { 
      if (entity.type === 'vehicle') Windows(entity, value);
   },

   'Fuel': (entity, value) => { 
      if (entity.type === 'vehicle') entity.Fuel = value;
   },

   'Mileage': (entity, value) => { 
      if (entity.type === 'vehicle') entity.Mileage = value;
   }
});



// left
mp.keys.bind(0x25, false, () => {
   if (!Player.logged) return false;
   if (mp.players.local.isTypingInTextChat) return false;
   let vehicle = mp.players.local.vehicle;
   if (vehicle && vehicle.getPedInSeat(-1) == mp.players.local.handle && blockedClasses.indexOf(vehicle.getClass()) == -1) mp.events.callRemote('server:vehicle:indicators', 1);
});

// right
mp.keys.bind(0x27, false, () => {
   if (!Player.logged) return false;
   if (mp.players.local.isTypingInTextChat) return false;
   let vehicle = mp.players.local.vehicle;
   if (vehicle && vehicle.getPedInSeat(-1) == mp.players.local.handle && blockedClasses.indexOf(vehicle.getClass()) == -1) mp.events.callRemote('server:vehicle:indicators', 0);
});



function Driving () { 
   if (Player.vehicle && Player.vehicle.getPedInSeat(-1) === Player.handle) { 
      let vehicle = Player.vehicle;
      let Speed = vehicle.getSpeed() * 3.6;

      if (Date.now() >= DistanceNow + 1 && Speed > 1) { 
         let Calculating = Speed * ((Date.now() - DistanceNow) / 1000);
         let Trip = parseFloat(Calculating / 3600);

         DistanceTemporary += Trip; 

         vehicle.Mileage += (DistanceTemporary / 1000);
         DistanceNow = Date.now();
      }   

      // Updating Vehicle.Mileage in GameInterface 
      GameInterface.execute('hud.Mileage(' + vehicle.Mileage.toFixed(3) + ')');
      GameInterface.execute('hud.Speed(' + Speed + ')');

   }
}


function Windows (vehicle, value) { 
   for (let i in value) { 
      let window = value[i];
      window ? vehicle.rollDownWindow(i) : vehicle.rollUpWindow(i);
   }
}

function Trunk (vehicle, value) { 
   value ? vehicle.setDoorOpen(5, false, false) : vehicle.setDoorShut(5, false);
}

function Hood (vehicle, value) { 
   value ? vehicle.setDoorOpen(4, false, false) : vehicle.setDoorShut(4, false);
}


