


export interface itemAction { 
   name: string
   icon: string
   event: string
};

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

export interface CartItem {
   name: string
   price: number
}
