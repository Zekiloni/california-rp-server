import { Item, noDesc } from '../item';


export class FoodItem extends Item {
   Hunger: number;
   Snacks: number;
   
   constructor (name: string, type: Item.Type[], model: string, hunger: number, snacks: number, weight: number = 0.1, description: string = noDesc) { 
      super (name, type, model, weight, description);
      this.Hunger = hunger;
      this.Snacks = snacks;

      // .... todo

      this.Use = function (Player: PlayerMp) {
         Player.Character.Hunger += this.Hunger;
      }

   }
}


