
import { BaseItem } from '../base.item';
import { Items  } from '../item';
import { itemDescriptions, itemNames } from '@constants';
import { ItemEnums } from '@enums';



export default class creditCardTime extends BaseItem {
   constructor (name: string, model: string, type: ItemEnums.type[], weight: number = 0.1, description?: string) { 
      
      super (name, type, model, weight, description);

      this.use = async function (player: PlayerMp, cCardItem: Items) {
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
      ItemEnums.type.USABLE, 
      ItemEnums.type.DOCUMENT, 
      ItemEnums.type.CREDIT_CARD
   ],
   0.05, 
   itemDescriptions.CREDIT_CARD
);