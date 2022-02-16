import { cmds } from '@constants/commands';
import { business } from '@models';
import { Commands } from '../commands';

Commands[cmds.names.BUY] = {
   description: cmds.descriptions.BUY,
   async call (player: PlayerMp, action?: string) {


      switch (action) {
         case cmds.actions.business: {
            console.log('biz')
            break;
         }

         case cmds.actions.house: {
            console.log('kuca')
            break;
         }

         default: {
            const nearest = await business.getNearest(player);

            if (!nearest) {
               return;
            }
            nearest.menu(player);
            break;
         }
      }

   }

}