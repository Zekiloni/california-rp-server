const player = mp.players.local;

// L - ZAKLJUCAVANJE // 0x4C
// E - MOTOR VOZILA // 0x45
// I - INVENTORY // 0x49 // in inventory System
// O - LISTA IGRACA // 0x4F // in playerList
// M - INTERAKCIONI MENI // i interactions-menu
// NUM 1 - POKAZIVANJE PRSTOM // 
// NUM 2 - RUKE U VIS

// engines off by default
player.setConfigFlag(429, true);
mp.game.vehicle.defaultEngineBehaviour = false;

mp.keys.bind(0x4C, false, function() {
   if (!player.loggedIn) return false;

});

mp.keys.bind(0x45, false, function() {
   if (!player.loggedIn) return false;
   if (!player.vehicle) return false;
   mp.events.callRemote('server:vehicleEngine', player.vehicle);
});