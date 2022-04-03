import { ItemEnums } from '@enums';
import { BaseItem } from '@models';



export class DrugItem extends BaseItem {
   
   constructor (name: string, type: ItemEnums.type[], model: string, weight: number, desc?: string) {
      super (name, [...type], model, weight, desc);
   }

}