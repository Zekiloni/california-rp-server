import { cmds } from '@constants';
import { Busines, Houses } from '@models';
import { Commands } from '../commands';


Commands[cmds.names.BUY] = {
   description: cmds.descriptions.BUY,
   async call (player: PlayerMp, action?: string) {
      switch (action) {
         case cmds.actions.busines: {
            const nearest = await Busines.getNearest(player);

            if (!nearest) {
               return;
            }

            if (player.dist(nearest.position) > 2) {
               return;
            }

            nearest.buy(player);
            break;
         }

         case cmds.actions.house: {
            const nearest = await Houses.getNearest(player);

            if (!nearest) {
               return;
            }

            if (player.dist(nearest.position) > 2) {
               return;
            }

            nearest.buy(player);            
            break;
         }

         default: {
            const nearest = await Busines.getNearest(player);

            if (!nearest) {
               return;
            }

            if (player.dist(nearest.position) > 2) {
               return;
            }

            nearest.menu(player);
            break;
         }
      }

   }

}