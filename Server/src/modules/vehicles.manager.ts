import { temporaryVehicles, vehicles } from '@models';
import { shared_Data } from '@shared/shared.enums';

mp.events.add( 
   {
      'SERVER::VEHICLE:UPDATE': updateVehicleInfo,
      'playerExitVehicle': onPlayerExitVehicle,
   }
);


/**
* Handle player leave vehicle
* @function onPlayerExitVehicle
* @param {PlayerMp} player The player that is leaving the vehicle.
* @param {VehicleMp} vehicle The vehicle.
*/
function onPlayerExitVehicle (player: PlayerMp, vehicle: VehicleMp) {

   if (!vehicle) {
      return;
   }

   // # if engine runing keep it
   if (vehicle.engine) {
      vehicle.engine = true;
   }
}

/**
* Update Vehicle info
* @function updateVehicleInfo
* @param {PlayerMp} player The player that is leaving the vehicle.
* @param {number} vid The vehicle remoteId.
* @param {number} mileage The vehicle mileage.
* @param {number} fuel The vehicle fuel.
*/
function updateVehicleInfo (player: PlayerMp, vid: number, mileage: number, fuel: number) {
   
   const vehicle = mp.vehicles.at(vid);
   
   if (!vehicle) {
      return;
   }

   const temporaryVehicle = temporaryVehicles.objects.get(vehicle.id);

   if (temporaryVehicle) {
      
      vehicle.setVariable(shared_Data.MILEAGE, mileage);
      vehicle.setVariable(shared_Data.FUEL, fuel);

   } else { 
      // search in database
   }
};

