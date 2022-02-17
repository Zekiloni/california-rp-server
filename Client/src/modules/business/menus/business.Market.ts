import { Browser } from '../../../browser';
import { toggleBusinesInfo } from '../business.Core';


let active: boolean = false;


mp.events.add(
   {
      'CLIENT::MARKET:MENU': toggleMarketMenu,
      'CLIENT::MARKET:BUY': buyItemFromMarket
   }
);


async function buyItemFromMarket (businesID: number, cart: string) {
   const buyed: boolean = await mp.events.callRemoteProc('SERVER::MARKET:BUY', businesID, cart);
   mp.gui.chat.push('buyed ' + JSON.stringify(buyed))
   if (buyed && active) {
      Browser.call('BROWSER::MARKET:CLEAR_CART');
   }
}


function toggleMarketMenu (busines: string) { 
   active = !active;
   Browser.call(active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'marketMenu');
   if (active) {
      mp.gui.chat.push(JSON.stringify(busines))
      toggleBusinesInfo(false);
      Browser.call('BROWSER::MARKET:MENU', busines);
   }
};
