
export const Groups:string[] = [
   'Igrač', 
   'Helper', 
   'Admin 1', 
   'Admin 2',
   'Admin 3', 
   'Admin 4', 
   'Lead Admin', 
   'Leadership'
];

export const Colors = {
   white: ['F8F8F8', 'DEDEDE', 'BDBDBD', 'A3A2A2', '909090'],
   low: ['BDBDBD', 'DEDEDE', 'A3A2A2', '909090', '909090'],
   vehicle: ['DEDEDE', 'BDBDBD', 'A3A2A2', '909090', '909090'],
   purple: ['cf9ae1', 'b380c4', '9565a5', '7f508f', '673e74'],
   ooc: ['b0c4c3', '9cb2b1', '8da1a0', '819493', '778a89'],
   faction: '59DC90',
   radio: 'FFFF99',
   pm: { from: 'FCBD00', to: 'FFD500' },
   grey: 'E8E8E8',
   tomato: 'FF6347',
   megaphone: ['F4D31C', 'F4D31C', 'F4D31C', 'F4D31C', 'F4D31C'],
   admin: 'F82234',
   broadcast: 'F71326',
   info: 'E48857',
   success: '6BD56B',
   error: 'FF6347',
   help: 'DACA5D',
   server: '0792E5',
   property: '1ABC4F',
   whitesmoke: 'CECECE',
   Business: [255, 255, 255, 1],
   Bubble: [179, 128, 196, 255],
   Injured: [255, 99, 71, 255],
};

export namespace Settings { 
   export enum Max { 
      INVENTORY_WEIGHT = 5,
      HOUSES = 3,
      BUSINESSES = 2,
      VEHICLES = 5,
   }

   export enum Prices {
      FREQUENCY = 350
   }

   export enum Taxes { 
      SALARY = 5, 
      HOUSE = 0.25,
      VEHICLE = 0.1,
      BUSINESS = 2
   }

   export enum LicensePrices {
      DRIVING = 600, 
      TRUCKING = 750,
      BOATING = 1000,
      FLYING = 2500,
      TAXI = 800
   }
   
}
