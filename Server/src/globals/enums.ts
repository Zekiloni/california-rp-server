


export const Global_Dimension = 0;

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

export enum EntityData {
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

export enum LogType {
   ERROR, SUCCESS, INFO
};


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

export namespace itemData {

   export enum Type {
      Equipable, Consumable, Openable, 
      Drink, Food, Alcohol, Drug, Weapon, 
      Ammo, Ilegal, Legal, Misc, Clothing,
      Prop, Heavy, Stackable, Usable, Storage, 
      Seed, Document, License, Cookable
   }

   export enum Entity { 
      Ground, Player, Storage,
      Vehicle, tempVehicle, House,
      Business
   }

   export enum Status { 
      None, Equiped, Right_Hand, Left_Hand,
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
      tacoItem = 'Taco'
   }
}



export enum cmdNames  {
   items = 'items',
   giveItem = 'giveitem',
   clearInventory = 'clearinventory'
}

export enum cmdDescs { 
   items = 'Lista svih predmeta.',
   giveItem = 'Davanje predmeta.',
   clearInventory = 'Čišćenje predmeta osobe.'
}