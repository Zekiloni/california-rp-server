import { businessConfig } from '@configs/business.config';
import { lang } from '@constants';
import { notifications } from '@enums';
import { business } from '@models';



mp.events.add(
   {
      'SERVER::BUSINESS:MENU': openBusinessMenu
   }
);

function openBusinessMenu (player: PlayerMp, bizId: number) {
   business.findOne( { where: { id: bizId } } ).then(biz => {
      if (!biz) {
         return;
      }

      if (biz.locked) {
         player.sendNotification(lang.thisBusinessIsLocked, notifications.type.ERROR, notifications.time.MED);
         return;
      } 

      switch (biz.type) {
         case businessConfig.type.MARKET || businessConfig.type.GAS_STATION: {
            player.call('CLIENT::MARKET:MENU', [biz]);
         }
      }

   })
}