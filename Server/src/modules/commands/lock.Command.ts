import { cmds } from '@constants';
import { houses } from '@models';
import { getNearest } from '@shared';
import { Commands } from '../commands';


Commands[cmds.names.LOCK] = {
   description: cmds.descriptions.LOCK,
   async call (player: PlayerMp) {
      
      const nearest = await getNearest(player, 2.25);
      
      console.log(nearest);


      switch (true) {
         case nearest instanceof houses: {
            console.log('kuca')
            break;
         }

         case nearest?.type == 'vehicle': {
            console.log('vozilo')
            break;
         }
      }

   }

}