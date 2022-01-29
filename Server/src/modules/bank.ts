import { bankConfig } from '@configs';
import { gDimension, lang } from '@constants';

import { generateNumber } from '../utils';



(() => {

   for (const position of bankConfig.positions) {
      mp.blips.new(bankConfig.sprite, position, { dimension: gDimension, name: lang.BANK, color: 52, shortRange: true, scale: 0.85, drawDistance: 150 });

      const colshape = mp.colshapes.newSphere(position.x, position.y, position.z, 1.0, gDimension);

      colshape.onPlayerEnter = (player: PlayerMp) => {
         if (player.vehicle) {
            return;
         }

         if (player.character && player.character.wounded) {
            return;
         }

         player.call('CLIENT::BANKING:MENU', [true]);
         player.sendHint(Controls.KEY_E, Messages.TO_OPEN_BANK_MENU, 6);
      }

      colshape.onPlayerLeave = (player) => {
         player.call('CLIENT::BANKING:MENU', [false]);
      }

      mp.markers.new(
         Locations.Markers.BANK, 
         new mp.Vector3(position.x, position.y, position.z - 0.25), 
         1.05, 
         {
            color: markerColors.BANKS, 
            rotation: new mp.Vector3(0, 0, 0),
            visible: true,
            dimension: GlobalDimension
         }
      );
   }

});



mp.events.add(
   {
      'SERVER::BANKING:ATM': (player: PlayerMp) => {

      },

      'SERVER::BANKING:WITHDRAW': (player: PlayerMp, bank: number, amount: number) => {

      },

      'SERVER::BANKING:DEPOSIT': (player: PlayerMp, bank: number, amount: number) => {

      },
   }
);


mp.events.addProc(
   {
      'SERVER::BANKING:CREATE': async (player: PlayerMp): Promise<Items> => {
         // if (player.character.bank) {
         //    player.sendNotification('vec imate racun', notifications.type.ERROR, 7);
         //    return;
         // }
         console.log(1)

         // const hasCreditCard = await Items.hasItem(itemData.Entity.PLAYER, player.character.id, itemNames.CREDIT_CARD);

         // if (hasCreditCard) {
         //    // PORUKA: vec imate kreditnu karticu
         //    return;
         // }

         return new Promise(resolve => {
            Bank.create( { number: Math.floor(generateNumber(300, 666) * 859305).toString(), character_id: player.character.id, character: player.character } ).then(bank_Account => {
               Items.create( { name: itemNames.CREDIT_CARD, 
                  entity: itemData.Entity.PLAYER, 
                  owner: player.character.id, 
                  quantity: 1,
                  data: {
                     name: player.character.name,
                     bank: bank_Account.number,
                     pin: Math.floor(Math.random() * 1000),
                     expiring: Date.now() + (30 * 24 * 60 * 60 * 1000),
                  } 
               }).then(credit_Card => {
                  resolve(credit_Card);
               })
            });
         });

    
      }
   }
)


