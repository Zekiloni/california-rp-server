


export const Licenses = { 
   Vehicle: 'B',
   Motorcycle: 'A',
   Truck: 'C',
   Flying: 'F',
   Boat: 'E',
   Taxi: 'TX',
   Fishing: 'Fishing',
   CCW: 'Carry Concealed Weapons',
   PF: 'Personal Firearm',
   
}

export interface License { 
   License: keyof typeof Licenses,
   Issued: Date
   Expiring: Date
}