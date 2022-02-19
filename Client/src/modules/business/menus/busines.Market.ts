import { Browser } from '../../../browser';
import { toggleBusinesInfo } from '../business.Core';


let active: boolean = false;


const openMarketMenu = (info: string) => {
   active = !active;
   Browser.call(active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'marketMenu');
   if (active) {
      mp.gui.chat.push(JSON.stringify(info))
      toggleBusinesInfo(false);
      Browser.call('BROWSER::MARKET:MENU', info);
   }
}


const buyMarketItem = async (businesID: number, cart: string) => {
   const buyed: boolean = await mp.events.callRemoteProc('SERVER::MARKET:BUY', businesID, cart);
   if (buyed && active) {
      Browser.call('BROWSER::MARKET:CLEAR_CART');
   }
}


mp.events.add('CLIENT::MARKET:MENU', openMarketMenu);
mp.events.add('CLIENT::MARKET:BUY', buyMarketItem);



