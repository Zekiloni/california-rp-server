
let Vehicle = require('../models/Vehicle');

class Vehicles { 
   constructor () { 
      mp.events.add({

         'playerEnterVehicle': (player, vehicle, seat) => { 
            let character = player.getCharacter(), veh = mp.vehs[vehicle.uid];
            if (vehicle.info) { 
               if (vehicle.info.job && vehicle.info.job != character.job) return player.removeFromVehicle();
               if (vehicle.info.faction && vehicle.info.faction != character.faction) return player.removeFromVehicle();
            }
            if (seat == 0) { player.call('client:player.vehicle', [true, vehicle.engine]); }
         },
         
         'playerStartExitVehicle': (player) => {
            if (player.vehicle.engine) player.vehicle.engine = true;
         },
      
         'playerExitVehicle': (player, vehicle) => { 
            player.call('client:player.vehicle', [false, vehicle.engine])
         },
      
         'server:vehicle.indicators': (player, indicator) => {
            let vehicle = player.vehicle;
            if (vehicle && player.seat == 0) {
               switch (indicator) {
                  case 0: vehicle.setVariable('IndicatorRight', !vehicle.getVariable('IndicatorRight')); break;
                  case 1: vehicle.setVariable('IndicatorLeft', !vehicle.getVariable('IndicatorLeft')); break;
               }
            }
         },
      
         'server:vehicle.mileage': (player, vehicleData) => {
               let distance = 0;
               let speed = vehicleData;
               
               let trip = Math.floor(speed * ((Date.now() - timeNow) / 1000) * 100) / 100;
               distance += parseFloat(trip / 1000);
               timeNow = Date.now();
               let kmS = distance;
               kmS = kmS + player.vehicle.getVariable('Kilometer');
               let data = JSON.stringify({"playerID":player.id,"distance":distance,"state":true,"vehicle":player.vehicle});
               mp.events.call('tank', player, data);
               player.vehicle.setVariable('Kilometer', kmS);
         }
      })
   }
}


new Vehicles();