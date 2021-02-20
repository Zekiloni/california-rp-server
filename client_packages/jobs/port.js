
const player = mp.players.local;

mp.keys.bind(0x62, false, function() {
   if (!player.loggedIn) return false;
   if (!player.vehicle) return false;
   let vehicle = player.vehicle;
   mp.gui.chat.push(`${vehicle.model}`)
   if (vehicle.model == 444583674) { mp.events.callRemote('server:checkForContainers'); }
});

mp.events.add({ })