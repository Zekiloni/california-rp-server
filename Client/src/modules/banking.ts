import { Browser } from '../browser';


let bankingMenu: boolean = false;


function openBanking (info?: string) {

   bankingMenu = !bankingMenu
   Browser.call(bankingMenu ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'banking');

   mp.gui.chat.push('info')

   if (bankingMenu && info) { 
      Browser.call('BROWSER::BANK', info);
   }
}


mp.events.add('CLIENT::BANKING:MENU', openBanking);
