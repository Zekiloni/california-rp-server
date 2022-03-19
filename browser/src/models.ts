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
   data?: ItemExtra
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

export interface ItemExtra  {
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

export interface Player {
   id: number
   name: string
   ip: string
   account: Account
   character: Character
}

export interface Account {
   id: number
   username: string
   email: string
   administrator: number
   login_date: string
   ip_adress: string
   warns: number
   donator: number
   coins: number
   characters: Character[]
}


export interface Character {
   id: number
   name: string
   gender: number
   birth: string
   origin: string
   money: number
   faction: number
   rank: number
   job: number
   working_hours: number
   health: number
   hunger: number
   bank: BankAccount
   thirst: number
   hours: number
   minutes: number
   walking_style: string
   facial_mood: string
   max_inventory_weight: number
   max_houses: number
   max_business: number
   max_vehicles: number
   stranger: number
   created_at: Date
   updated_at: Date
}

export interface FactionRank { 
   id: number
   name: string
   faction_id: number;
   faction: Faction
   description: string
   salary: number
   permissions: number[]
   created_at: Date
   updated_at: Date
}

export interface Faction { 
   id: number
   type: number
   name: string
   description: string
   leader: number
   created_at: Date
   budget: number
   ranks: FactionRank[] | null
}

export type StringIndexString = {
   [key: string]: string
}

export interface pReport {
   sender: Player
   message: string
   time: number
   readed: boolean
   answer?: string | null
   answered_by?: Player | null
   answer_time?: number
};


export interface PhoneContact { 
   number: number
   name: string
}

export interface PhoneMessage { 
   sender: number
   recipient: number
   message: string
   contact?: string
}


export interface BankCredit {
   amount: number
   interest: number
   returned: number
   issued: number
   deadline: number
}

export interface BankAccount {  
   number: number
   owner: number
   character: Character | { name: string }
   balance: number;
   savings: number;
   paycheck: number;
   credit: BankCredit | null
   active: boolean
   transactions: BankTransaction[]
   created_at: Date;
   updated_at: Date;
}


export interface CreditCard {
   bank: number
   pin: number
}

export const enum TransactionType {
   PAYMENT, 
   TRANSFER, 
   WITHDRAW, 
   DEPOSIT, 
   PAYCHECK
}

export interface BankTransaction { 
   id: number
   type: TransactionType
   account_number: number;
   bank_account?: BankAccount
   info: string
   balance: number,
   date: number
}