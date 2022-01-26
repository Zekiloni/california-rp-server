import { Browser } from '../../browser';



let Active:boolean = false;


mp.events.add({
   'client:business.market:menu': (business) => { 
      Active = !Active;
      if (Active) { 
         Browser.call('BROWSER::SHOW', 'market');
      } else { 
         Browser.call('BROWSER::HIDE', 'market');
      }
   },

   'client:business.market:buy': (bill, items, business) => { 
      mp.events.call('client:business.market:menu');
      mp.events.callRemote('server:bussines.market:buy', bill, items, business);
   }
});

