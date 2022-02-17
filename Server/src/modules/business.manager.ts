import { businessConfig } from '@configs';
import { lang } from '@constants';
import { notifications } from '@enums';
import { business, characters, items, products, workers } from '@models';



mp.events.add(
   {
      'SERVER::BUSINESS:MENU': openBusinesMenu,
      'SERVER::BUSINESS:LOCK': lockBusines,
   }
);

mp.events.addProc(
   {
      'SERVER::BUSINES:PRODUCT_ADD': createBusinesProduct,
      'SERVER::BUSINESS:WORKER_ADD': createBusinesWorker,
   }
);


function openBusinesMenu (player: PlayerMp, bizId: number) {
   business.findOne( { where: { id: bizId }, include: [products] } ).then(biz => {
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


function createBusinesProduct (player: PlayerMp, businesID: number, productName: string, productPrice: number) {
   return business.findOne( { where: { id: businesID }, include: [products, workers] } ).then(async busines => {

      if (!items.list[productName]) {
         return;
      }

      const alreadyExist = await products.findOne( { where: { businesID: busines!.id, name: productName } } );

      if (alreadyExist) {
         player.notification(lang.productAlreadyExist, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      await products.create(
         { 
            name: productName,
            businesID: busines!.id,
            busines: busines!,
            price: productPrice
         }
      );

      player.notification(lang.product + productName + ' ' + lang.addedSuccesfully, notifications.type.SUCCESS, notifications.time.MED);

      return busines;
   });
}


function createBusinesWorker (player: PlayerMp, bizId: number, name: string, salary: number) {
   return business.findOne( { where: { id: bizId }, include: [products, workers] } ).then(async busines => {
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


function lockBusines (player: PlayerMp, bizId: number, locked: boolean) {
   business.findOne( { where: { id: bizId } } ).then(
      busines => {
         busines?.lock(player, locked);
   });
}


