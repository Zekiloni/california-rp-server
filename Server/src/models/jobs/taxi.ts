import { JobConfig } from '@configs';
import { Jobs } from '@models';


enum TaxiCallStatus {
   NONE, ACCEPTED
}

interface TaxiCall {
   caller: string
   phone: number
   status: TaxiCallStatus
   position: Vector3Mp
}


class TaxiJob extends Jobs {
   
   calls: TaxiCall[] = [];

   constructor (id: number, name: string, description: string, position: Vector3Mp, sprite?: number, spriteColor?: number) {
      super (id, name, description, position, sprite, spriteColor);
   }

   menu (player: PlayerMp) {
      player.call('CLIENT::TAXI:MENU', [player.character.working, this.activeWorkers.length, this.calls]);
   }

   start (player: PlayerMp, rendVehicle: boolean) {
      if (player.character.working) {
         return;
      }

      console.log('start')
      return true;
   }


   stop (player: PlayerMp) {
      if (!player.vehicle) {
         return;
      }
      
      const rentedVehicle = mp.vehicles.toArray().find(vehicle => vehicle.instance.rent && vehicle.instance.job && vehicle.instance.job.id == this.id);

      if (rentedVehicle && rentedVehicle.id != player.vehicle.id) {
         return;
      }
      
      player.character.working = false;
      return true;
   }


   enter (player: PlayerMp, vehicle: VehicleMp, seat: number) {
      
   }

   exit (player: PlayerMp, vehicle: VehicleMp, seat: number) {
      
   }
}

export const taxi = new TaxiJob(
   JobConfig.job.TAXI,
   JobConfig.names.TAXI,
   JobConfig.descriptions.TAXI,
   JobConfig.positions.TAXI,
   JobConfig.sprites.TAXI,
   JobConfig.colors.TAXI
);

mp.events.add(RageEnums.EventKey.PLAYER_ENTER_VEHICLE, taxi.enter);
mp.events.add(RageEnums.EventKey.PLAYER_EXIT_VEHICLE, taxi.exit);
mp.events.addProc('SERVER::TAXI:STOP', taxi.stop);
mp.events.addProc('SERVER::TAXI:START', taxi.start);
