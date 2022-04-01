import { BaseItem } from '../base.Item';
import { ItemEnums } from '../item.Enums';


export class drugItem extends BaseItem {
   
   constructor (name: string, type: ItemEnums.type[], model: string, weight: number, desc?: string) {
      super (name, [...type], model, weight, desc);
   }

}