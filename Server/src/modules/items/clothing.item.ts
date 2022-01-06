

import { Item, noDesc } from '../item';


export class ClothingItem extends Item {
   Compontent: number;
   
   constructor (name: string, Type: Item.Type[], model: string, component: number, weight: number = 0.1, desc: string = noDesc) { 
      super (name, Type, model, weight, desc);
      this.Compontent = component;

      this.Use = function (player: PlayerMp, drawable: number, palette: number) {
         // .... todo
      };
   }
};
