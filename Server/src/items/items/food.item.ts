

import { Items } from '../item';
import { inventories  } from '../inventoryItem';
import { ItemEnums } from "@enums";
import { itemNames } from '@constants';


const foodType = [
   ItemEnums.type.FOOD, 
   ItemEnums.type.CONSUMABLE
];


export class foodItem extends Items {
   hunger: number;
   snacks: number;
   
   constructor (name: string, model: string, hunger: number, snacks: number, type?: ItemEnums.type[], weight?: number, description?: string) { 
      super (name, type ? foodType.concat(type) : foodType, model, weight, description);
      this.hunger = hunger;
      this.snacks = snacks;

      this.use = function (player: PlayerMp, item: inventories) {
         player.character.hunger += this.hunger;
      }

   }
}


new foodItem(itemNames.FOOD_CHEESE_BURGER, 'prop_cs_burger_01', 2, 3);
new foodItem(itemNames.FOOD_HAMBURGER, 'prop_cs_burger_01', 2, 3);
new foodItem(itemNames.FOOD_CHICKEN_BURGER, 'prop_cs_burger_01', 3, 4);
new foodItem(itemNames.FOOD_PIZZA, 'prop_pizza_box_02', 3, 4);
new foodItem(itemNames.FOOD_SANDWICH , 'prop_sandwich_01', 3, 4);
new foodItem(itemNames.FOOD_TACO, 'prop_taco_01', 2, 3);
new foodItem(itemNames.FOOD_FRIES, 'prop_food_chips', 1, 2);
new foodItem(itemNames.FOOD_CHIPS, 'v_ret_ml_chips4', 1, 2);
new foodItem(itemNames.FOOD_DONUT, 'prop_donut_02', 1, 2);




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

