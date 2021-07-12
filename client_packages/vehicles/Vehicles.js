
const Player = mp.players.local;
const blockedClasses = [13, 14, 15, 16, 21]; 

let DistanceNow = null;
let DistanceTemporary;

mp.game.controls.useDefaultVehicleEntering = true;


const Controls = {
   arrowLeft: 3,
   arrowRight: 3
};


mp.events.add({
   'entityStreamIn': (entity) => {
      if (entity.type === 'vehicle') {
         if (entity.hasVariable('IndicatorRight')) entity.setIndicatorLights(0, entity.getVariable('IndicatorRight'));
         if (entity.hasVariable('IndicatorLeft')) entity.setIndicatorLights(1, entity.getVariable('IndicatorLeft')); 
         if (entity.hasVariable('Windows')) Windows(entity, entity.getVariable('Windows'));
         if (entity.hasVariable('Fuel')) entity.Fuel = entity.getVariable('IndicatorLeft');
         if (entity.hasVariable('Mileage')) entity.Mileage = entity.getVariable('Mileage');
         if (entity.hasVariable('Hood')) Doors(entity, 'hood', entity.getVariable('Hood'));
         if (entity.hasVariable('Trunk')) Doors(entity, 'trunk', entity.getVariable('Trunk'));
         if (entity.hasVariable('Back')) Doors(entity, 'back', entity.getVariable('Back'));
         if (entity.hasVariable('Back2')) Doors(entity, 'back2', entity.getVariable('Back2'));
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

   'playerLeaveVehicle': (Vehicle, seat) => { 
      if (seat == -1) { 
         mp.events.remove('render', Driving);
         if (Vehicle) mp.events.callRemote('server:vehicle:update', Vehicle, Vehicle.Mileage, Vehicle.Fuel);
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

   'Trunk': (entity, value) => { 
      if (entity.type === 'vehicle') Doors(entity, 'trunk', value);
   },

   'Hood': (entity, value) => { 
      if (entity.type === 'vehicle') Doors(entity, 'hood', value);
   },

   'Back': (entity, value) => { 
      if (entity.type === 'vehicle') Doors(entity, 'back', value);
   },

   'Back2': (entity, value) => { 
      if (entity.type === 'vehicle') Doors(entity, 'back2', value);
   },

   'Fuel': (entity, value) => { 
      if (entity.type === 'vehicle') entity.Fuel = value;
   },

   'Mileage': (entity, value) => { 
      if (entity.type === 'vehicle') entity.Mileage = value;
   }
});


// Left Indicator
mp.keys.bind(Controls.arrowLeft, false, () => {
   if (!Player.logged) return;
   if (mp.players.local.isTypingInTextChat) return;
   let vehicle = mp.players.local.vehicle;
   if (vehicle && vehicle.getPedInSeat(-1) == mp.players.local.handle && blockedClasses.indexOf(vehicle.getClass()) == -1) mp.events.callRemote('server:vehicle:indicators', 1);
});


// Right Indicator
mp.keys.bind(Controls.arrowRight, false, () => {
   if (!Player.logged) return;
   if (mp.players.local.isTypingInTextChat) return;
   let vehicle = mp.players.local.vehicle;
   if (vehicle && vehicle.getPedInSeat(-1) == mp.players.local.handle && blockedClasses.indexOf(vehicle.getClass()) == -1) mp.events.callRemote('server:vehicle:indicators', 0);
});


let vOptions = false;

mp.keys.bind(0x59, false, () => {
   if (!Player.logged || mp.players.local.isTypingInTextChat) return false;
   vOptions = !vOptions;
   if (vOptions) { 
      mp.gui.chat.push('uso 1');
      mp.events.add('render', VehicleOptions);
   } else { 
      mp.gui.chat.push('uso 2');
      mp.events.remove('render', VehicleOptions);
   }
});


const Bones = [
   'windscreen', 'bonnet', 'boot'
];

const screenRes = mp.game.graphics.getScreenActiveResolution(100, 100);

function VehicleOptions () { 
   if (Player.vehicle) { 

      const Vehicle = Player.vehicle;

      for (const Bone of Bones) { 

         const BonePosition = Vehicle.getWorldPositionOfBone(Vehicle.getBoneIndexByName(Bone));
         const Position = mp.game.graphics.world3dToScreen2d(new mp.Vector3(BonePosition.x, BonePosition.y, BonePosition.z + 0.05));

         if (Position) {
            let x = Position.x;
            let y = Position.y;
      
            let scale = 0.6;
            
            y -= (scale * (0.005 * (screenRes.y / 1080))) - parseInt('0.010');
            
            mp.game.graphics.drawText(Bone, [x, y],
            {
               font: 4,
               color: [255, 255, 255, 255],
               scale: [0.325, 0.325],
               outline: true
            });
         }
      }

   }
};


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


function Doors (vehicle, index, value) { 
   let Number = 4;
   switch (index) {
      case 'hood': Number = 4; break;
      case 'trunk': Number = 5; break;
      case 'back': Number = 6; break;
      case 'back2': Number = 7; break;
   }
   value ? vehicle.setDoorOpen(Number, false, false) : vehicle.setDoorShut(Number, false);
};



const natives = { 
   MAX_PASSENGERS: '0x2AD93716F184EDA4',
   MAX_SPEED: '0xF417C2502FFFED43',
   MAX_BRAKING: '0xDC53FD41B4ED944C',
   MAX_TRACTION: '0x539DE94D44FDFD0D',
   MAX_ACCELERATION: '0x8C044C5C84505B6A',
   MANUFACTEUR: '0xF7AF4F159FF99F97',
};
