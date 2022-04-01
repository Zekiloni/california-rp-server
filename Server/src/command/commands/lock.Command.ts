import { cmds } from '@constants';
import { Busines, houses } from '@models';
import { getNearest } from '@shared';
import { Commands } from '../command';


Commands[cmds.names.LOCK] = {
   description: cmds.descriptions.LOCK,
   async call (player: PlayerMp) {
      
      const nearest = await getNearest(player, 2.25);

      if (!nearest) {
         return;
      }
      
      switch (true) {

         case nearest instanceof Busines: {
            (<Busines>nearest).lock(player, !nearest.locked);
            break;
         }

         case nearest?.type == RageEnums.EntityType.VEHICLE: {
            const vehicle = <VehicleMp>nearest;
            console.log('lock command 0')

            if (!vehicle.instance) {
               return;
            }

            console.log('lock command 1')

            vehicle.instance.lock(vehicle, player);
            break;
         }

         case player.vehicle != null: { 
            player.vehicle.instance.lock(player.vehicle, player);
            break;
         }

         case nearest instanceof houses: {
            break;
         }

         case nearest?.type == 'vehicle': {
            console.log('vozilo')
            break;
         }
      }

   }

}