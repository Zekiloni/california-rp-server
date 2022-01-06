
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
   
   Lobby: { 
      Position: new mp.Vector3(-1765.12, -1111.37, 24.83),
      LookAt: new mp.Vector3(-1690.09, -1081.34, 31.31),
      Time: 23
   },

   database: {
      logging: false,
   },

   Taxes: {
      
   },


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
   