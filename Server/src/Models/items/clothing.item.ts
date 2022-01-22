

import { itemData } from '../../globals/enums';
import { baseItem, noDesc } from '../item.model';


export class clothingItem extends baseItem {
   Compontent: number;
   
   constructor (name: string, Type: itemData.Type[], model: string, component: number, weight: number = 0.1, description: string = noDesc) { 
      super (name, Type, model, weight, description);
      this.Compontent = component;

      this.use = function (player: PlayerMp, drawable: number, palette: number) {
         // .... todo
      };
   }
};
