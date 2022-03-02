import { BusinesConfig } from '@configs/business.Config';
import { cmds, lang } from '@constants';
import { notifications } from '@enums';
import { business } from "@models";
import { Commands } from '../commands';


Commands[cmds.names.BUSINES] = {
   description: cmds.descriptions.BUSINESS,
   async call (player: PlayerMp) {
      const nearest = await business.getNearest(player);

      if (!nearest || player.dist(nearest.position) > 2) {
         player.notification(lang.notNearBusiness, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      if (nearest.owner != player.character.id) {
         player.notification(lang.cannotManageThisBusiness, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      console.log(nearest.products)

      player.call('CLIENT::BUSINES:MANAGEMENT', [nearest, BusinesConfig.defaultProducts[nearest.type]]);
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