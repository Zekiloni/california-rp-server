

import { Item, noDesc } from '../item.model';


export class DrinkItem extends Item {
   Thirst: number;
   Alcohol?: number;
   
   constructor (name: string, type: Item.Type[], model: string, thirst: number, alcohol: number = 0, weight: number = 0.1, description: string = noDesc) { 
      super (name, type, model, weight, description);
      this.Thirst = thirst;
      this.Alcohol = alcohol;

      // .... todo

      this.Use = function (Player: PlayerMp) {
         Player.Character.Hunger += this.Thirst;
      }

   }
}


// /* Drinks */
// new Items('Coffe', [Items.Type.Drink, Items.Type.Consumable], 'prop_fib_coffee', 0.1);
// new Items('Soda Can', [Items.Type.Drink, Items.Type.Consumable], 'ng_proc_sodacan_01b', 0.3);
// new Items('Cola Can', [Items.Type.Drink, Items.Type.Consumable], 'ng_proc_sodacan_01a', 0.3);
// new Items('Water Bottle', [Items.Type.Drink, Items.Type.Consumable], 'prop_ld_flow_bottle', 0.25);
// new Items('Energy Drink', [Items.Type.Drink, Items.Type.Consumable], 'prop_energy_drink', 0.2);
// new Items('Juice Cup', [Items.Type.Drink, Items.Type.Consumable], 'ng_proc_sodacup_01c', 0.15);
// new Items('Beer Bottle', [Items.Type.Drink, Items.Type.Consumable], 'prop_cs_beer_bot_02', 0.3);
// new Items('Whiskey Bottle', [Items.Type.Drink, Items.Type.Consumable], 'prop_whiskey_bottle', 0.6);
// new Items('Vodka Bottle', [Items.Type.Drink, Items.Type.Consumable], 'prop_vodka_bottle', 0.5);
// new Items('Tequila Bottle', [Items.Type.Drink, Items.Type.Consumable], 'prop_tequila_bottle', 0.45);
// new Items('Gin Bottle', [Items.Type.Drink, Items.Type.Consumable], 'prop_bottle_macbeth', 0.4);
// new Items('Brandy Bottle', [Items.Type.Drink, Items.Type.Consumable], 'prop_bottle_brandy', 0.5);
// new Items('Rum Bottle', [Items.Type.Drink, Items.Type.Consumable], 'prop_rum_bottle', 0.4);
// new Items('Cognac Bottle', [Items.Type.Drink, Items.Type.Consumable], 'prop_bottle_cognac', 0.6);
// new Items('Wine Bottle', [Items.Type.Drink, Items.Type.Consumable], 'prop_bottle_richard', 0.7);
// new Items('Milk', [Items.Type.Drink, Items.Type.Consumable], 'prop_cs_milk_01', 0.6);