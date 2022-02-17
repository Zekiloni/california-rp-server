import { businessConfig } from '@configs';
import { lang, none } from '@constants';
import { ItemEnums, notifications } from '@enums';
import { CartItem } from '@interfaces';
import { business, inventories, items, products, workers } from '@models';



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
      'SERVER::MARKET:BUY': buyItemsMarket
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


function createBusinesWorker (player: PlayerMp, businesID: number, name: string, salary: number) {
   return business.findOne( { where: { id: businesID }, include: [products, workers] } ).then(async busines => {
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


function lockBusines (player: PlayerMp, businesID: number, locked: boolean) {
   business.findOne( { where: { id: businesID } } ).then(
      busines => {
         busines?.lock(player, locked);
   });
}



function buyItemsMarket (player: PlayerMp, businesID: number, cartItems: string) {
   const cart: CartItem[] = JSON.parse(cartItems);
   
   return business.findOne( { where: { id: businesID }, include: [products] } ).then(async busines => {
      let total: number = 0;
      
      const inventoryWeight: number = await inventories.itemsWeight(player);
      const cartWeight: number = cart.reduce((sum, item) => sum + (items.list[item.name].weight * item.quantity), 0)
      
      console.log('inv with cart ' + (inventoryWeight + cartWeight));

      if (inventoryWeight + cartWeight > player.character.max_inventory_weight) {
         player.notification(lang.noInventorySpaceForItems + '.', notifications.type.ERROR, notifications.time.MED);
         return;
      }

      busines?.products.forEach(product => {
         cart.forEach(async item => {
            if (item.name == product.name) {
               if (product.quantity == none) {
                  player.notification(lang.weAreSoryBut + lang.product.toLocaleLowerCase() + ' ' + product.name  + lang.productNotAvailable, notifications.type.ERROR, notifications.time.MED);
                  return; 
               }
               
               total += product.price * product.quantity;
               await product.decrement('quantity', { by: 1 } );
               return true;
            }
         })
      })
   })
}
