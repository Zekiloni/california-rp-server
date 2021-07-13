module.exports = {
   
   HappyHours: false,

   default: {
      spawn: new mp.Vector3(-1355.6395, -519.5300, 23.4648),
      heading: 120,
      dimension: 0,
      Health: 99,
      Max_Houses: 3,
      Max_Business: 2,
      Max_Vehicles: 5,
      Taximeter: 0.7
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

};
