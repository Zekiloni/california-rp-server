import { businessConfig } from '@configs/business.Config';
import { cmds, lang } from '@constants';
import { notifications } from '@enums';
import { business } from "@models";
import { Commands } from '../commands';


Commands[cmds.names.BUSINESS] = {
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

      player.call('CLIENT::BUSINES:MANAGEMENT', [nearest, businessConfig.defaultProducts[nearest.type]]);
   }
}


// Commands[cmds.names.HOUSE] = {


// }