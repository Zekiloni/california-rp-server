module.exports = {
   
   HappyHours: false,

   default: {
      spawn: new mp.Vector3(-1355.6395, -519.5300, 23.4648),
      heading: 120,
      dimension: 0
   },

   database: {
      logging: false,
   },

   Taxes: {
      Salary: 5, House: 0.25, Vehicle: 0.1, Business: 2
   },

   Frequency: { 
      Price: 350
   },

   Business: {
      Default: { 
         Supplies: 125
      },

      Multipliers: { 
         Market: 3.75, Ammunation: 51.75, Vehicle: 10
      }
   }

};
