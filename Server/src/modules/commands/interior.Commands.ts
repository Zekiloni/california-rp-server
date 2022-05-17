import { Commands } from '../commands';
import { cmds } from '@constants';
import { getNearest } from '@shared';
import { Houses, Busines } from '@models';


Commands[cmds.names.ENTER] = {
   description: cmds.descriptions.ENTER,
   call (player: PlayerMp) {
      getNearest(player, 2).then(nearest => {
         if (!nearest) {
            return;
         }

         switch (true) { 
            case nearest instanceof Houses: {
               if (player.dist(nearest.position) > 2) {
                  return;
               }

               (<Houses>nearest).enter(player);
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
        case inside instanceof Houses: { 
           (<Houses>inside).exit(player);
           break;
        }
     }
   }
}