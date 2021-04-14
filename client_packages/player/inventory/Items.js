
const player = mp.players.local;
let inventory, opened = false, nearbyPlayers = [];


mp.events.add({
   'client:inventory.toggle': (toggle, items = 0) => {
      if (toggle) { 
         items = JSON.stringify(items)
         mp.game.graphics.transitionToBlurred(500);
         inventory = mp.browsers.new('package://player/inventory/inventory-interface/inventory.html');
         inventory.execute(`inventory.player.items = ${items}`)
         opened = true;
         setTimeout(() => { mp.gui.cursor.show(true, true); }, 100);
      } else { 
         mp.game.graphics.transitionFromBlurred(300);
         setTimeout(() => { mp.gui.cursor.show(false, false); }, 100);
         inventory.destroy();
         opened = false;
      }
  },

  'client:inventory.process.item': (action, item, target = -1, quantity = 1) => { 
      switch(action) { 
         case 'drop': mp.events.callRemote('server:item.drop', item, quantity); break;
         case 'use': mp.events.callRemote('server:item.use', item); break;
      }
  },

  'entityStreamIn': (entity) => {
      if (entity.type === 'object') {
         if (entity.item) { 
         }
      }
  }
})

mp.keys.bind(0x49, false, function() {
   if (player.logged && player.spawned) { 
      if (!opened) {
         if (mp.players.local.isTypingInTextChat) return;
         mp.events.callRemote('server:inventory.get');
      } else { 
         mp.events.call('client:inventory.toggle', false);
      }
   }
});

mp.keys.bind(0x59, false, function() {
   if (player.logged && player.spawned) { 
      mp.events.callRemote('server:item.pickup');
   }
});
