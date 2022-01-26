


export const GlobalDimension = 0;

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


export namespace Locations { 
   export enum Sprites { 
      BANK = 207
   }

   export enum Markers {
      BANK = 29
   }
}

export enum Distances { 
   OOC = 6.5,
   IC = 7.0,
   LOW = 4.5,
   WHISPER = 2,
   SHOUT = 15.5,
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

export enum jobNumber { 
   UNEMPLOYED = 0,
   SANITATION = 4,
   TAXI_DRIVER = 7,
   FOOD_DELIVERY = 6, 
}

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
   BUBBLE = 'FREEZED',
   JOB_VEHICLE = 'JOB_VEHICLE',
   ADMIN_DUTY = 'ADMIN_DUTY',
   WALKING_STYLE = 'WALKING_STYLE',
   FACIAL_MOOD = 'FACIAL_MOOD',
   CUFFED = 'CUFFED',
   MASKED = 'MASKED',
   INJURIES = 'INJURIES',
   ITEM = 'ITEM',
   FUEL = 'FUEL',
   MILEAGE = 'MILEAGE',
   DIRT = 'DIRT',
   WINDOWS = 'WINDOWS',
   HOOD = 'HOOD',
   TRUNK = 'TRUNK',
   DATABASE = 'DATABASE'
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

export namespace houseData { 
   export enum Type { 
      SMALL_TRAILER, BIG_TRAILER, SMALL_APARTMENT, MEDIUM_APARTMENT, BIG_APARTMENT,
      SMALL_GROUND_HOUSE, MEDIUM_GROUND_HOUSE, SMALL_HOUSE, MEDIUM_HOUSE, BIG_HOUSE
   }
}

export enum adminLevel {
   NONE = 0,
   GAME_ASISSTANT = 1,
   ADMINISTRATOR = 2,
   ADMINISTRATOR_2 = 3,
   SENIOR_ADMINISTRATOR = 4,
   LEAD_ADMINISTRATOR = 5,
   COMMUNITY_MANAGER = 6,
   OWNER = 7 
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
      SEED, DOCUMENT, LICENSE, COOKABLE, COOKER,
      ID_CARD, LAW_BADGE
   }

   export enum Entity { 
      PLAYER, BACKPACK, STORAGE,
      VEHICLE, TEMPORARY_VEHICLE,
      HOUSE, BUSINESS, NONE
   }

   export enum Status { 
      NONE, RAW, COOKED, BROKEN, FURNITURE_PLACED
   }

   export enum Names { 
      DRIVING_LICENSE = 'Driving licence',
      FLYING_LICENSE = 'License for Flying',
      FISHING_LICENSE = 'Fishing permit',
      HUNTING_LICENSE = 'Hunting permit',
      WEAPON_LICENSE = 'Weapons license',
      TRUCK_LICENSE = 'Truck license',
      BOATING_LICENSE = 'Boat License',
      FOOD_CHEESE_BURGER = 'Cheeseburger',
      FOOD_HAMBURGER = 'Hamburger',
      FOOD_FRIES = 'Fries',
      FOOD_PIZZA = 'Pizza',
      FOOD_CHICKEN_BURGER = 'Chicken Burger',
      FOOD_CHIPS = 'Chips',
      DOCUMENT_ID_CARD = 'ID Card',
      FOOD_DONUT = 'Donut',
      FOOD_SANDWICH = 'Sandwich',
      FOOD_TACO = 'Taco',
      COMBAT_PISTOL = 'Combat Pistol',
      AMMO_9MM = '9mm Clip'
   }

   export const Descriptions = {
      DOCUMENT_ID_CARD: 'Vaš identifikacioni dokument. Lična karta. Nije preporučljivo da je izgubite.'
   }
}

export namespace vehicleData { 
   export enum Type { 
      TEMPORARY, PERMANENT
   }

   export enum Entity { 
      PLAYER, FACTION, BUSINESS
   }
}

export namespace CommandEnums { 
   export enum Names {
      ROLEPLAY_ME = 'me',
      ROLEPLAY_DO = 'do',
      OOC_CHAT = 'b',
      PM = 'pm',
      LOW_CHAT = 'l',
      WHISPER = 'whisper',
      ITEMS = 'items',
      GIVE_ITEM = 'giveitem',
      CLEAR_INVENTORY = 'clearinventory',
      ENGINE = 'engine',
      TIME = 'time',
      WEATHER = 'weather',
      FIX_VEH = 'fixveh',
      GIVE_MONEY = 'givemoney',
      SET_MONEY = 'setmoney',
      CREATE_HOUSE = 'createhouse',
      DESTROY_HOUSE = 'destroyhouse',
      SAVE_POS = 'position',
      GOTO = 'goto',
      GET_HERE = 'gethere',
      FLY = 'fly',
      ROLEPLAY_TRY = 'try',
      SHOUT_CHAT = 's',
      ROLEPLAY_AME = 'ame',
      COIN = 'coin'
   }

   export enum Params { 
      PLAYER = 'id / ime igrača',
      TEXT = 'tekst',
      HOUR = 'sat',
      MINUTE = 'minuta',
      SECONDS = 'sekunda',
      WEATHER = 'ime vremena / id'
   }

   export enum Descriptions { 
      ITEMS = 'Lista svih predmeta.',
      GIVE_ITEM = 'Davanje predmeta.',
      CLEAR_INVENTORY = 'Čišćenje predmeta osobe.',
      SET_TIME = 'Promena vremena, stavite sate na 666 da se vreme automatski menja.',
      SET_WEATHER = 'Vremenske prilike.',
      FIX_VEH = 'Popravka vozila.',
      GOTO = 'Teleport do igrača.',
      GET_HERE = 'Teleportovanje igrača do sebe.',
      ROLEPLAY_ME = 'Akcija, radnja.',
      ROLEPLAY_DO = 'Stanje, status.',
      ROLEPLAY_TRY = 'Pokušaj radnje.',
      ROLEPLAY_AME = 'Opis, ekspresija.',
      LOW_CHAT = 'Tih govor.',
      SHOUT_CHAT = 'Glasniji govor.',
      OOC_CHAT = 'Lokalni OOC govor.',
      PM_CHAT ='Privatna poruka.',
      WHISPER = 'Šaputanje.',
   }
}

