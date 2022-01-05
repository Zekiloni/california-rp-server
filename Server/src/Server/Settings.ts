
export const Settings = {
   HappyHours: false,

   Default: {
      spawn: new mp.Vector3(-1355.6395, -519.5300, 23.4648),
      heading: 120,
      dimension: 0,
      Health: 99,
      Money: 5000,
      Taximeter: 0.7,
      Wound: { 
         Health: 30,
         Respawn_Time: 10 * 60 * 1000
      }
   },

   Creator: { 
      Position: new mp.Vector3(2.7733354, 525.318298, 170.617156),
      Heading: 0,
      Time: 20
   },

   Limitations: {
      Max_Inventory_Weight: 5,
      Max_Houses: 3,
      Max_Business: 2,
      Max_Vehicles: 5,
   },
   
   Lobby: { 
      Position: new mp.Vector3(-1765.12, -1111.37, 24.83),
      LookAt: new mp.Vector3(-1690.09, -1081.34, 31.31),
      Time: 23
   },

   database: {
      logging: false,
   },

   Taxes: {
      Salary: 5, House: 0.25, Vehicle: 0.1, Business: 2
   },

   Licenses: { 'Driving': 1000, 'Trucking': 2000, 'Boating': 3800, 'Flying': 15000, 'Taxi': 2200 },

   Frequency: { 
      Price: 350
   },

   Business: {
      Default: { 
         Supplies: 125
      }
   },

   Houses: { 
      Multiplier: 255
   }
}
   