

import { Items } from '../item';
import { inventories  } from '@models';
import { itemDescriptions, itemNames } from "@constants";
import { ItemEnums } from "@enums";
import { shared_Data } from '@shared';
import { animations } from '@configs';


export class handheldRadioItem extends Items {
   
   constructor (name: string, model: string, weight: number = 0.1) { 
      super (name, [ItemEnums.type.EQUIPABLE, ItemEnums.type.MISC, ItemEnums.type.ELECTRONIC_DEVICE], model, weight, itemDescriptions.HANDHELD_RADIO);

      this.use = async function (player: PlayerMp, item: inventories) {
         player.call('CLIENT::ITEMS:RADIO:TOGGLE', [item.data]);

         player.setVariable(shared_Data.ANIMATION, animations.walkie);
      };
   }
};


new handheldRadioItem(
   itemNames.HANDHELD_RADIO, 'prop_cs_hand_radio', 0.25
);
