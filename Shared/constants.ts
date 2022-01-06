
export const Ranks:string[] = [
   'Player', 
   'Helper', 
   'Junior Admin', 
   'Admin',
   'Senior Admin', 
   'General Admin', 
   'Lead Admin', 
   'Community Owner'
];

export enum AdminLevels {
   NONE = 0,
   HELPER = 1,
   JUNIOR_ADMIN = 2,
   ADMIN = 3,
   SENIOR_ADMIN = 4,
   GENERAL_ADMIN = 5,
   LEAD_ADMIN = 6,
   COMMUNITY_OWNER = 7 
}

export const Colors = {
   White: ['F8F8F8', 'DEDEDE', 'BDBDBD', 'A3A2A2', '909090'],
   Low: ['BDBDBD', 'DEDEDE', 'A3A2A2', '909090', '909090'],
   Vehicle: ['DEDEDE', 'BDBDBD', 'A3A2A2', '909090', '909090'],
   Purple: ['cf9ae1', 'b380c4', '9565a5', '7f508f', '673e74'],
   OOC: ['b0c4c3', '9cb2b1', '8da1a0', '819493', '778a89'],
   FACTION: '59DC90',
   RADIO: 'FFFF99',
   PM: { From: 'FCBD00', To: 'FFD500' },
   Grey: 'E8E8E8',
   Tomato: 'FF6347',
   Megaphone: ['F4D31C', 'F4D31C', 'F4D31C', 'F4D31C', 'F4D31C'],
   Admin: 'F82234',
   Broadcast: 'F71326',
   Info: 'E48857',
   Success: '6BD56B',
   Error: 'FF6347',
   Help: 'DACA5D',
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
