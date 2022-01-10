import { itemData } from '../../globals/enums';
import { baseItem } from '../item.model';


const defaultFoodType = [itemData.Type.FOOD, itemData.Type.CONSUMABLE];

export class foodItem extends baseItem {
   hunger: number;
   snacks: number;
   
   constructor (name: string, model: string, hunger: number, snacks: number, type?: itemData.Type[], weight?: number, description?: string) { 
      super (name, type ? defaultFoodType.concat(type) : defaultFoodType, model, weight, description);
      this.hunger = hunger;
      this.snacks = snacks;

      // .... todo

      this.use = function (player: PlayerMp) {
         player.Character.hunger += this.hunger;
      }

   }
}

new foodItem(itemData.Names.cheeseburgerItem, 'prop_cs_burger_01', 2, 3)
new foodItem(itemData.Names.hamburgerItem, 'prop_cs_burger_01', 2, 3)
new foodItem(itemData.Names.friesItem, 'prop_food_chips', 1, 2)
new foodItem(itemData.Names.pizzaItem, 'prop_pizza_box_02', 3, 4)
new foodItem(itemData.Names.chickenBurgerItem, 'prop_cs_burger_01', 3, 4)
new foodItem(itemData.Names.chipsItem, 'v_ret_ml_chips4', 1, 2)
new foodItem(itemData.Names.donutItem, 'prop_donut_02', 1, 2)
new foodItem(itemData.Names.sandwichItem , 'prop_sandwich_01', 3, 4)
new foodItem(itemData.Names.tacoItem, 'prop_taco_01', 2, 3)



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

