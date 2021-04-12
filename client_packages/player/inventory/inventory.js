
const player = mp.players.local;
let inventoryCEF, opened = false, nearbyPlayers = [];


mp.events.add({
   'client:inventory.toggle': (toggle, items = 0) => {
      if (toggle) { 
         if (items.length > 0) items = JSON.stringify(items)
         mp.game.graphics.transitionToBlurred(500);
         inventory = mp.browsers.new('package://player/inventory/inventory-interface/inventory.html');
         inventory.execute(`inventory.player = ${items};`)
         opened = true;
         setTimeout(() => { mp.gui.cursor.show(true, true); }, 100);
      } else { 
         mp.game.graphics.transitionFromBlurred(300);
         setTimeout(() => { mp.gui.cursor.show(false, false); }, 100);
         inventory.destroy();
         opened = false;
      }
  },

  'client:inventory.item': (item, status, target = -1, quantity = 1) => { 
      mp.events.callRemote('server:processInventoryItem', item, status, target, quantity);
  }
})

mp.keys.bind(0x49, false, function() {
   if (!player.logged) return;
   if (!player.spawned) return;
   if (!opened) {
      if (mp.players.local.isTypingInTextChat) return;
      mp.events.callRemote('server:inventory.get');
   } else { 
      mp.events.call('client:inventory.toggle', false);
   }
});

