import { itemNames } from '@constants';


export namespace businessConfig { 

   export const marker: number = 3;

   export const supplies: number = 125;

   export const markerColor: RGBA = [205, 205, 205, 55];

   export const sprites = [
      52, 361, 619, 810, 669, 73, 73, 739, 93, 614, 110, 628, 776, 782, 617, 75, 71
   ]

   export const blipColors = [
      2, 1, 53, 81, 60, 33, 56, 31, 4, 27, 4, 20, 62, 39, 36, 76, 85
   ];

   export enum type { 
      MARKET, GAS_STATION, ELECTRONIC_SHOP, RENT, VEHICLE_DEALERSHIP,
      CLOTHING, RESTAURANT, CAFE_BAR, NIGHT_CLUB, AMMUNATION, PAWN_SHOP,
      FURNITURE_SHOP, CAR_PARTS, JEWELRY_SHOP, TATTO_SHOP, BARBER_SHOP
   }


   const rentableVehicles = [
      'asbo', 'dilettante', 'asea', 'emperor', 'faction', 'regina', 'picador', 'rancherxl', 'faggio', 'bagger', 'previon',
      'bobcatxl', 'bison', 'rumpo', 
   ]
   
   export const typeNames = [
      'Market', 'Gas station', 'Electronic Shop', 'Rent', 'Vehicle Dealership',
      'Clothing Shop', 'Restaurant', 'Cafe Bar', 'Night Club', 'Ammunation',
      'Pawn Shop', 'Furniture Shop', 'Car Parts', 'Jewelry Shop', 'Tatto Shop',
      'Barber Shop'
   ]
   

   export const defaultProducts = {
      [businessConfig.type.MARKET]: [
         itemNames.DRINK_BEER_BOTTLE, itemNames.DRINK_COLA_CAN, itemNames.DRINK_SODA_CAN, itemNames.FOOD_CHIPS, itemNames.FOOD_DONUT,
         itemNames.FOOD_SANDWICH
      ],
      
      [businessConfig.type.GAS_STATION]: [
         itemNames.DRINK_BEER_BOTTLE, itemNames.DRINK_COLA_CAN, itemNames.DRINK_SODA_CAN, itemNames.FOOD_CHIPS, itemNames.FOOD_DONUT,
         itemNames.FOOD_SANDWICH
      ],


      [businessConfig.type.RENT]: rentableVehicles,

      [businessConfig.type.VEHICLE_DEALERSHIP]: [],
      
      [businessConfig.type.ELECTRONIC_SHOP]: [],

      [businessConfig.type.CLOTHING]: [
         itemNames.CLOTHING_MASK, itemNames.CLOTHING_LEGS, itemNames.CLOTHING_SHOES, itemNames.CLOTHING_ACCESSORIES,
         itemNames.CLOTHING_UNDERSHIRT, itemNames.CLOTHING_BODY_ARMOUR, itemNames.CLOTHING_DECAL, itemNames.CLOTHING_TOP, itemNames.PROP_HAT,
         itemNames.PROP_GLASSES, itemNames.PROP_EARS, itemNames.PROP_WATCH, itemNames.PROP_BRACELET           
      ],
      
      [businessConfig.type.RESTAURANT]: [],
      [businessConfig.type.CAFE_BAR]: [],
      [businessConfig.type.NIGHT_CLUB]: [],
      [businessConfig.type.AMMUNATION]: [],
      [businessConfig.type.PAWN_SHOP]: [],
      [businessConfig.type.FURNITURE_SHOP]: [],
      [businessConfig.type.CAR_PARTS]: [],
      [businessConfig.type.JEWELRY_SHOP]: [],
      [businessConfig.type.TATTO_SHOP]: [],
      [businessConfig.type.BARBER_SHOP]: []
   }
   
   export const defaultPrices = {
      [itemNames.DRINK_BEER_BOTTLE]: 2
   }
};
