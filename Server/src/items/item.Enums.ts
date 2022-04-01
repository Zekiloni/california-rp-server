
export namespace ItemEnums { 
   export enum type { 
      EQUIPABLE, CONSUMABLE, OPENABLE, 
      DRINK, FOOD, DRUG, WEAPON, AMMO,
      ILEGAL, LEGAL, MISC, CLOTHING, TOOL,
      PROP, HEAVY, STACKABLE, USABLE, STORAGE, 
      SEED, DOCUMENT, LICENSE, COOKABLE, COOKER,
      ID_CARD, LAW_BADGE, CREDIT_CARD, ELECTRONIC_DEVICE,
      MEDIC_KIT,

      WEAPON_MELEE, WEAPON_PISTOL, WEAPON_ASSAULT_RIFLE,
      WEAPON_SMG, WEAPON_SHOTGUN, WEAPON_DEADLY
   }

   export enum entity { 
      PLAYER, BACKPACK, STORAGE,
      VEHICLE, TEMPORARY_VEHICLE,
      HOUSE, BUSINESS, NONE
   }
   
   export enum status { 
      NONE, RAW, COOKED, BROKEN, FURNITURE_PLACED
   }


   export namespace components {
      export enum props {
         HAT,
         GLASSES,
         EAR_ACCESSORY,
         WATCH,
         BRACELET
      }

      export enum clothings {
         HEAD,
         MASK,
         HAIR,
         TORSO,
         LEGS,
         BAG,
         SHOES,
         ACCESSORIES,
         UNDERSHIRT,
         BODY_ARMOUR,
         DECALS,
         TOP
      }
   }
}


