
import { itemDescriptions, itemNames } from '@constants';
import { itemEnums } from '@enums';
import { items, inventories } from '@models';


export class creditCardTime extends items {
   constructor (name: string, model: string, type: itemEnums.type[], weight: number = 0.1, description?: string) { 
      
      super (name, type, model, weight, description);

      this.use = async function (player: PlayerMp, cCardItem: inventories) {
         const nearATM = await player.callProc('CLIENT::BANKING:ATM', [cCardItem]);
         
         if (!nearATM) {
            // PORUKA : NISTE BLIZU BANKOMATA
            return;
         }
      };
   }
}


new creditCardTime (
   itemNames.CREDIT_CARD,
   'prop_cs_credit_card', 
   [
      itemEnums.type.USABLE, 
      itemEnums.type.DOCUMENT, 
      itemEnums.type.CREDIT_CARD
   ],
   0.05, 
   itemDescriptions.CREDIT_CARD
);