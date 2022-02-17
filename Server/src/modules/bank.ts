
import { bankConfig } from '@configs';
import { gDimension, lang, itemNames } from '@constants';
import { banks, inventories, items } from '@models';
import { controls, generateNumber } from '@shared';
import { ItemEnums } from '@enums';



(() => {

   for (const position of bankConfig.positions) {
      mp.blips.new(bankConfig.sprite, position, { dimension: gDimension, name: lang.bank, color: 52, shortRange: true, scale: 0.85, drawDistance: 150 });

      const colshape = mp.colshapes.newSphere(position.x, position.y, position.z, 1.0, gDimension);

      colshape.onPlayerEnter = (player: PlayerMp) => {
         if (player.vehicle) {
            return;
         }

         if (player.character && player.character.wounded) {
            return;
         }

         player.call('CLIENT::BANKING:MENU', [true]);
         player.hint(controls.KEY_E, lang.toOpenBankMenu, 6);
      }

      colshape.onPlayerLeave = (player) => {
         player.call('CLIENT::BANKING:MENU', [false]);
      }

      mp.markers.new(
         bankConfig.marker, 
         new mp.Vector3(position.x, position.y, position.z - 0.25), 
         1.05, 
         {
            color: bankConfig.markerColor, 
            rotation: new mp.Vector3(0, 0, 0),
            visible: true,
            dimension: gDimension
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
      'SERVER::BANKING:CREATE': async (player: PlayerMp): Promise<inventories> => {
         // if (player.character.bank) {
         //    player.notification('vec imate racun', notifications.type.ERROR, 7);
         //    return;
         // }

         // const hasCreditCard = await Items.hasItem(ItemEnums.entity.PLAYER, player.character.id, itemNames.CREDIT_CARD);

         // if (hasCreditCard) {
         //    // PORUKA: vec imate kreditnu karticu
         //    return;
         // }

         return new Promise(resolve => {
            banks.create( { number: Math.floor(generateNumber(300, 666) * 859305).toString(), character_id: player.character.id, character: player.character } ).then(bank_Account => {
               inventories.create( { name: itemNames.CREDIT_CARD, 
                  entity: ItemEnums.entity.PLAYER, 
                  owner: player.character.id, 
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


