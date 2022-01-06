import { Item, noDesc } from '../item.model';


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


// /* Food */
// new Items('Cheeseburger', [Items.Type.Food, Items.Type.Consumable], 'prop_cs_burger_01', 0.2);
// new Items('Hamburger', [Items.Type.Food, Items.Type.Consumable], 'prop_cs_burger_01', 0.2);
// new Items('Fries', [Items.Type.Food, Items.Type.Consumable], 'prop_food_chips', 0.15);
// new Items('Pizza', [Items.Type.Food, Items.Type.Consumable], 'prop_pizza_box_02', 0.3);
// new Items('Chicken Burger', [Items.Type.Food, Items.Type.Consumable], 'prop_cs_burger_01', 0.2);
// new Items('Chips', [Items.Type.Food, Items.Type.Consumable], 'v_ret_ml_chips4', 0.1);
// new Items('Donut', [Items.Type.Food, Items.Type.Consumable], 'prop_donut_02', 0.1);
// new Items('Sandwich', [Items.Type.Food, Items.Type.Consumable], 'prop_sandwich_01');
// new Items('Taco', [Items.Type.Food, Items.Type.Consumable], 'prop_taco_01', 0.2);

