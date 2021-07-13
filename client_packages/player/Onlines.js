

const Player = mp.players.local;

let Browser = null, Opened = false;

const Controls = { 
   keyP: 0x50
};


mp.events.add({
   'client:players:online': () => {
      Opened = !Opened;
      if (Opened) { 
         Browser = mp.browsers.new('package://player/game-interface/onlines.html');
         let List = utils.OnlinePlayers();
         Browser.execute('onlines.players = ' + JSON.stringify(List));
         Player.BrowserControls(true, true);
      } else { 
         if (Browser) Browser.destroy();
         Player.BrowserControls(false, false);
      }
   }
})


mp.keys.bind(Controls.keyP, false, function() {
   if (Player.logged && Player.spawned) {    
      if (Player.isTypingInTextChat) return;
      mp.events.call('client:players:online');
   }
});

