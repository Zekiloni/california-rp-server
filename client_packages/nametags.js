const player = mp.players.local;
mp.nametags.enabled = false;


mp.events.add('render', (nametags) => {

	mp.players.forEachInRange(player.position, 10,
		(p) => {
			returnVehicles.push(p);
		}
	);
   let nametag = mp.labels.new(text, position, { los: true, font: 1, drawDistance: 10.0, dimension: player.dimension });

});