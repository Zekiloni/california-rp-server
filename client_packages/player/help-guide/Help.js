

const player = mp.players.local;
let browser = null, opened = false;


mp.events.add({
   'client:player.help': (info, commands) => {
      if (opened) { 
         browser.destroy();
         opened = false;
         setTimeout(() => { mp.gui.cursor.show(false, false); }, 100);
      } else { 
         browser = mp.browsers.new('package://player/help-guide/help-interface/help.html');
         opened = true;
         setTimeout(() => { mp.gui.cursor.show(true, true); }, 100);
      }
   }
})