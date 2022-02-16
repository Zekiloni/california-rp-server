import { businessConfig } from '@configs';
import { lang } from '@constants';
import { notifications } from '@enums';
import { business, characters } from '@models';



mp.events.add(
   {
      'SERVER::BUSINESS:MENU': openBusinessMenu,
      'SERVER::BUSINESS:LOCK': lockBusiness,
   }
);

mp.events.addProc(
   {
      'SERVER::BUSINESS:WORKER_ADD': addBusinesWorker,
      'SERVER::BUSINESS:GET_AVAILABLE_PRODUCTS': getAvailableProducts
   }
);


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


function addBusinesWorker (player: PlayerMp, bizId: number, name: string, salary: number) {
   return business.findOne( { where: { id: bizId } } ).then(async busines => {
      const target = mp.players.find(name);

      if (!target) {
         player.notification(lang.userNotFound, notifications.type.ERROR, notifications.time.MED);
         return false;
      }

      if (target.id == player.id) {
         // PORUKA: ne mozete sami sebe
         return;
      }


      
   })
}


function lockBusiness (player: PlayerMp, bizId: number, locked: boolean) {
   business.findOne( { where: { id: bizId } } ).then(busines => {
      busines?.lock(player, locked);
   });
}


function getAvailableProducts (player: PlayerMp, type: businessConfig.type) {
   console.log(businessConfig.defaultProducts[type])
   return businessConfig.defaultProducts[type];
}
