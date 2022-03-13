import { jobs } from '@models';



class taxiJob extends jobs {
   
   constructor (id: number, name: string, description: string, position: Vector3Mp, sprite?: number, spriteColor?: number) {
      super (id, name, description, position, sprite, spriteColor)

      
   }

   fare (player: PlayerMp, fare: number) {
      if (!player.character.working) {
         return;
      }
      

   }

   start (player: PlayerMp, rendVehicle: boolean) {

   }
   

   stop (player: PlayerMp) {

   }

   enter (player: PlayerMp, vehicle: VehicleMp, seat: number) {
      
   }

   exit (player: PlayerMp, vehicle: VehicleMp, seat: number) {
      
   }
}

export const taxi = new taxiJob(3, '', '', new mp.Vector3(0, 0, 0), 0, 0);

mp.events.add(RageEnums.EventKey.PLAYER_ENTER_VEHICLE, taxi.enter);
mp.events.add(RageEnums.EventKey.PLAYER_EXIT_VEHICLE, taxi.exit);
