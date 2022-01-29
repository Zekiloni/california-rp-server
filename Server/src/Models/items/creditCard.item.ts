import { itemData } from '../../globals/enums';
import Items from '../inventory.model';
import { baseItem } from '../item.model';


export class CreditCardItem extends baseItem {
   constructor (name: string, model: string, type: itemData.Type[], weight: number = 0.1, description: string) { 
      
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

new CreditCardItem(
   itemData.Names.CREDIT_CARD,
   'prop_cs_credit_card', 
   [
      itemData.Type.USABLE, 
      itemData.Type.DOCUMENT, 
      itemData.Type.CREDIT_CARD
   ],
   0.05, 
   itemData.Descriptions.CREDIT_CARD
);