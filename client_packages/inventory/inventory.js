
const player = mp.players.local;
var inventoryCEF, opened = false, nearbyPlayers = [];


mp.events.add({
   'client:openInventory': (inventory) => {
      var items = JSON.stringify(inventory)
      inventoryCEF = mp.browsers.new('package://inventory/inventory-interface/inventory.html');

      mp.players.forEachInRange(player.position, 2,
         (p) => {
            if (p.id == player.id) return false; 
            else { 
               nearbyPlayers.push({id: p.id, name: p.name})
            }
         }
      );
      var nearPlayers = JSON.stringify(nearbyPlayers)
      inventoryCEF.execute(`populateNearPlayers(${nearPlayers});`)
      inventoryCEF.execute(`populateInventory(${items});`); 
      setTimeout(() => { mp.gui.cursor.show(true, true); }, 100);
      opened = true;
  },

  'client:closeInventory': () => {
      inventoryCEF.destroy();
      nearbyPlayers = [];
      setTimeout(() => { mp.gui.cursor.show(false, false); }, 100);
  },

  'client:processInventoryItem': (item, status, target = -1, quantity = 1) => { 
      mp.events.callRemote('server:processInventoryItem', item, status, target, quantity);
  },
})

mp.keys.bind(0x49, false, function() {
   if(opened == false) {
      if (mp.players.local.isTypingInTextChat) return;
         mp.events.callRemote('server:getPlayerInventory');
   }
   else { 
      opened = false;
      mp.events.call('client:closeInventory');
   }
});

