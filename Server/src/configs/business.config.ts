import { itemNames } from '@constants';


export namespace BusinesConfig { 

   export const marker: number = 3;

   export const supplies: number = 125;

   export const markerColor: RGBA = [21, 149, 89, 200];

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
      [BusinesConfig.type.MARKET]: [
         itemNames.DRINK_BEER_BOTTLE, itemNames.DRINK_COLA_CAN, itemNames.DRINK_SODA_CAN, itemNames.FOOD_CHIPS, itemNames.FOOD_DONUT,
         itemNames.FOOD_SANDWICH
      ],
      
      [BusinesConfig.type.GAS_STATION]: [
         itemNames.DRINK_BEER_BOTTLE, itemNames.DRINK_COLA_CAN, itemNames.DRINK_SODA_CAN, itemNames.FOOD_CHIPS, itemNames.FOOD_DONUT,
         itemNames.FOOD_SANDWICH
      ],


      [BusinesConfig.type.RENT]: rentableVehicles,

      [BusinesConfig.type.VEHICLE_DEALERSHIP]: [
         'elegy', 'sultan', 'weevil', 'panto', 'dominator'
      ],
      
      [BusinesConfig.type.ELECTRONIC_SHOP]: [],

      [BusinesConfig.type.CLOTHING]: [
         itemNames.CLOTHING_MASK, itemNames.CLOTHING_LEGS, itemNames.CLOTHING_SHOES, itemNames.CLOTHING_ACCESSORIES,
         itemNames.CLOTHING_UNDERSHIRT, itemNames.CLOTHING_BODY_ARMOUR, itemNames.CLOTHING_DECAL, itemNames.CLOTHING_TOP, itemNames.PROP_HAT,
         itemNames.PROP_GLASSES, itemNames.PROP_EARS, itemNames.PROP_WATCH, itemNames.PROP_BRACELET           
      ],
      
      [BusinesConfig.type.RESTAURANT]: [],
      [BusinesConfig.type.CAFE_BAR]: [],
      [BusinesConfig.type.NIGHT_CLUB]: [],
      [BusinesConfig.type.AMMUNATION]: [],
      [BusinesConfig.type.PAWN_SHOP]: [],
      [BusinesConfig.type.FURNITURE_SHOP]: [],
      [BusinesConfig.type.CAR_PARTS]: [],
      [BusinesConfig.type.JEWELRY_SHOP]: [],
      [BusinesConfig.type.TATTO_SHOP]: [],
      [BusinesConfig.type.BARBER_SHOP]: []
   }
   
   export const defaultPrices = {
      [itemNames.DRINK_BEER_BOTTLE]: 2
   }
};
