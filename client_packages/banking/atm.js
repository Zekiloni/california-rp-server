const player = mp.players.local;
var atmCEF;

mp.events.addDataHandler({
   'bank': (entity, newBank, oldBank) => {
      if (entity && entity.remoteId === player.remoteId && newBank !== oldBank) {
         player.bank = newBank;
      }
   },

   'savings': (entity, newSavings, oldSavings) => {
      if (entity && entity.remoteId === player.remoteId && newSavings !== oldSavings) {
         player.savings = newSavings;
      }
   },

   'credit': (entity, newCredit, oldCredit) => {
      if (entity && entity.remoteId === player.remoteId && newCredit !== oldCredit) {
         player.credit = newCredit;
      }
   }
})


mp.events.add({
   'client:showATM': (name, cash, id) => {
      player.freezePosition(true);
      atmCEF = mp.browsers.new('package://banking/atm-interface/atm.html');
      atmCEF.execute(`playerInfo(\"${name}\", \"${cash}\", \"${id}\", \"${player.savings}\", \"${player.credit}\");`); 
      setTimeout(() => { mp.gui.cursor.show(true, true); }, 500);
  },

  'client:hideATM': () => {
      atmCEF.destroy();
      player.freezePosition(false);
      setTimeout(() => { mp.gui.cursor.show(false, false); }, 600);
  },
})

mp.keys.bind(0x45, true, function() {
   if(playerNearATM(player)) {
      if (mp.players.local.isTypingInTextChat) return; 
      // mp.events.call('client:showATM'); 
      mp.events.callRemote('server:playerBanking');
   }
});

playerNearATM = (player) => {
   var atm_1 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1, 3424098598, false, true, true);
	var atm_2 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1, 3168729781, false, true, true);
	var atm_3 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1, 2930269768, false, true, true);
   var atm_4 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1, 506770882, false, true, true);
   if (atm_1 || atm_2 || atm_3 || atm_4) {
      return true;
   }
   else { 
      return false;
   }
}