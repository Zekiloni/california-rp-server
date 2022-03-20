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

function transfer (target: number, amount: number) {
   return mp.events.callRemoteProc('SERVER::BANK:TRANSFER', target, amount);
}

function requestCreditCard () {
   mp.events.callRemote('SERVER::BANK:GET_CREDIT_CARD')
}

mp.events.add('CLIENT::BANKING:MENU', openBanking);
mp.events.add('CLIENT::BANK:CREATE_CARD', requestCreditCard)
mp.events.addProc('CLIENT::BANK:WITHDRAW', withdraw);
mp.events.addProc('CLIENT::BANK:DEPOSIT', deposit);
mp.events.addProc('CLIENT::BANK:TRANSFER', transfer);
