import { cmds } from '@constants';
import { business, houses } from '@models';
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

         case nearest instanceof business: {
            (<business>nearest).lock(player, !nearest.locked);
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