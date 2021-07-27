import { Browser } from "../Browser";
import { Controls } from "../Utils";
export { };

const Player = mp.players.local;
let Active = false;
let Bank: any = null;

const banks = {
   506770882: 'fleeca', 3424098598: 'fleeca',
   3168729781: 'maze', 2930269768: 'maze'
}

enum BankingOperation {
   Withdraw, Deposit, Transfer, PayCheck
}

mp.events.add({
   'CLIENT::BANKING': async () => {
      Active = !Active;
      Browser.call(Active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'Banking');
      // if (opened) { 
      //    browser.destroy();
      //    opened = false;
      //    setTimeout(() => { mp.gui.cursor.show(false, false); }, 100);
      // } else { 
      //    let account = await mp.events.callRemoteProc('server:player.banking');
      //    account = JSON.parse(account)
      //    browser = mp.browsers.new('package://player/banking-interface/atm.html');
      //    browser.execute(`atm.bank = \"${banks[bank]}\", atm.player.money = ${player.money}, atm.player.balance = ${account.balance}, atm.player.name = \"${player.name}\";`);
      //    browser.execute(`atm.player.paycheck = ${account.paycheck}, atm.player.savings = ${account.savings};`)
      //    browser.execute(`atm.player.pin = ${account.pin}, atm.player.number = \"${account.number}\";`)
      //    opened = true;
      //    setTimeout(() => { mp.gui.cursor.show(true, true); }, 100);
      // }
   },

   'CLIENT::BANKING:ACTION': (Bank: number, Value: number, Action: BankingOperation, Target: any = null) => {
      Target == null ? mp.events.callRemote('SERVER::BANKING:ACTION', Bank, Value, Action) : mp.events.callRemote('SERVER::BANKING:ACTION', Bank, Value, Action, Target); 
   },

   // 'client:player.banking.transfer': async (bank, target, value) => {
   //    let transfer = await mp.events.callRemoteProc('server:player.banking.transfer', bank, target, value);
   //    transfer == true ? browser.execute(`atm.notify('Transakcija uspešna !')`) : browser.execute(`atm.notify('Transakcija nije uspešna, korisnik nije pronadjen !')`)
   // }
})


mp.keys.bind(Controls.KEY_Y, false, function () {
   if (!Player.Logged || Player.vehicle || Player.Cuffed || mp.players.local.isTypingInTextChat) return;
   if (IsNearBank()) { mp.events.call('CLIENT::BANKING') }
});

function IsNearBank() {
   let atm_1 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1, 3424098598, false, true, true);
   let atm_2 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1, 3168729781, false, true, true);
   let atm_3 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1, 2930269768, false, true, true);
   let atm_4 = mp.game.object.getClosestObjectOfType(player.position.x, player.position.y, player.position.z, 1, 506770882, false, true, true);
   if (atm_1) { Bank = 3424098598; return true; }
   else if (atm_2) { Bank = 3168729781; return true; }
   else if (atm_3) { Bank = 2930269768; return true; }
   else if (atm_4) { Bank = 506770882; return true; }
   else { return false; }
}