import { ItemEnums } from '@enums/items';
import { BaseItem } from '../baseItem';



export class drugItem extends BaseItem {
   
   constructor (name: string, type: ItemEnums.type[], model: string, weight: number, desc?: string) {
      super (name, [...type], model, weight, desc);
   }

}