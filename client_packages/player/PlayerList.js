

const player = mp.players.local;
let listCEF, opened = false, onlinePlayers = [];

mp.events.add({
   'client:players.list': (toggle) => {
      if (toggle) { 
         listCEF = mp.browsers.new('package://player/playerlist-interface/player-list.html');
         mp.players.forEach(p => { onlinePlayers.push({id: p.remoteId, name: p.name}) }); 
         listCEF.execute(`onlinePlayers(${JSON.stringify(onlines)});`); 
         setTimeout(() => { mp.gui.cursor.show(true, true); }, 200);
      } else { 
         listCEF.destroy();
         onlinePlayers = [];
         setTimeout(() => { mp.gui.cursor.show(false, false); }, 200);
      }
   }
})

mp.keys.bind(0x50, false, function() {
   if (!player.logged) return;
   if (!player.spawned) return;
   if (mp.players.local.isTypingInTextChat) return;
   opened == false ? ( mp.events.call('client:players.list', true), opened = true ) : ( mp.events.call('client:players.list', false), opened = false )
});

