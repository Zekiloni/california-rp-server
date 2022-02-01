

import { items } from '../item.model';
import { inventories  } from '../inventory.model';
import { itemEnums } from "@enums";


export class clothingItem extends items {
   Compontent: number;
   
   constructor (name: string, Type: itemEnums.type[], model: string, component: number, weight: number = 0.1, description?: string) { 
      super (name, Type, model, weight, description);
      this.Compontent = component;

      this.use = function (player: PlayerMp, drawable: number, palette: number) {
         // .... todo
      };
   }
};
