import { cmds, lang } from '@constants';
import { notifications } from '@enums';
import { Busines } from "@models";
import { Commands } from '../commands';


Commands[cmds.names.BUSINES] = {
   description: cmds.descriptions.BUSINESS,
   async call (player: PlayerMp) {
      Busines.getNearest(player).then(nearestBusines => { 
         if (!nearestBusines || player.dist(nearestBusines.position) > 2) {
            player.notification(lang.notNearBusiness, notifications.type.ERROR, notifications.time.MED);
            return;
         }

         if (nearestBusines.owner != player.character.id) {
            player.notification(lang.cannotManageThisBusiness, notifications.type.ERROR, notifications.time.MED);
            return;
         }
   
         player.call('CLIENT::BUSINES_MANAGEMENT', [nearestBusines]);
      });
   }
}


Commands[cmds.names.BUILDER] = {
   description: cmds.names.BUILDER,
   call (player: PlayerMp) {
      if (!player.character.inside) {
         return;
      }

      if (player.character.inside.owner != player.character.id) {
         return;
      }

      player.call('CLIENT::BUILDER:MENU_TOGGLE');
   }

}