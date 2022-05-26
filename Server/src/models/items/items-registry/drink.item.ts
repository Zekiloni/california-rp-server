
import { BaseItem } from '../base.item';
import { Items  } from '../item';
import { ItemEnums } from '@enums';
import { itemDescriptions, itemNames } from '@constants';


const drinkType = [
   ItemEnums.type.DRINK, 
   ItemEnums.type.CONSUMABLE, 
];


export class DrinkItem extends BaseItem {
   thirst: number;
   alcohol: number | null;
   energy?: number;
   
   constructor (name: string, model: string, thirst: number, alcohol: number | null, type: ItemEnums.type[], weight?: number, description?: string) { 
      super (name, type, model, weight, description);
      this.thirst = thirst;
      this.alcohol = alcohol;
      console.log(this.name.toLowerCase().replace(' ', '_'))
   }

   async use (player: PlayerMp, item: Items) {
      await item.destroy();
      player.character.increment('thirst', { by: this.thirst } );
   }
}

new DrinkItem(itemNames.DRINK_MILK, 'prop_cs_milk_01', 15, null, drinkType, 1, itemDescriptions.DRINK_MILK);
new DrinkItem(itemNames.DRINK_COFFE, 'prop_fib_coffee', 4, null, drinkType, 0.25, itemDescriptions.DRINK_COFFE);
new DrinkItem(itemNames.DRINK_SODA_CAN, 'ng_proc_sodacan_01b', 35, null, drinkType, 0.33, itemDescriptions.DRINK_SODA_CAN);
new DrinkItem(itemNames.DRINK_COLA_CAN, 'ng_proc_sodacan_01a', 35, null, drinkType, 0.33, itemDescriptions.DRINK_COLA_CAN);
new DrinkItem(itemNames.DRINK_WATER, 'prop_ld_flow_bottle', 25, null, drinkType, 0.3, itemDescriptions.DRINK_WATER);
new DrinkItem(itemNames.DRINK_ENERGY, 'prop_energy_drink', 65, null, drinkType, 0.25, itemDescriptions.DRINK_ENERGY);
new DrinkItem(itemNames.DRINK_JUICE_CUP, 'ng_proc_sodacup_01c', 30, null, drinkType, 0.2, itemDescriptions.DRINK_JUICE_CUP);
new DrinkItem(itemNames.DRINK_BEER_BOTTLE, 'prop_cs_beer_bot_02', 50, 5, drinkType, 0.33, itemDescriptions.DRINK_BEER_BOTTLE);
new DrinkItem(itemNames.DRINK_WHISKEY_BOTTLE, 'prop_whiskey_bottle', 4, 40, drinkType, 0.7, itemDescriptions.DRINK_WHISKEY_BOTTLE);
new DrinkItem(itemNames.DRINK_VODKA_BOTTLE, 'prop_vodka_bottle', 4, 40, drinkType, 0.7, itemDescriptions.DRINK_VODKA_BOTTLE);
new DrinkItem(itemNames.DRINK_TEQUILA_BOTTLE, 'prop_tequila_bottle', 4, 50, drinkType, 0.7, itemDescriptions.DRINK_TEQUILA_BOTTLE);
new DrinkItem(itemNames.DRINK_GIN_BOTTLE, 'prop_bottle_macbeth', 4, 40, drinkType, 0.5, itemDescriptions.DRINK_GIN_BOTTLE);
new DrinkItem(itemNames.DRINK_BRANDY_BOTTLE, 'prop_bottle_brandy', 4, 50, drinkType, 0.5, itemDescriptions.DRINK_BRANDY_BOTTLE);
new DrinkItem(itemNames.DRINK_WHITE_WINE_BOTTLE, 'prop_bottle_richard', 70, 15, drinkType, 0.5, itemDescriptions.DRINK_WHITE_WINE_BOTTLE);
new DrinkItem(itemNames.DRINK_BLACK_WINE_BOTTLE, 'prop_bottle_richard', 70, 15, drinkType, 0.5, itemDescriptions.DRINK_BLACK_WINE_BOTTLE);
new DrinkItem(itemNames.DRINK_RUM_BOTTLE, 'prop_bottle_cognac', 90, 60, drinkType, 0.5, itemDescriptions.DRINK_RUM_BOTTLE);

