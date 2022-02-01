

import { items } from '../item.model';
import { inventories  } from '../inventory.model';
import { itemDescriptions } from "@constants";
import { itemEnums } from "@enums";



export class cookerItem extends items {
   slots: number;
   offsets: Vector3Mp[];
   
   constructor (name: string, model: string, slots: number, weight: number = 0.1, description: string = itemDescriptions.NO_DESCRIPTION) { 
      super (name, [itemEnums.type.HEAVY, itemEnums.type.COOKER], model, weight, description);
      this.slots = slots;
      this.use = function (player: PlayerMp, drawable: number, palette: number) {
         // .... todo
      };
   }
};


new cookerItem('Big BBQ 1', 'prop_bbq_1', 10, 8.15, 'Veliki rostilj.');
new cookerItem('Big BBQ 2', 'prop_bbq_5', 8, 5.65);
new cookerItem('Small BBQ', 'prop_bbq_2', 4, 3.65);
