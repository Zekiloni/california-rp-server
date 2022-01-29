


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







export namespace itemData {

  

   export enum Names { 
      CREDIT_CARD = 'Credit Card',
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
      DOCUMENT_ID_CARD: 'Identifikacioni dokument. Lična karta. Nije preporučljivo da je izgubite.',
      CREDIT_CARD: 'Kreditna kartica bankovnog računa. Služi za podizanje novca na bankomatima i plaćanje.'
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

