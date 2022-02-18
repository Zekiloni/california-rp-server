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
}



export interface CartItem {
   name: string
   price: number
}

export interface InventoryItem {
   id: number
   name: string
   entity: number
   owner: number
   equiped: boolean
   status: number
   fingerprint: number
   data?: itemExtra
}

export interface itemAction { 
   name: string
   icon: string
   event: string
};

export interface rItem {
   name: string;
   type: ItemEnums.type[];
   model: string;
   weight: number;
   description?: string;
   carryModel?: string;
   extraActions?: itemAction[];
}

export interface itemExtra  {
   ammo?: number
   serial?: number
   name?: string
   birth?: string
   gender?: number
   origin?: string
   expire?: number
   bank?: number
   created?: number
   pin?: number
   power?: boolean
   slot?: number
   frequency?: string
   drawable?: number
   texture?: number
};

export interface Business {
   [key: string]: string | boolean | number | Date | BusinesWorker[] | BusinessProduct[]
}

export interface Business { 
   id: number
   name: string
   type: number
   locked: boolean
   walk_in: boolean
   price: number
   owner: number
   budget: number
   ipl: string
   sprite: number
   sprite_color: number
   created_at: Date;
   updated_at: Date;
   products: BusinessProduct[]
   workers: BusinesWorker[]
}

export interface BusinessProduct {
   id: number
   name: string
   quantity: number;
   price: number
   created_At?: Date
   updated_At?: Date
}

export interface BusinesWorker {
   id: number
   name: string
   salary: number
   hired_By: string
   created_At?: Date
   updated_At?: Date
}