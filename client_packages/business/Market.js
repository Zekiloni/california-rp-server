

const Player = mp.players.local;
let browser = null, opened = false;

mp.events.add({
   'client:business.market:menu': (business) => { 
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://business/business-interfaces/market.html');
         Player.BrowserControls(true, true);
         mp.gui.chat.push(JSON.stringify(business));
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
      }
   },

   'client:business.market:buy': (items) => { 

   }
});

