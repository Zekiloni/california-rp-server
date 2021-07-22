
require('../models/Vehicle');
require('../modules/Department');

mp.events.add({

   'playerEnterVehicle': (player, vehicle, seat) => { 
      let character = player.Character();
      if (vehicle.info) { 
         if (vehicle.info.job && vehicle.info.job != character.job) return player.removeFromVehicle();
         if (vehicle.info.faction && vehicle.info.faction != character.faction) return player.removeFromVehicle();
      }
      if (seat == 0) { player.call('client:player.vehicle', [true, vehicle.engine]); }
   },
   
   'playerStartExitVehicle': (Player) => {
      if (Player.vehicle.engine) Player.vehicle.engine = true;
      if (Player.data.Seatbelt) Player.setVariable('Seatbelt', false);
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

   'server:vehicle:interaction': (Player, Vehicle, Action) => { 
      if (!Vehicle) return;
      switch (Action) { 
         case 'bonnet': { 
            if (Vehicle.locked) return Player.Notification(frp.Globals.messages.VEHICLE_IS_LOCKED, frp.Globals.Notification.Error, 6);
            Vehicle.data.Hood = !Vehicle.data.Hood;
            break; }
         case 'boot': { 
            if (Vehicle.locked) return Player.Notification(frp.Globals.messages.VEHICLE_IS_LOCKED, frp.Globals.Notification.Error, 6);
            Vehicle.data.Trunk = !Vehicle.data.Trunk;
            break; 
         }
      }
   },

   'server:vehicle:windows': (Player, Vehicle) => { 
      if (Player.vehicle && Player.vehicle == Vehicle) { 
         const Index = Player.seat;

         let Windows = Vehicle.data.Windows;
         Windows[Index] = !Windows[Index];

         Vehicle.data.Windows = Windows;
      }
   },

   'server:vehicle:update': async (player, Vehicle, Mileage, Fuel) => {

      if (Vehicle.Database) { 
         const iVehicle = await frp.Vehicles.findOne({ where: { id: Vehicle.Database }});

         if (iVehicle) { 
            iVehicle.Mileage = Mileage;
            iVehicle.Fuel = Fuel;
            await iVehicle.save();
         }
      }

      Vehicle.setVariable('Mileage', Mileage);
      Vehicle.setVariable('Fuel', Fuel);
   }
})
