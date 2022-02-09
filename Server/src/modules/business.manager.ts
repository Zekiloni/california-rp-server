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

      console.log(biz)

      if (biz.locked) {
         player.sendNotification(lang.thisBusinessIsLocked, notifications.type.ERROR, notifications.time.MED);
         return;
      } 

      console.log('e')
   })
}