

const player = mp.players.local;
let browser = null, opened = false, bank = null;

const banks = { 
   506770882: 'fleeca', 3424098598: 'fleeca',
   3168729781: 'maze', 2930269768: 'maze'
}

mp.events.add({
   'client:player.banking': async () => { 
      if (opened) { 
         browser.destroy();
         opened = false;
         setTimeout(() => { mp.gui.cursor.show(false, false); }, 100);
      } else { 
         let account = await mp.events.callRemoteProc('server:player.banking');
         account = JSON.parse(account)
         browser = mp.browsers.new('package://player/banking-interface/atm.html');
         browser.execute(`atm.bank = \"${banks[bank]}\", atm.player.money = ${player.money}, atm.player.balance = ${account.balance}, atm.player.name = \"${player.name}\";`);
         browser.execute(`atm.player.paycheck = ${account.paycheck}, atm.player.savings = ${account.savings};`)
         browser.execute(`atm.player.pin = ${account.pin}, atm.player.number = \"${account.number}\";`)
         opened = true;
         setTimeout(() => { mp.gui.cursor.show(true, true); }, 100);
      }
   },

   'client:player.banking.withdraw': (bank, value) => { mp.events.callRemote('server:player.banking.withdraw', bank, value); },

   'client:player.banking.deposit': (bank, value) => { mp.events.callRemote('server:player.banking.deposit', bank, value); },

   'client:player.banking.payday': (bank, value) => { mp.events.callRemote('server:player.banking.payday', bank, value); },

   'client:player.banking.transfer': async (bank, target, value) => { 
      let transfer = await mp.events.callRemoteProc('server:player.banking.transfer', bank, target, value);
      transfer == true ? browser.execute(`atm.notify('Transakcija uspešna !')`) : browser.execute(`atm.notify('Transakcija nije uspešna, korisnik nije pronadjen !')`) 
   } 
})


mp.keys.bind(0x59, false, function() {
   if (player.logged && player.spawned) { 
      if (player.vehicle || player.cuffed || mp.players.local.isTypingInTextChat) return;
      if (isNearBank()) { mp.events.call('client:player.banking') }
   }
});

function isNearBank () { 
   let atm_1 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1, 3424098598, false, true, true);
   let atm_2 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1, 3168729781, false, true, true);
   let atm_3 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1, 2930269768, false, true, true);
   let atm_4 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1, 506770882, false, true, true);
   if (atm_1) { bank = 3424098598; return true; }
   else if (atm_2) { bank = 3168729781; return true; } 
   else if (atm_3) { bank = 2930269768; return true; } 
   else if (atm_4) { bank = 506770882; return true; }
   else { return false; }
}