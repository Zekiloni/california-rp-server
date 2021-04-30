

const player = mp.players.local;
let browser = null, opened = false;

const banks = { 
   506770882: 'fleeca',
   3424098598: 'fleeca',
   3168729781: 'maze',
   2930269768: 'maze'
}

mp.events.add({
   'client:player.banking': () => { 
      if (opened) { 
         browser.destroy();
         opened = false;
         setTimeout(() => { mp.gui.cursor.show(false, false); }, 100);
      } else { 
         browser = mp.browsers.new('package://player/banking-interface/atm.html');
         browser.execute(`atm.player.money = ${player.money}`);
         opened = true;
         setTimeout(() => { mp.gui.cursor.show(true, true); }, 100);
      }
   },

   'client:player.banking.withdraw': (value) => { 

   },

   'client:player.banking.deposit': (value) => { 

   },

   'client:player.banking.transfer': (target, value) => { 

   }
})


mp.keys.bind(0x59, false, function() {
   if (player.logged && player.spawned) { 
      if (player.vehicle || player.cuffed) return;
      if (isNearBank()) { mp.events.call('client:player.banking') }
   }
});

function isNearBank () { 
   let logo = null;
   let atm_1 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1, 3424098598, false, true, true);
   let atm_2 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1, 3168729781, false, true, true);
   let atm_3 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1, 2930269768, false, true, true);
   let atm_4 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1, 506770882, false, true, true);
   if (atm_1 || atm_2 || atm_3 || atm_4) { return true; }
   else {  return false; }
}