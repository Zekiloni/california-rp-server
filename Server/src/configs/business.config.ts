import { itemNames } from "@constants/items";


export namespace businessConfig { 

   export const supplies: number = 125;

   export const markerColor: RGBA = [253, 201, 41, 185];

   export const sprites = [
      52, 361, 619, 810, 669, 73, 73, 739, 93, 614, 110, 628, 776, 782, 617, 75, 71
   ]

   export const blipColors = [
      2, 1, 53, 81, 60, 33, 56, 31, 4, 27, 4, 20, 62, 39, 36, 76, 85
   ];

   export enum type { 
      MARKET, GAS_STATION, ELECTRONIC_SHOP, RENT, VEHICLE_DEALERSHIP,
      CLASSIC_CLOTHING, LUXURY_CLOTHING, RESTAURANT, CAFE_BAR, NIGHT_CLUB,
      AMMUNATION, PAWN_SHOP, FURNITURE_SHOP, CAR_PARTS, JEWELRY_SHOP, TATTO_SHOP,
      BARBER_SHOP
   }
   
   export const typeNames = [
      'Market', 'Gas station', 'Electronic Shop', 'Rent', 'Vehicle Dealership',
      'Classic Clothing', 'Luxury Clothing', 'Restaurant', 'Cafe Bar', 'Night Club',
      'Ammunation', 'Pawn Shop', 'Furniture Shop', 'Car Parts', 'Jewelry Shop', 'Tatto Shop',
      'Barber Shop'
   ]
   

   export const defaultProducts = {
      [businessConfig.type.MARKET]: [
         itemNames.DRINK_BEER_BOTTLE, itemNames.DRINK_COLA_CAN, itemNames.DRINK_SODA_CAN, itemNames.FOOD_CHIPS, itemNames.FOOD_DONUT,
         itemNames.FOOD_SANDWICH
      ]
   }
};
