



const Prices = {
   Driving: 250,
   Boating: 350,
   Flying: 400
}

class DMV { 
   constructor () { 
      mp.events.add({
         'server:player.dmv.finish': (player, info) => { 
            this.finish(player, info)
         }
      })
   }


   start (player, license) { 
      let character = player.getCharacter();
      switch (license) { 
         case 'driving' : {
            if (character.money < Prices.Driving) return; // nemate dovoljno novca
            break;
         }

         case 'boating': { 
            if (character.money < Prices.Boating) return; // nemate dovoljno novca
            break;
         }

         case 'flying': { 
            if (character.money < Prices.Flying) return; // nemate dovoljno novca

            break;
         }
      }
   }


   finish (player, info) { 
      let character = player.getCharacter(), exam = JSON.parse(info);
      if (exam.points > 8) { 
         character.licenses.push(info.license);
      }
   }

   register (player, vehicle) { 

   }
}


let DMV = new DMV();