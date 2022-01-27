
import { itemData } from '../../globals/enums';
import Items from '../inventory.item.model';
import { baseItem } from '../item.model';


const defaultDocumentType = [itemData.Type.DOCUMENT, itemData.Type.USABLE];

export class DocumentItem extends baseItem {
   specialType: number;
   
   constructor (name: string, model: string, special: number, type?: itemData.Type[], weight?: number, description?: string) { 
      super (name, type ? defaultDocumentType.concat(type) : defaultDocumentType, model, weight, description);
      this.specialType = special;

      console.log(this)
      
      this.use = function (player: PlayerMp, item: Items) {
         console.log(item.data)
         switch (this.specialType) {
            case itemData.Type.ID_CARD: {
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

new DocumentItem(itemData.Names.DOCUMENT_ID_CARD, 'p_ld_id_card_01', itemData.Type.ID_CARD, [itemData.Type.ID_CARD], 0.05, itemData.Descriptions.DOCUMENT_ID_CARD);