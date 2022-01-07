import { Commands } from '../commands';

Commands['engine'] = { 
   Desc: 'Kontrola motora vozila',
   Vehicle: true,
   Call: (player: PlayerMp, vName: string) => { 
		const Vehicle = player.vehicle, Character = await player.Character();
		Vehicle.engine = !Vehicle.engine;
   } 
}

Commands['seatbelt'] = { 
   Desc: 'Vezanje pojasa',
   Vehicle: true,
   Call: (player: PlayerMp) => { 
		Player.data.Seatbelt = !Player.data.Seatbelt;
		let message = Player.data.Seatbelt ? ' stavlja pojas.' : ' skida pojas.';
		Player.ProximityMessage(frp.Globals.distances.me, '* ' + Player.name + message, frp.Globals.Colors.purple);
   } 
}

Commands['trunk'] = { 
   Desc: 'Opcije gepeka vozila',
   Call: (player: PlayerMp) => { 
		const Vehicle = frp.Vehicles.Nearest(Player.position, 2);
		if (Vehicle && Vehicle.locked) return Player.Notification(frp.Globals.messages.VEHICLE_IS_LOCKED, frp.NotifyType.ERROR, 6);
		if (Vehicle) Vehicle.data.Trunk = !Vehicle.data.Trunk;
   } 
}

Commands['hood'] = { 
   Desc: 'Opcije haube vozila',
   Call: (player: PlayerMp) => { 
		const Vehicle = frp.Vehicles.Nearest(Player.position, 2);
		if (Vehicle && Vehicle.locked) return Player.Notification(frp.Globals.messages.VEHICLE_IS_LOCKED, frp.NotifyType.ERROR, 6);
		if (Vehicle) Vehicle.data.Hood = !Vehicle.data.Hood;
   } 
}

Commands['fill'] = { 
   Desc: 'Opcije haube vozila',
   Call: (player: PlayerMp) => { 
	const NearestStation = await frp.Business.NearestGasStation(Player);
		if (NearestStation) { 
		Player.callProc('client:business.gas:nearpump').then(Pump => { 
		const Info = { 
		Business: { id: NearestStation.id, Name: NearestStation.Name, Multiplier: NearestStation.Products.Fuel.multiplier }
		};
		Player.call('client:business.gas:menu', [Info]);
		}).catch(() => { 
		Player.Notification(frp.Globals.messages.NOT_NEAR_GAS_PUMP, frp.NotifyType.ERROR, 5);
		});
		} else { 
		Player.Notification(frp.Globals.messages.NOT_NEAR_GAS_STATION, frp.NotifyType.ERROR, 5);
	}
   } 
}


Commands['windows'] = { 
   Desc: 'Kontrola motora vozila',
   Call: (player: PlayerMp) => { 
		// todo
   } 
}
