
require('../models/Vehicle');
require('../modules/Department');
 
class Vehicles { 
   constructor () { 
      mp.events.add({

         'playerEnterVehicle': (player, vehicle, seat) => { 
            let character = player.Character();
            if (vehicle.info) { 
               if (vehicle.info.job && vehicle.info.job != character.job) return player.removeFromVehicle();
               if (vehicle.info.faction && vehicle.info.faction != character.faction) return player.removeFromVehicle();
            }
            if (seat == 0) { player.call('client:player.vehicle', [true, vehicle.engine]); }
         },
         
         'playerStartExitVehicle': (player) => {
            if (player.vehicle.engine) player.vehicle.engine = true;
            if (player.data.Seatbelt) player.setVariable('Seatbelt', false);
         },
      
         'playerExitVehicle': (player, vehicle) => { 
            
         },
      
         'server:vehicle:indicators': (player, indicator) => {
            let vehicle = player.vehicle;
            if (vehicle && player.seat == 0) {
               switch (indicator) {
                  case 0: vehicle.setVariable('IndicatorRight', !vehicle.getVariable('IndicatorRight')); break;
                  case 1: vehicle.setVariable('IndicatorLeft', !vehicle.getVariable('IndicatorLeft')); break;
               }
            }
         },
      
         'server:vehicle:mileage': (player, vehicle, mileage) => {
            console.log('Mileage is ' + mileage);
            vehicle.setVariable('Mileage', mileage);
         }
      })
   }
}


new Vehicles();