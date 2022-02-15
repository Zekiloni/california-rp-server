import { businessConfig } from '@configs';
import { lang } from '@constants';
import { notifications } from '@enums';
import { business } from '@models';



mp.events.add(
   {
      'SERVER::BUSINESS:MENU': openBusinessMenu
   }
);

mp.events.addProc(
   {
      'SERVER::BUSINESS:GET_AVAILABLE_PRODUCTS': getAvailableProducts
   }
)


function openBusinessMenu (player: PlayerMp, bizId: number) {
   business.findOne( { where: { id: bizId } } ).then(biz => {
      if (!biz) {
         return;
      }

      if (biz.locked) {
         player.notification(lang.thisBusinessIsLocked, notifications.type.ERROR, notifications.time.MED);
         return;
      } 

      switch (biz.type) {
         case businessConfig.type.MARKET || businessConfig.type.GAS_STATION: {
            player.call('CLIENT::MARKET:MENU', [biz]);
         }
      }

   })
}

function getAvailableProducts (type: string) {
  // return businessConfig.defaultProducts[type];
}