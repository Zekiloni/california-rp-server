import { itemEnums } from "@enums";
import { items } from '@models';
import { itemNames } from '@constants';


const phoneType = [
   itemEnums.type.USABLE,
   itemEnums.type.MISC,
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


