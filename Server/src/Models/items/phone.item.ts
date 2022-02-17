
import { items } from '../item.model';
import { inventories  } from '../inventory.model';
import { ItemEnums } from "@enums";
import { itemNames } from '@constants';


const phoneType = [
   ItemEnums.type.USABLE,
   ItemEnums.type.MISC,
];


export class phoneItem extends items {
   
   constructor (name: string, model: string, weight?: number, description?: string) { 
      super (name, phoneType, model, weight, description);

      this.use = function (player: PlayerMp) {
         player.call('CLIENT::INVENTORY:TOGGLE');
         player.call('CLIENT::PHONE:TOGGLE', [true]);
      }

   }
}


new phoneItem(itemNames.SMART_PHONE, 'prop_phone_proto', 0.3, 'telefon');


