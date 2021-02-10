

const player = mp.players.local;
var playerListCEF, opened = false, onlines = [];

mp.events.addDataHandler({
   'loggedIn': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === player.remoteId && newValue !== oldValue) {
         player.loggedIn = newValue;
      }
   },
});


mp.events.add({
   'client:openPlayerList': () => {
      playerListCEF = mp.browsers.new('package://player-list/playerlist-interface/player-list.html');
      mp.players.forEach(p => {
         onlines.push({id: p.remoteId, name: p.name})
      }); 

      var plays = JSON.stringify(onlines)
      playerListCEF.execute(`onlinePlayers(${plays});`); 
      setTimeout(() => { mp.gui.cursor.show(true, true); }, 200);
  },

  'client:hidePlayerList': () => {
      playerListCEF.destroy();
      onlines = [];
      setTimeout(() => { mp.gui.cursor.show(false, false); }, 200);
  },
})

mp.keys.bind(0x50, false, function() {
   if (!player.loggedIn) return false;

   if(opened == false) {
      if (mp.players.local.isTypingInTextChat) return;
      mp.events.call('client:openPlayerList')
      opened = true;
   }
   else { 
      opened = false;
      mp.events.call('client:hidePlayerList');
   }
});

