

const Player = mp.players.local;

let browser = null, opened = false;

mp.events.add({
   'client:help:show': (help) => { 
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://player/game-interface/help.html');
         const response = 
         Player.BrowserControls(true, true);
         
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
      }
   }
})