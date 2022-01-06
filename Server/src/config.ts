export namespace Config {

   export let happyHours:boolean = false;

   export const Database = { 
      User: 'root',
      Password: '',
      Host: 'localhost',
      Name: 'mn-rp'
   }

   export const Default = {
      Money: 3000,
      Spawn: new mp.Vector3(-1355.6395, -519.5300, 23.4648),
      Heading: 120
   };

   export const Settings = { 
      Creator: { 
         Position: new mp.Vector3(2.7733354, 525.318298, 170.617156),
         Heading: 0,
         Time: 20
      },
   
      Lobby: { 
         Position: new mp.Vector3(-1765.12, -1111.37, 24.83),
         LookAt: new mp.Vector3(-1690.09, -1081.34, 31.31),
         Time: 23
      },
   }

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