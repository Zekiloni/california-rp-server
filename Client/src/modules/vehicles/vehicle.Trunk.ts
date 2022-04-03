import { VehicleDoors } from "./vehicles.Core";



/* Returns vehicleRemoteId and distance */
export function isNearTrunk (vehicleId: number): boolean {
   const { position } = mp.players.local;

   const vehicle = mp.vehicles.atRemoteId(vehicleId);

   const { x, y, z } = vehicle.getWorldPositionOfBone(
      vehicle.getBoneIndexByName('taillight_l')
   );

   return mp.game.system.vdist(x, y, z, position.x, position.y, position.z) < 1.2;
}


function trunkHandler (entity: EntityMp, opened: boolean, oldValue: boolean) {
   if (entity.type != RageEnums.EntityType.VEHICLE) 
      return;

   const vehicle = <VehicleMp>entity;

   if (opened) {
      vehicle.setDoorOpen(VehicleDoors.TRUNK, false, false);
   } else {
      vehicle.setDoorShut(VehicleDoors.TRUNK, false);
   }

};


mp.events.addDataHandler('TRUNK', trunkHandler);
mp.events.addProc('CLIENT::NEAR_VEHICLE_TRUNK', isNearTrunk);