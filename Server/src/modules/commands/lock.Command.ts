import { cmds } from '@constants';
import { Busines, houses } from '@models';
import { getNearest } from '@shared';
import { Commands } from '../commands';


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

            if (!vehicle.instance) {
               return;
            }

            vehicle.instance.lock(vehicle, player);
            break;
         }

         case player.vehicle != null: { 
            player.vehicle.instance.lock(player.vehicle, player);
            break;
         }

         case nearest instanceof houses: {
            (<houses>nearest).lock(player);
            break;
         }

         case nearest?.type == 'vehicle': {
            console.log('vozilo')
            break;
         }
      }

   }

}