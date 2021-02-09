const player = mp.players.local;

mp.keys.bind(0x50, false, function() {
   if (!player.loggedIn) return false;

});