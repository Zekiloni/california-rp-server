


export const globalDimension = 0;

export namespace Peds { 
   export enum Models { 
      MALE = 'mp_m_freemode_01',
      FEMALE = 'mp_f_freemode_01'
   }

   export enum Bones { 
      HEAD = 20,
      R_FOOT = 2,
      L_FOOT = 6,
      TORSO = 8,
      LEG = 4,
      NECK = 18
   };

   export const facialMoods = {
      'Normal': 'normal',
      'Zamišljena': 'mood_aiming_1',
      'Ljutita': 'mood_angry_1',
      'Pijana': 'mood_drunk_1',
      'Srećna': 'mood_happy_1' ,
      'Povredjena': 'mood_injured_1',
      'Stresirana': 'mood_stressed_1' ,
      'Uvređena': 'mood_sulk_1',
   }

   export const walkingStyles = { 
      'Normal': null,
      'Brave': 'move_m@brave',
      'Confident': 'move_m@confident',
      'Drunk': 'move_m@drunk@verydrunk',
      'Fat': 'move_m@fat@a',
      'Gangster': 'move_m@shadyped@a',
      'Hurry': 'move_m@hurry@a',
      'DeadlyWound': 'move_m@injured',
      'HeavyWound': 'move_m@drunk@verydrunk',
      'MediumWound': 'move_m@drunk@moderatedrunk',
      'Wounded': 'move_injured_generic',
      'LegsDamage': 'move_m@drunk@verydrunk',
      'Injured_Ground': 'move_injured_ground',
      'Strafed': 'move_strafe@injured',
      'Intimidated': 'move_m@intimidation@1h',
      'Quick': 'move_m@quick',
      'Sad': 'move_m@sad@a',
      'Tough': 'move_m@tool_belt@a',
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


export enum spawnTypes {
   default = 0,
   lastPosition = 1,
   faction = 2,
   house = 3
}

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
};


export enum NotifyType {
   SUCCESS, ERROR, INFO
};


export enum Jobs { 
   UNEMPLOYED = 0,
   SANITATION = 4,
   TAXI_DRIVER = 7,
   FOOD_DELIVERY = 6, 
};


export enum entityData {
   MONEY = 'MONEY',
   LOGGED = 'LOGGED_IN',
   ADMIN = 'ADMIN_LEVEL',
   SPAWNED = 'SPAWNED',
   MUTED = 'MUTED',
   JOB = 'JOB',
   FACTION = 'FACTION',
   FACTION_DUTY = 'FACTION_DUTY',
   JOB_DUTY = 'JOB_DUTY',
   FREEZED = 'FREEZED',
   JOB_VEHICLE = 'JOB_VEHICLE',
   ADMIN_DUTY = 'ADMIN_DUTY',
   WALKING_STYLE = 'WALKING_STYLE',
   FACIAL_MOOD = 'FACIAL_MOOD',
   CUFFED = 'CUFFED',
   INJURIES = 'INJURIES',
   ITEM = 'ITEM'
};


export enum logType {
   ERROR, SUCCESS, INFO
};


export namespace bizData { 
   export enum Type { 
      MARKET, GAS_STATION, ELECTRONIC_SHOP, RENT, VEHICLE_DEALERSHIP,
      CLASSIC_CLOTHING, LUXURY_CLOTHING, RESTAURANT, CAFE_BAR, NIGHT_CLUB,
      AMMUNATION, PAWN_SHOP, FURNITURE_SHOP, CAR_PARTS, JEWELRY_SHOP, TATTO_SHOP,
      BARBER_SHOP
   }

   export function getDefault (type: number) { 

      switch (type) { 
         case Type.MARKET: { 
            break;
         }

      }
   }
}


export enum adminLevel {
   NONE = 0,
   HELPER = 1,
   JUNIOR_ADMIN = 2,
   ADMIN = 3,
   SENIOR_ADMIN = 4,
   GENERAL_ADMIN = 5,
   LEAD_ADMIN = 6,
   COMMUNITY_OWNER = 7 
}


export namespace weather { 

   export const Names = [
      'EXTRASUNNY', 'CLEAR', 'CLOUDS', 'SMOG', 'FOGGY',
      'OVERCAST', 'RAIN', 'THUNDER', 'CLEARING', 'NEUTRAL',
      'SNOW', 'BLIZZARD', 'SNOWLIGHT', 'XMAS', 'HALLOWEEN'
   ];

   export enum Types {
      extrasunny,	clear, clouds, smog, foggy,
      overcast, rain, thunder, clearing, neutral,
      snow, blizzard, snowlight, xmas, halloween
   };
};


export namespace itemData {

   export enum Type {
      EQUIPABLE, CONSUMABLE, OPENABLE, 
      DRINK, FOOD, DRUG, WEAPON, AMMO,
      ILEGAL, LEGAL, MISC, CLOTHING,
      PROP, HEAVY, STACKABLE, USABLE, STORAGE, 
      SEED, DOCUMENT, LICENSE, COOKABLE
   }

   export enum Entity { 
      PLAYER, BACKPACK, STORAGE,
      VEHICLE, TEMPORARY_VEHICLE,
      HOUSE, BUSINESS
   }

   export enum Status { 
      NONE, EQUIPED, RAW, COOKED, BROKEN
   }
   

   export enum Names { 
      drivingLicense = 'Driving licence',
      flyingLicense = 'License for Flying',
      fishingLicense = 'Fishing permit',
      huntingLicense = 'Hunting permit',
      weaponLicense = 'Weapons license',
      truckLicense = 'Truck license',
      boatingLicense = 'Boat License',
      cheeseburgerItem = 'Cheeseburger',
      hamburgerItem = 'Hamburger',
      friesItem = 'Fries',
      pizzaItem = 'Pizza',
      chickenBurgerItem = 'Chicken Burger',
      chipsItem = 'Chips',
      donutItem = 'Donut',
      sandwichItem = 'Sandwich',
      tacoItem = 'Taco',
      COMBAT_PISTOL = 'Combat Pistol'
   }
}


export namespace commandData { 
   export enum Names {
      ITEMS = 'items',
      GIVE_ITEM = 'giveitem',
      CLEAR_INVENTORY = 'clearinventory',
      ENGINE = 'engine',
      TIME = 'time',
      WEATHER = 'weather',
      FIX_VEH = 'fixveh',
      GIVE_MONEY = 'givemoney',
      SET_MONEY = 'setmoney'
   }

   export enum Descriptions { 
      items = 'Lista svih predmeta.',
      giveItem = 'Davanje predmeta.',
      clearInventory = 'Čišćenje predmeta osobe.',
      time = 'Promena vremena.',
      weather = 'Vremenske prilike.',
      FIX_VEH = 'Popravka vozila.'
   }
}

