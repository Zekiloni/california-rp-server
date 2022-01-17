
import { itemData } from '../../globals/enums';
import { BaseItem } from '../item.model';


const defaultPhoneType = [itemData.Type.USABLE, itemData.Type.MISC];

export class phoneItem extends BaseItem {
   
   constructor (name: string, model: string, weight?: number, description?: string) { 
      super (name, defaultPhoneType, model, weight, description);

      this.use = function (player: PlayerMp) {
         console.log(this)
         player.call('CLIENT::PHONE:TOGGLE', [true]);
      }

   }
}

new phoneItem('Phone', 'prop_phone_proto', 0.3, 'telefon');


