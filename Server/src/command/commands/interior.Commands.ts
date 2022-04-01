import { Commands } from '../command';
import { cmds } from '@constants';
import { getNearest } from '@shared';
import { houses, Busines } from '@models';


Commands[cmds.names.ENTER] = {
   description: cmds.descriptions.ENTER,
   call (player: PlayerMp) {
      getNearest(player, 2).then(nearest => {
         if (!nearest) {
            return;
         }

         switch (true) { 
            case nearest instanceof houses: {
               if (player.dist(nearest.position) > 2) {
                  return;
               }

               (<houses>nearest).enter(player);
               break;
            }
         }

      });
   }
}

Commands[cmds.names.EXIT] = {
   description: cmds.descriptions.EXIT,
   call (player: PlayerMp) {
     if (!player.character.inside) {
        return;
     }

     const inside = player.character.inside;

     switch (true) {
        case inside instanceof houses: { 
           (<houses>inside).exit(player);
           break;
        }
     }
   }
}