import { itemData } from '../../globals/enums';
import { baseItem, noDesc } from '../item.model';


export class weaponItem extends baseItem {
   Weapon_Hash: string;
   Caliber: baseItem;
   
   constructor (Name: string, Type: itemData.Type[], Model: string, wHash: string, Caliber: baseItem, Weight: number = 0.1, Desc: string = noDesc) { 
      super (Name, Type, Model, Weight, Desc);
      this.Weapon_Hash = wHash;
      this.Caliber = Caliber;

      
   }
}
