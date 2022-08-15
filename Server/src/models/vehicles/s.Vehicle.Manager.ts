import { shared_Data } from "@shared/shared.enums";
import { Vehicles } from "./s.Vehicle";


/**
 * Vehicle Service controlling vehicle events and fuinctions.
 * Zekiloni
 * @export
 * @class VehicleManager
 * @extends {Vehicles}
 */
export class VehicleManager extends Vehicles {

   static playerStartEnterVehicle (player: PlayerMp, vehicle: VehicleMp, seat: number) {
      
   }

   static playerEnterVehicle (player: PlayerMp, vehicle: VehicleMp, seat: number) {

   }

   static playerStartExitVehicle (player: PlayerMp) {

   }


   /**
    * Event called when player starts to exit vehicle.
    * Even vehicle.engine == true we need to set it again to true, so it keeps running.
    * Also fro the siren.
    * Zekiloni
    * @static
    * @param {PlayerMp} player
    * @param {VehicleMp} vehicle
    * @return {*} 
    * @memberof VehicleManager
    */
   static playerExitVehicle (player: PlayerMp, vehicle: VehicleMp) {
      if (!vehicle) {
         return;
      }

      if (vehicle.engine == true) {
         vehicle.engine = true;
      }

      if (vehicle.siren == true) {
         vehicle.siren = true;
      }
   }
   

   static playerTurnIndicator (player: PlayerMp, indicator: number) {
      if (!player.vehicle) {
         return;
      }

      let indicators = player.vehicle.getVariable(shared_Data.INDICATORS);

      indicators[indicator] = !indicators[indicator];
      player.vehicle.setVariable(shared_Data.INDICATORS, indicators);
   }


   /**
    * Player shut window down or pull it up in vehicle on the seat where he seats.
    * Zekiloni
    * @static
    * @param {PlayerMp} player
    * @return {*} 
    * @memberof VehicleManager
    */
   static playerShutWindow (player: PlayerMp) {
      if (!player.vehicle) {
         return;
      }

      let windows = player.vehicle.getVariable(shared_Data.WINDOWS);
      windows[player.seat] = !windows[player.seat];

      player.vehicle.setVariable(shared_Data.WINDOWS, windows);
   }

   static trailerAttached (vehicle: VehicleMp, trailerVehicle: VehicleMp) {
      // do what u want :)
   }
   

   static getVehicleTrunk (player: PlayerMp, vehicleId: number) {
      const vehicle = mp.vehicles.toArray().find(veh => veh.id == vehicleId);

      if (!vehicle || !vehicle.instance) {
         return null;
      }

      return vehicle.instance.items;
   }
   

   static setVehicleDefaultData (vehicle: VehicleMp) {
      vehicle.setVariables({
         engine: true,
         fuel: 25.00,
         windows: [false, false, false, false]
      })
   }
}

/**   
 * Events
 */
mp.events.add({
   'playerStartEnterVehicle': VehicleManager.playerStartEnterVehicle,
   'playerEnterVehicle': VehicleManager.playerEnterVehicle,
   'playerStartExitVehicle': VehicleManager.playerStartExitVehicle,
   'playerExitVehicle': VehicleManager.playerExitVehicle,
   'getVehicleTrunk': VehicleManager.getVehicleTrunk,
   'playerTurnIndicator': VehicleManager.playerTurnIndicator,
   'playerShutWindow': VehicleManager.playerShutWindow
});

