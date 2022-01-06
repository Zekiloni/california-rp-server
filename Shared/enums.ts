


export const Global_Dimension = 0;

export namespace Peds { 
   export enum Models { 
      MALE = 'mp_m_freemode_01',
      FEMALE = 'mp_f_freemode_01'
   }
}


export enum Distances { 
   OOC = 8.0,
   IC = 7.5,
   LOW = 4.5,
   WHISPER = 2,
   SHOUT = 18.5,
   ROLEPLAY = 8.5,
   VEHICLE = 5.5
};

export namespace Business { 

   export enum Default { 
      SUPPLIES = 125
   }

   export enum Types { 
      MARKET = 0, 
      GAS_STATION = 1,
      ELECTRONICS = 2, 
      VEHICLE_RENT = 3, 
      DEALERSHIP = 4, 
      CLOTHING = 5,
      RESTAURANT = 6, 
      CAFE = 7, 
      NIGHT_CLUB = 8, 
      GUN_SHOP = 9,
      FURNITURE_SHOP = 10, 
      PAWN_SHOP = 11, 
      TATTO = 12
   }
}

export enum NotifyType {
   SUCCESS, ERROR, INFO
}

export enum Jobs { 
   UNEMPLOYED = 0,
   SANITATION = 4,
   TAXI_DRIVER = 7,
   FOOD_DELIVERY = 6, 
}

export enum EntityData {
   MONEY = 'MONEY',
   LOGGED = 'LOGGED_IN',
   ADMIN = 'ADMIN_LEVEL',
}

export enum LogType {
   ERROR, SUCCESS, INFO
}