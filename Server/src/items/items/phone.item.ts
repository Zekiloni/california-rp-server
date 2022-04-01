
import { Items } from '../item';
import { inventories  } from '../inventoryItem';
import { ItemEnums } from "@enums";
import { itemNames } from '@constants';
import { shared_Data } from '@shared';


const phoneType = [
   ItemEnums.type.USABLE,
   ItemEnums.type.MISC,
];


export class PhoneItem extends Items {
   
   constructor (name: string, model: string, weight?: number, description?: string) { 
      super (name, phoneType, model, weight, description);
   }

   use (player: PlayerMp) {
      player.call('CLIENT::PHONE:TOGGLE');
      player.setVariable(shared_Data.USING_PHONE, true);
   }

   static stop (player: PlayerMp) {
      if (player.getVariable(shared_Data.USING_PHONE)) {
         player.setVariable(shared_Data.USING_PHONE, false);
      }
   }
}


new PhoneItem(itemNames.SMART_PHONE, 'prop_phone_proto', 0.3, 'telefon');

mp.events.add('SERVER::PHONE:STOP_USING', PhoneItem.stop);

