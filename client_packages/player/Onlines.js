

const Player = mp.players.local;

let browser = null, opened = false;

mp.events.add({
   'client:players:online': () => {
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://player/game-interface/onlines.html');
         let List = utils.OnlinePlayers();
         browser.execute('onlines.players = ' + JSON.stringify(List));
         Player.BrowserControls(true, true);
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
      }
   }
})

mp.keys.bind(0x50, false, function() {
   if (mp.players.local.isTypingInTextChat) return;
   if (player.logged && player.spawned) { 
      mp.events.call('client:players:online')
   }
});

