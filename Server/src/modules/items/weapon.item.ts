import { Item, noDesc } from '../item';


export class WeaponItem extends Item {
   Weapon_Hash: string;
   Caliber: Item;
   
   constructor (Name: string, Type: Item.Type[], Model: string, wHash: string, Caliber: Item, Weight: number = 0.1, Desc: string = noDesc) { 
      super (Name, Type, Model, Weight, Desc);
      this.Weapon_Hash = wHash;
      this.Caliber = Caliber;

      
   }
}
