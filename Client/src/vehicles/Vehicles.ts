
const Player = mp.players.local;
const blockedClasses = [13, 14, 15, 16, 21]; 

let DistanceNow: number;
let DistanceTemporary: number;

mp.game.controls.useDefaultVehicleEntering = true;

// AUTO HELMET
Player.setConfigFlag(35, false);


mp.events.add({
   'entityStreamIn': (Entity: VehicleMp) => {
      if (Entity.type === 'vehicle') {
         if (Entity.hasVariable('IndicatorRight')) Entity.setIndicatorLights(0, Entity.getVariable('IndicatorRight'));
         if (Entity.hasVariable('IndicatorLeft')) Entity.setIndicatorLights(1, Entity.getVariable('IndicatorLeft')); 
         if (Entity.hasVariable('Windows')) Windows(Entity, Entity.getVariable('Windows'));
         if (Entity.hasVariable('Fuel')) Entity.Fuel = Entity.getVariable('IndicatorLeft');
         if (Entity.hasVariable('Mileage')) Entity.Mileage = Entity.getVariable('Mileage');
         if (Entity.hasVariable('Hood')) Doors(Entity, VehicleDoors.Hood, Entity.getVariable('Hood'));
         if (Entity.hasVariable('Trunk')) Doors(Entity, VehicleDoors.Trunk, Entity.getVariable('Trunk'));
         if (Entity.hasVariable('Back')) Doors(Entity, VehicleDoors.Back, Entity.getVariable('Back'));
         if (Entity.hasVariable('Back2')) Doors(Entity, VehicleDoors.Back2, Entity.getVariable('Back2'));
      }
   },

   'playerEnterVehicle': (Vehicle: VehicleMp, Seat: number) => { 
      mp.game.vehicle.defaultEngineBehaviour = false;
      Player.setConfigFlag(429, true);

      if (Vehicle.Fuel && Seat == -1) { 
         DistanceNow = Date.now();
         DistanceTemporary = 0;
         mp.events.add('render', Driving);
      }
   },

   'playerLeaveVehicle': (Vehicle: VehicleMp, Seat: number) => { 
      if (Seat == -1) { 
         mp.events.remove('render', Driving);
         if (Vehicle) mp.events.callRemote('server:vehicle:update', Vehicle, Vehicle.Mileage, Vehicle.Fuel);
      }
   }
});


mp.events.addDataHandler({
   'IndicatorRight': (Entity: EntityMp, Value: boolean) => {
      if (Entity.type === 'vehicle') (<VehicleMp>Entity)?.setIndicatorLights(0, (Value == null) ? false : Value);
   },

   'IndicatorLeft': (Entity: EntityMp, Value: boolean) => {
      if (Entity.type === 'vehicle') (<VehicleMp>Entity)?.setIndicatorLights(1, (Value == null) ? false : Value);
   },

   'Windows': (Entity: EntityMp, Value: boolean[]) => { 
      if (Entity.type === 'vehicle') Windows(<VehicleMp>Entity, Value);
   },

   'Trunk': (Entity: EntityMp, Value: boolean) => { 
      if (Entity.type === 'vehicle') Doors(<VehicleMp>Entity, VehicleDoors.Trunk, Value);
   },

   'Hood': (Entity: EntityMp, Value: boolean) => { 
      if (Entity.type === 'vehicle') Doors(<VehicleMp>Entity, VehicleDoors.Hood, Value);
   },

   'Back': (Entity: EntityMp, Value: boolean) => { 
      if (Entity.type === 'vehicle') Doors(<VehicleMp>Entity, VehicleDoors.Back, Value);
   },

   'Back2': (Entity: EntityMp, Value: boolean) => { 
      if (Entity.type === 'vehicle') Doors(<VehicleMp>Entity, VehicleDoors.Back2, Value);
   },

   'Fuel': (Entity: EntityMp, Value: number) => { 
      if (Entity.type === 'vehicle') (<VehicleMp>Entity).Fuel = Value;
   },

   'Mileage': (Entity: EntityMp, Value: number) => { 
      if (Entity.type === 'vehicle') (<VehicleMp>Entity).Mileage = Value;
   }
});


// Left Indicator
mp.keys.bind(Controls.LeftArrow, false, () => {
   if (!Player.Logged) return;
   if (mp.players.local.isTypingInTextChat) return;
   let vehicle = mp.players.local.vehicle;
   if (vehicle && vehicle.getPedInSeat(-1) == mp.players.local.handle && blockedClasses.indexOf(vehicle.getClass()) == -1) mp.events.callRemote('server:vehicle:indicators', 1);
});


// Right Indicator
mp.keys.bind(Controls.RightArrow, false, () => {
   if (!Player.Logged) return;
   if (mp.players.local.isTypingInTextChat) return;
   let vehicle = mp.players.local.vehicle;
   if (vehicle && vehicle.getPedInSeat(-1) == mp.players.local.handle && blockedClasses.indexOf(vehicle.getClass()) == -1) mp.events.callRemote('server:vehicle:indicators', 0);
});



function Driving () { 
   if (Player.vehicle && Player.vehicle.getPedInSeat(-1) === Player.handle) { 
      let vehicle = Player.vehicle;
      let Speed = vehicle.getSpeed() * 3.6;

      if (Date.now() >= DistanceNow + 1 && Speed > 1) { 
         let Calculating = Speed * ((Date.now() - DistanceNow) / 1000);
         let Trip = Calculating / 3600;

         DistanceTemporary += Trip; 

         vehicle.Mileage += (DistanceTemporary / 1000);
         DistanceNow = Date.now();
      }   

      // Updating Vehicle.Mileage in GameInterface 
      //GameInterface.execute('hud.Mileage(' + vehicle.Mileage.toFixed(3) + ')');
      //GameInterface.execute('hud.Speed(' + Speed + ')');

   }
}


// SYNCING WINDOWS // PROBABLY TROUBE
function Windows (Vehicle: VehicleMp, Value: boolean[]) { 
   const Doors = mp.game.invoke('0x92922A607497B14D', Vehicle.handle);
   for (let i = 0; i < Doors - 2; i ++) { 
      let Window = Value[i];
      Window ? Vehicle.rollDownWindow(i) : Vehicle.rollUpWindow(i);
   }
}


enum VehicleDoors {
   Hood, Trunk, Back, Back2
}

function Doors (Vehicle: VehicleMp, Index: number, Value: any) { 
   let Number = 4;
   switch (Index) {
      case VehicleDoors.Hood: Number = 4; break;
      case VehicleDoors.Trunk: Number = 5; break;
      case VehicleDoors.Back: Number = 6; break;
      case VehicleDoors.Back2: Number = 7; break;
   }
   Value ? Vehicle.setDoorOpen(Number, false, false) : Vehicle.setDoorShut(Number, false);
};



const natives = { 
   MAX_PASSENGERS: '0x2AD93716F184EDA4',
   MAX_SPEED: '0xF417C2502FFFED43',
   MAX_BRAKING: '0xDC53FD41B4ED944C',
   MAX_TRACTION: '0x539DE94D44FDFD0D',
   MAX_ACCELERATION: '0x8C044C5C84505B6A',
   MANUFACTEUR: '0xF7AF4F159FF99F97',
};
