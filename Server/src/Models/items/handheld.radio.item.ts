

import { items } from '../item.model';
import { inventories  } from '@models';
import { itemDescriptions, itemNames } from "@constants";
import { itemEnums } from "@enums";




export class handheldRadioItem extends items {
   
   constructor (name: string, model: string, weight: number = 0.1) { 
      super (name, [itemEnums.type.EQUIPABLE, itemEnums.type.MISC, itemEnums.type.ELECTRONIC_DEVICE], model, weight, itemDescriptions.HANDHELD_RADIO);

      this.equip = async function (player: PlayerMp, item: inventories) {
         const active = await player.callProc('CLIENT::ITEMS:RADIO:TOGGLE', [item.data]);
         if (active) {
            // animacija motorola
         } else { 
            player.stopAnimation();
         }
      };
   }
};


new handheldRadioItem(
   itemNames.HANDHELD_RADIO, 'prop_cs_hand_radio', 0.25
);
