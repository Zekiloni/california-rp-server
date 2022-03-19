import { Browser } from '../../../browser';


let bankingMenu: boolean = false;


function openBanking (info?: string) {
   bankingMenu = !bankingMenu
   Browser.call(bankingMenu ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'banking');

   if (bankingMenu && info) { 
      Browser.call('BROWSER::BANK', info);
   }
}


function withdraw (amount: number) {
   return mp.events.callRemoteProc('SERVER::BANK:WITHDRAW', amount);
}

function deposit (amount: number) {
   return mp.events.callRemoteProc('SERVER::BANK:DEPOSIT', amount);
}

mp.events.add('CLIENT::BANKING:MENU', openBanking);
mp.events.addProc('CLIENT::BANK:WITHDRAW', withdraw);
mp.events.addProc('CLIENT::BANK:DEPOSIT', deposit);
