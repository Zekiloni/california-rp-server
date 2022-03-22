import { ItemEnums } from '@enums/items';
import { Items } from '../item.model';



export class drugItem extends Items {
   
   constructor (name: string, type: ItemEnums.type[], model: string, weight: number, desc?: string) {
      super (name, [...type], model, weight, desc);
   }

}