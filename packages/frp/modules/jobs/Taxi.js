



let Start = 0;

frp.Ubers = class Ubers { 

   static Uber = {};


   constructor (player, vehicle) { 
      this.id = Start ++;
      this.player = player;
      this.vehicle = vehicle;

      Ubers.Uber[this.id] = this;
   }


   static New (player, vehicle) { 

      const Vehicle = vehicle;


      if (Vehicle.numberPlate.includes('TX')) { 

      } else { 
         /// PORUKA: Nemate dozvolu za taksi
      }

   }
};