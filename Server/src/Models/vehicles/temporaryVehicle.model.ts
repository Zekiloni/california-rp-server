import { factionConfig } from '@configs';
import { shared_Data, sleep } from '@shared';


export class temporaryVehicle {

   static objects = new Map<number, temporaryVehicle>();

   id: number;
   model: string;
   spawnPosition: Vector3Mp;
   spawnRotation: Vector3Mp;
   spawnDimension: number;
   object: VehicleMp;
   job?: number;
   faction?: { type?: factionConfig.type, id?: number };
   admin?: boolean;
   responsible?: number;

   constructor (model: string, position: Vector3Mp, heading: number, color: [RGB, RGB], numberPlate: string, dimension: number, locked: boolean, engine: boolean) {
      const vehicle = mp.vehicles.new(mp.joaat(model), position, {
            heading: heading,
            numberPlate: numberPlate,
            locked: locked,
            alpha: 255,
            engine: engine,
            color: color,
            dimension: dimension
         }
      );

      vehicle.setVariable(shared_Data.MILEAGE, 0.0);
      
      // if class != bicycle
      vehicle.setVariable(shared_Data.FUEL, 25);

      // if class != bicycle, etc.
      vehicle.setVariable(shared_Data.INDICATORS, [false, false]);
      vehicle.setVariable(shared_Data.TRUNK, false);
      vehicle.setVariable(shared_Data.HOOD, false);

      this.model = model;
      this.id = vehicle.id;
      this.spawnPosition = position;
      this.spawnDimension = vehicle.dimension;
      this.spawnRotation = vehicle.rotation;
      this.object = vehicle;

      temporaryVehicle.objects.set(vehicle.id, this);
   }


   respawn () {
      if (!this.object) {
         return;
      }
      
      this.object.position = this.spawnPosition;
      this.object.dimension = this.spawnDimension;
      this.object.rotation = this.spawnRotation;
      this.object.locked = true;
      this.object.engine = false;
   }


   static create (model: string, position: Vector3Mp, heading: number, color: [RGB, RGB], numberPlate: string, dimension: number, locked?: boolean, engine?: boolean) {
      const vehicle = new temporaryVehicle(model, position, heading, color, numberPlate, dimension, locked ? locked : false, engine ? engine : false);
      return vehicle;
   };


   static destroy (vehicle: VehicleMp) {
      const temporary = temporaryVehicle.objects.get(vehicle.id);

      if (!temporary) {
         return;
      }
      
      vehicle.getOccupants().forEach(player => {
         player.removeFromVehicle()
      });

      sleep(1).then(() => { 
         vehicle.destroy();
      });
      
      temporaryVehicle.objects.delete(temporary.id);
   }
}