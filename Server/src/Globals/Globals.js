const GLOBALS = {
   Color: [253, 201, 41, 185],



   Items: { 
      Supplies: { 
         Market: 'Market Supplies',
         Ammunation: 'Ammunation Supplies',
         Clothing: 'Clothes Supplies'
      }
   },

   distances: {
      ooc: 8.0,
      ic: 7.5,
      low: 4.5,
      whisper: 2,
      shout: 18.5,
      do: 8.5,
      vehicle: 5.5,
      me: 8.5,
   },

   Notification: {
      Succes: 0,
      Error: 1,
      Info: 2
   },

   Business: { 
      Types: { 
         Market: 0, GasStation: 1, Electronic: 2, 
         Rent: 3, Dealership: 4, Clothing: 5,
         Restaurant: 6, Cafe: 7, NightClub: 8, GunShop: 9,
         Furniture: 10, Pawn: 11, Tatto: 12
      }
   },

   Buy: {
      Options: { 
         Business: 'business', House: 'house'
      }
   },

   FAQ: { 
      List: [
         'Gde se mogu zaposliti ? Poslovi su označeni na mapi.', 
         'Gde mogu podići / ostaviti pare u banku ? Svi bankomati na mapi i banke su funkcionalne.'
      ]
   },

   Words: {
      Start: 'start',
      Stop: 'stop'
   },

   MarkerColors: { 
      Business: [253, 201, 41, 185],
      Faction: [69, 222, 105, 113],
      Job: [254, 213, 46, 70],
      Houses: [199, 0, 0, 70],
      Garages : [255, 255, 255, 70] // IZABRATI BOJU
   },

   Jobs: { 
      Multiplier: 5.75,
      Unemployed: 0,
      Sanitation: 4,
      Taxi: 7,
      Food_Delivery: 6,
   },

   

   
  
};

frp.Globals = GLOBALS;
