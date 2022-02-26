import { Browser } from '../../browser';
import { entityType } from '../../enums/entity';
import { vehicleInterface, UI_Status, gameIStatus } from "../game.UI";



const blockedClasses = [
   RageEnums.VehicleClasses.CYCLES, RageEnums.VehicleClasses.BOATS, 
   RageEnums.VehicleClasses.HELICOPTERS, RageEnums.VehicleClasses.PLANES,
   RageEnums.VehicleClasses.TRAINS
];


let temporary = {
   calculateDistance: 0,
   fuel: 0,
   mileage: 0,
};


mp.events.add(
   {
      'playerEnterVehicle': playerEnterVehicle,
      'playerLeaveVehicle': playerLeaveVehicle,
   }
);


function playerEnterVehicle (vehicle: VehicleMp, seat: number) {
   if (seat != -1) {
      return;
   };

   if (vehicle && vehicle.getClass() == RageEnums.VehicleClasses.CYCLES) {
      return;
   };

   mp.game.vehicle.defaultEngineBehaviour = false;
   mp.players.local.setConfigFlag(429, true);
   
   temporary.fuel = vehicle.getVariable('FUEL');
   temporary.mileage = vehicle.getVariable('MILEAGE');
   temporary.calculateDistance = Date.now();

   vehicleInterface(true);
   
   const vehicleName = mp.game.ui.getLabelText(mp.game.vehicle.getDisplayNameFromVehicleModel(vehicle.model));
   Browser.call('BROWSER::GAME_UI:VEHICLE:NAME', vehicleName);

   mp.events.add('render', driving);
}


function playerLeaveVehicle (vehicle: VehicleMp, seat: number) {
   if (seat != -1) {
      return;
   };

   if (vehicle && vehicle.getClass() == RageEnums.VehicleClasses.CYCLES) {
      return;
   };
   
   temporary.calculateDistance = 0;
   
   if (vehicle) {
      mp.events.callRemote('SERVER::VEHICLE:UPDATE', vehicle.remoteId, temporary.mileage, temporary.fuel);
   }

   vehicleInterface(false);
   mp.events.remove('render', driving);
};


function driving () { 
   if (mp.players.local.vehicle && mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle) { 

      const vehicle = mp.players.local.vehicle;

      const speed = vehicle.getSpeed() * 3.6;

      if (Date.now() >= temporary.calculateDistance + 1 && speed > 1) { 
         const calulating = speed * ((Date.now() - temporary.calculateDistance) / 1000);
         const trip = calulating / 3600;

         temporary.mileage += trip; 

         temporary.calculateDistance = Date.now();
      }   

      if (gameIStatus == UI_Status.VISIBLE) {
         Browser.call('BROWSER::GAME_UI:VEHICLE:UPDATE', Math.round(speed), Math.round(vehicle.rpm * 1000), vehicle.gear, temporary.mileage.toFixed(2))
      } 

      if (vehicle.isUpsidedown()) {
         mp.game.controls.disableControlAction(0, 59, true);
      }
      
   }
}



// // Left Indicator
// // mp.keys.bind(Controls.LEFT_ARROW, false, () => {
// //    if (!Player.Logged) return;
// //    if (mp.players.local.isTypingInTextChat) return;
// //    let vehicle = mp.players.local.vehicle;
// //    if (vehicle && vehicle.getPedInSeat(-1) == mp.players.local.handle && blockedClasses.indexOf(vehicle.getClass()) == -1) mp.events.callRemote('server:vehicle:indicators', 1);
// // });


// // // Right Indicator
// // mp.keys.bind(Controls.RIGHT_ARROW, false, () => {
// //    if (!Player.Logged) return;
// //    if (mp.players.local.isTypingInTextChat) return;
// //    let vehicle = mp.players.local.vehicle;
// //    if (vehicle && vehicle.getPedInSeat(-1) == mp.players.local.handle && blockedClasses.indexOf(vehicle.getClass()) == -1) mp.events.callRemote('server:vehicle:indicators', 0);
// // });




const indicators = (entity: EntityMp, value?: boolean[], oldValue?: boolean[]) => {
   if (entity.type != entityType.VEHICLE) {
      return;
   }

   if (blockedClasses.indexOf((<VehicleMp>entity).getClass()) == -1) {
      return;
   }

   if (!value) {
      value = entity.getVariable('INDICATORS');
   }
   
   const [left, right] = value!;

   (<VehicleMp>entity)?.setIndicatorLights(0, right);
   (<VehicleMp>entity)?.setIndicatorLights(1, left);
}


mp.events.add(RageEnums.EventKey.ENTITY_STREAM_IN, indicators);
mp.events.addDataHandler('INDICATORS', indicators);