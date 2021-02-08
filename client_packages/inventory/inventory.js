
const player = mp.players.local;
var inventoryCEF, opened = false, nearbyPlayers = [];


mp.events.add({
   'client:openInventory': (inventory) => {
      var items = JSON.stringify(inventory)
      inventoryCEF = mp.browsers.new('package://inventory/inventory-interface/inventory.html');

      mp.players.forEach(p => {
         nearbyPlayers.push({id: p.id, name: p.name})
      }); 
      var nearPlayers = JSON.stringify(nearbyPlayers)
      inventoryCEF.execute(`nearPlayers(${nearPlayers});`)
      inventoryCEF.execute(`populateInventory(${items});`); 
      setTimeout(() => { mp.gui.cursor.show(true, true); }, 100);
      opened = true;
  },

  'client:closeInventory': () => {
      inventoryCEF.destroy();
      setTimeout(() => { mp.gui.cursor.show(false, false); }, 100);
  },

  'client:processInventoryItem': (item, status) => { 
      mp.events.callRemote('server:processInventoryItem', item, status);
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

