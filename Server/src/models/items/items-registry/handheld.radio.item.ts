

import { itemDescriptions, itemNames } from "@constants";
import { ItemEnums } from "@enums";
import { shared_Data } from '@shared';
import { animations } from '@configs';

import { BaseItem } from '../base.item';
import { Items } from "../item";


export class HandheldRadioItem extends BaseItem {
   
   constructor (name: string, model: string, weight: number = 0.1) { 
      super (name, [ItemEnums.type.EQUIPABLE, ItemEnums.type.MISC, ItemEnums.type.ELECTRONIC_DEVICE], model, weight, itemDescriptions.HANDHELD_RADIO);

      this.use = async function (player: PlayerMp, item: Items) {
         player.call('CLIENT::ITEMS:RADIO:TOGGLE', [item.data]);

         player.setVariable(shared_Data.ANIMATION, animations.walkie);
      };
   }
};


new HandheldRadioItem(
   itemNames.HANDHELD_RADIO, 'prop_cs_hand_radio', 0.25
);
