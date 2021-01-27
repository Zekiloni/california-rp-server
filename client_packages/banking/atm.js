const player = mp.players.local;
var atmCEF;

mp.events.add({
   'client:showATM': () => {
      player.freezePosition(true);
      atmCEF = mp.browsers.new('package://banking/atm-interface/atm.html');
      setTimeout(() => { mp.gui.cursor.show(true, true); }, 500);
  },

  'client:hideATM': () => {
      atmCEF.destroy();
      player.freezePosition(false);
      setTimeout(() => { mp.gui.cursor.show(false, false); }, 600);
  },
})


mp.keys.bind(0x45, true, function() {
   mp.gui.chat.push('stsnuo e.');
   if(playerNearATM(player)) { 
      mp.events.call('client:showATM'); 
   }
});

playerNearATM = (player) => {
   var atm = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 2, 3424098598, false, true, true);
	var atm2 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 2, 3168729781, false, true, true);
	var atm3 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 2, 2930269768, false, true, true);
   var atm4 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 2, 506770882, false, true, true);
   if (atm || atm2 || atm3 || atm4) {
      return true;
   }
   else { 
      return false;
   }
}