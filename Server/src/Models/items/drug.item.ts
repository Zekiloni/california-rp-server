import { itemEnums } from '@enums/items';
import { items } from '../item.model';



export class drugItem extends items {
   
   constructor (name: string, type: itemEnums.type[], model: string, weight: number, desc?: string) {
      super (name, [...type], model, weight, desc);
   }

}