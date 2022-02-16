import { Browser } from '../../../browser';
import { showBusinessInfo } from '../business.Core';


let active: boolean = false;


mp.events.add(
   {
      'CLIENT::MARKET:MENU': openMarketMenu,
   }
);


function openMarketMenu (business: string) { 
   active = !active;
   Browser.call(active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'marketMenu');
   if (active) {
      showBusinessInfo(false);
      Browser.call('BROWSER::MARKET:MENU', business);
   }
};
