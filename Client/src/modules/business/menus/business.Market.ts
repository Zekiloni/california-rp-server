import { Browser } from '../../../browser';
import { toggleBusinesInfo } from '../business.Core';


let active: boolean = false;


mp.events.add(
   {
      'CLIENT::MARKET:MENU': toggleMarketMenu,
      'CLIENT::MARKET:BUY': buyMarketItem
   }
);


function buyMarketItem (bid: number, item: string) {
   mp.events.callRemote('SERVER::MARKET:BUY', bid, item);
}


function toggleMarketMenu (business: string) { 
   active = !active;
   Browser.call(active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'marketMenu');
   if (active) {
      toggleBusinesInfo(false);
      Browser.call('BROWSER::MARKET:MENU', business);
   }
};
