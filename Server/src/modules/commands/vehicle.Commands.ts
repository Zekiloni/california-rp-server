import { cmds } from '@constants';
import { Vehicles, Logs } from '@models';
import { shared_Data } from '@shared';
import { Commands } from '../commands';



Commands[cmds.names.ENGINE] = { 
   description: cmds.descriptions.ENGINE,
   vehicle: true,
   call: (player: PlayerMp) => { 
		const vehicle = player.vehicle;
		vehicle.engine = !vehicle.engine;
   } 
};

Commands[cmds.names.VEHICLES_MENU] = {
   description: cmds.descriptions.VEHICLES_MENU,
   call (player: PlayerMp) {
      Vehicles.findAll( { where: { owner: player.character.id } } ).then(vehicles => {
         console.log(vehicles);
         player.call('CLIENT::VEHICLES:MENU', [vehicles]);
      }).catch(e => Logs.error('catchingVehicles ' + e));
   }
}

Commands[cmds.names.VEHICLE_TRUNK] = {
   description: cmds.descriptions.VEHICLE_TRUNK,
   call (player: PlayerMp) {
      if (player.vehicle) {
         player.vehicle.setVariable(shared_Data.TRUNK, !player.vehicle.getVariable(shared_Data.TRUNK));
      } else { 
         const vehicle = mp.vehicles.getClosest(player.position);
         player.callProc('CLIENT::NEAR_VEHICLE_TRUNK', [vehicle.id]).then(nearTrunk => {
            if (nearTrunk) {
               vehicle.setVariable(shared_Data.TRUNK, !vehicle.getVariable(shared_Data.TRUNK));
            }
         })
      }
   }
}


// Commands['seatbelt'] = { 
//    description: 'Vezanje pojasa',
//    Vehicle: true,
//    call: (player: PlayerMp) => { 
// 		Player.data.Seatbelt = !Player.data.Seatbelt;
// 		let message = Player.data.Seatbelt ? ' stavlja pojas.' : ' skida pojas.';
// 		Player.ProximityMessage(frp.Globals.distances.me, '* ' + Player.name + message, frp.Globals.Colors.purple);
//    } 
// }

// Commands['trunk'] = { 
//    description: 'Opcije gepeka vozila',
//    call: (player: PlayerMp) => { 
// 		const Vehicle = frp.Vehicles.Nearest(Player.position, 2);
// 		if (Vehicle && Vehicle.locked) return Player.Notification(frp.Globals.messages.VEHICLE_IS_LOCKED, frp.notifications.type.ERROR, 6);
// 		if (Vehicle) Vehicle.data.Trunk = !Vehicle.data.Trunk;
//    } 
// }

// Commands['hood'] = { 
//    description: 'Opcije haube vozila',
//    call: (player: PlayerMp) => { 
// 		const Vehicle = frp.Vehicles.Nearest(Player.position, 2);
// 		if (Vehicle && Vehicle.locked) return Player.Notification(frp.Globals.messages.VEHICLE_IS_LOCKED, frp.notifications.type.ERROR, 6);
// 		if (Vehicle) Vehicle.data.Hood = !Vehicle.data.Hood;
//    } 
// }

// Commands['fill'] = { 
//    description: 'Opcije haube vozila',
//    call: (player: PlayerMp) => { 
// 	const NearestStation = await frp.Business.NearestGasStation(Player);
// 		if (NearestStation) { 
// 		Player.callProc('client:business.gas:nearpump').then(Pump => { 
// 		const Info = { 
// 		Business: { id: NearestStation.id, Name: NearestStation.Name, Multiplier: NearestStation.Products.Fuel.multiplier }
// 		};
// 		Player.call('client:business.gas:menu', [Info]);
// 		}).catch(() => { 
// 		Player.Notification(frp.Globals.messages.NOT_NEAR_GAS_PUMP, frp.notifications.type.ERROR, 5);
// 		});
// 		} else { 
// 		Player.Notification(frp.Globals.messages.NOT_NEAR_GAS_STATION, frp.notifications.type.ERROR, 5);
// 	}
//    } 
// }


// Commands['windows'] = { 
//    description: 'Kontrola motora vozila',
//    call: (player: PlayerMp) => { 
// 		// todo
//    } 
// }
