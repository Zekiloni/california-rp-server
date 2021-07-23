"use strict";
// // require('../models/Vehicle');
// // require('../modules/Department');
// import { Globals } from "../Globals/Globals";
// import { Messages } from "../Globals/Messages";
// mp.events.add({
//    'playerEnterVehicle': (Player: PlayerMp, Vehicle: VehicleMp, Seat: number) => { 
//       const Character = Player.Character();
//       if (Vehicle.Job && Vehicle.Job != Character.Job) return Player.removeFromVehicle();
//       if (Vehicle.Faction && Vehicle.Faction != Character.Faction) return Player.removeFromVehicle();
//    },
//    'playerStartExitVehicle': (Player: PlayerMp) => {
//       if (Player.vehicle.engine) Player.vehicle.engine = true;
//       if (Player.getVariable('Seatbelt')) Player.setVariable('Seatbelt', false);
//    },
//    'server:vehicle:indicators': (Player: PlayerMp, Indicator: number) => {
//       if (Player.vehicle && Player.seat == 0) {
//          switch (Indicator) {
//             case 0: Player.vehicle.setVariable('IndicatorRight', !Player.vehicle.getVariable('IndicatorRight')); break;
//             case 1: Player.vehicle.setVariable('IndicatorLeft', !Player.vehicle.getVariable('IndicatorLeft')); break;
//          }
//       }
//    },
//    'server:vehicle:interaction': (Player, Vehicle, Action) => { 
//       if (!Vehicle) return;
//       switch (Action) { 
//          case 'bonnet': { 
//             if (Vehicle.locked) return Player.Notification(Messages.VEHICLE_IS_LOCKED, Globals.Notification.Error, 6);
//             Vehicle.data.Hood = !Vehicle.data.Hood;
//             break; }
//          case 'boot': { 
//             if (Vehicle.locked) return Player.Notification(Messages.VEHICLE_IS_LOCKED, Globals.Notification.Error, 6);
//             Vehicle.data.Trunk = !Vehicle.data.Trunk;
//             break; 
//          }
//       }
//    },
//    'server:vehicle:windows': (Player, Vehicle) => { 
//       if (Player.vehicle && Player.vehicle == Vehicle) { 
//          const Index = Player.seat;
//          let Windows = Vehicle.data.Windows;
//          Windows[Index] = !Windows[Index];
//          Vehicle.data.Windows = Windows;
//       }
//    },
//    'server:vehicle:update': async (Player: PlayerMp, Vehicle: VehicleMp, Mileage: number, Fuel: number) => {
//       if (Vehicle.DATABASE) { 
//          const iVehicle = await frp.Vehicles.findOne({ where: { id: Vehicle.DATABASE }});
//          if (iVehicle) { 
//             iVehicle.Mileage = Mileage;
//             iVehicle.Fuel = Fuel;
//             await iVehicle.save();
//          }
//       }
//       Vehicle.setVariable('Mileage', Mileage);
//       Vehicle.setVariable('Fuel', Fuel);
//    }
// })
