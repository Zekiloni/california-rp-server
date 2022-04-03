

import { BaseItem } from '../baseItem';
import { inventories  } from '../item';
import { itemDescriptions } from "@constants";
import { ItemEnums } from "@enums";



export class CookerItem extends BaseItem {
   slots: number;
   offsets: Vector3Mp[];
   
   constructor (name: string, model: string, slots: number, weight: number = 0.1, description: string = itemDescriptions.NO_DESCRIPTION) { 
      super (name, [ItemEnums.type.HEAVY, ItemEnums.type.COOKER], model, weight, description);
      this.slots = slots;
      this.use = function (player: PlayerMp, drawable: number, palette: number) {
         // .... todo
      };
   }
};


new CookerItem('Big BBQ 1', 'prop_bbq_1', 10, 8.15, 'Veliki rostilj.');
new CookerItem('Big BBQ 2', 'prop_bbq_5', 8, 5.65);
new CookerItem('Small BBQ', 'prop_bbq_2', 4, 3.65);
