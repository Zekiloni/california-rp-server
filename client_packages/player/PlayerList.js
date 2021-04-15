

const player = mp.players.local;
let listCEF, opened = false, onlinePlayers = [];

mp.events.add({
   'client:players.list': () => {
     if (!opened) { 
         listCEF = mp.browsers.new('package://player/playerlist-interface/player-list.html');
         mp.players.forEach(p => { onlinePlayers.push({id: p.remoteId, name: p.name}); }); 
         listCEF.execute(`onlinePlayers(${JSON.stringify(onlinePlayers)});`); 
         opened = true;
         setTimeout(() => { mp.gui.cursor.show(true, true); }, 200);
      } else { 
         listCEF.destroy();
         opened = false;
         onlinePlayers = [];
         setTimeout(() => { mp.gui.cursor.show(false, false); }, 200);
      }
   }
})

mp.keys.bind(0x50, false, function() {
   if (mp.players.local.isTypingInTextChat) return;
   if (player.logged && player.spawned) { 
      mp.events.call('client:players.list')
   }
});

