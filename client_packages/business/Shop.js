

const Player = mp.players.local;
let browser = null, opened = false;

mp.events.add({
   'client:business.market:menu': () => { 
      opened = !opened;
      if (opened1) { 
         browser = mp.browsers.new('package://business/business-interfaces/market.html');
         Player.BrowserControls(true, true);
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
      }
   },

   'client:business.market:buy': (items) => { 

   }
});

