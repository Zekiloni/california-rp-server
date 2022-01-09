import { Browser } from '../browser';



let Active:boolean = false;


mp.events.add({
   'client:business.market:menu': (business) => { 
      Active = !Active;
      if (Active) { 
         Browser.call('BROWSER::SHOW', 'Market');
      } else { 
         Browser.call('BROWSER::HIDE', 'Market');
      }
   },

   'client:business.market:buy': (bill, items, business) => { 
      mp.events.call('client:business.market:menu');
      mp.events.callRemote('server:bussines.market:buy', bill, items, business);
   }
});

