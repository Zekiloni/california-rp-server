

const Player = mp.players.local;
let browser = null, opened = false;

mp.events.add({
   'client:business.clothing:menu': (info) => {
      opened = !opened;
      // mp.gui.chat.push(JSON.stringify(info));
      if (opened) { 
         browser = mp.browsers.new('package://business/business-interfaces/clothing.html');
         Player.BrowserControls(true, true);
         utils.PlayerPreviewCamera(true);
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
         utils.PlayerPreviewCamera(false);
      }
   },
      
   'client:business.clothing:model:preview': (x, component, variation) => { 
      // mp.gui.chat.push(JSON.stringify(x) + ' ' + JSON.stringify(component) + ' ' + JSON.stringify(variation));
      Player.setComponentVariation(component, variation, 0, 2);
   },

   'client:business.clothing:texture:preview': (x, component, texture) => { 
      // mp.gui.chat.push(JSON.stringify(x) + ' ' + JSON.stringify(component) + ' ' + JSON.stringify(texture));
      const Variation = Player.getDrawableVariation(component);
      Player.setComponentVariation(component, Variation, texture, 2);
   },
   
   'client:business.clothing:buy': (total, items, biz) => { 
      mp.events.call('client:business.clothing:menu');
      mp.events.callRemote('server:business.clothing:buy', total, items, biz);
   }
})





