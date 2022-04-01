

import { Items } from '../item';
import { inventories  } from '../inventoryItem';
import { ItemEnums } from '@enums';
import { itemNames, itemDescriptions } from '@constants';


const documentType = [
   ItemEnums.type.DOCUMENT,
];


export class DocumentItem extends Items {
   specialType: number;
   
   constructor (name: string, model: string, special: number, type?: ItemEnums.type[], weight?: number, description?: string) { 
      super (name, type ? documentType.concat(type) : documentType, model, weight, description);
      this.specialType = special;
      
      this.use = function (player: PlayerMp, item: inventories) {
         console.log(item.data)
         switch (this.specialType) {
            case ItemEnums.type.ID_CARD: {
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


new DocumentItem (
   itemNames.DOCUMENT_ID_CARD, 
   'p_ld_id_card_01', 
   ItemEnums.type.ID_CARD, 
   [
      ItemEnums.type.ID_CARD
   ],
   0.05,
   itemDescriptions.DOCUMENT_ID_CARD
);