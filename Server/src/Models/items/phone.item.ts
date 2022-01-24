
import { itemData } from '../../globals/enums';
import { baseItem } from '../item.model';


const defaultPhoneType = [itemData.Type.USABLE, itemData.Type.MISC];

export class phoneItem extends baseItem {
   
   constructor (name: string, model: string, weight?: number, description?: string) { 
      super (name, defaultPhoneType, model, weight, description);

      this.use = function (player: PlayerMp) {
         player.call('CLIENT::INVENTORY:TOGGLE');
         player.call('CLIENT::PHONE:TOGGLE', [true]);
      }

   }
}

new phoneItem('Phone', 'prop_phone_proto', 0.3, 'telefon');


