

import { items } from '../item.model';
import { inventories  } from '../inventory.model';
import { itemEnums } from '@enums';
import { itemNames, itemDescriptions } from '@constants';


const documentType = [
   itemEnums.type.DOCUMENT, itemEnums.type.USABLE
];


export class documentItem extends items {
   specialType: number;
   
   constructor (name: string, model: string, special: number, type?: itemEnums.type[], weight?: number, description?: string) { 
      super (name, type ? documentType.concat(type) : documentType, model, weight, description);
      this.specialType = special;
      
      this.use = function (player: PlayerMp, item: inventories) {
         console.log(item.data)
         switch (this.specialType) {
            case itemEnums.type.ID_CARD: {
               player.call('CLIENT::ID:SHOW', [item.data!]); 
               break;
            }

            default: {
               return;
            }
         }
        
      }
   }
}


new documentItem (
   itemNames.DOCUMENT_ID_CARD, 
   'p_ld_id_card_01', 
   itemEnums.type.ID_CARD, 
   [
      itemEnums.type.ID_CARD
   ],
   0.05,
   itemDescriptions.DOCUMENT_ID_CARD
);