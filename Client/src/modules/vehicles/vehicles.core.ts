import { Browser } from '../../browser';
import { gameInterface, UI_Status } from "../game.UI";


const blockedClasses = [
   RageEnums.VehicleClasses.CYCLES, RageEnums.VehicleClasses.BOATS, 
   RageEnums.VehicleClasses.HELICOPTERS, RageEnums.VehicleClasses.PLANES,
   RageEnums.VehicleClasses.TRAINS
];



mp.events.add({
   'playerEnterVehicle': (vehicle: VehicleMp, seat: number) => { 
      if (seat != -1) return;
      if (vehicle && vehicle.getClass() == RageEnums.VehicleClasses.CYCLES) return;

      mp.game.vehicle.defaultEngineBehaviour = false;
      mp.players.local.setConfigFlag(429, true);

      gameInterface.vehicleInterface(true);
      
      const vehicleName = mp.game.ui.getLabelText(mp.game.vehicle.getDisplayNameFromVehicleModel(vehicle.model));
      Browser.call('BROWSER::GAME_UI:VEHICLE:NAME', vehicleName);

      mp.events.add('render', driving);
   },

   'playerLeaveVehicle': (vehicle: VehicleMp, seat: number) => {
      if (seat != -1) return;
      if (vehicle && vehicle.getClass() == RageEnums.VehicleClasses.CYCLES) return;

      gameInterface.vehicleInterface(false);
      mp.events.remove('render', driving);

   }
})


function driving () { 

   if (mp.players.local.vehicle && mp.players.local.vehicle.getPedInSeat(-1) === mp.players.local.handle) { 

      const vehicle = mp.players.local.vehicle;

      const speed = vehicle.getSpeed() * 3.6;

      if (gameInterface.status == UI_Status.VISIBLE) {
         Browser.call('BROWSER::GAME_UI:VEHICLE:UPDATE', Math.round(speed), Math.round(vehicle.rpm * 1000), vehicle.gear)
      } 
   }
}