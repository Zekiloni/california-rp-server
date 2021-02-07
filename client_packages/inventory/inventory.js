
const player = mp.players.local;
var inventoryCEF, opened = false;


mp.events.add({
   'client:openInventory': (inventory) => {
      var items = JSON.stringify(inventory)
      inventoryCEF = mp.browsers.new('package://inventory/inventory-interface/inventory.html');
      inventoryCEF.execute(`populateInventory(${items});`); 
      setTimeout(() => { mp.gui.cursor.show(true, true); }, 500);
      opened = true;
  },

  'client:closeInventory': () => {
      inventoryCEF.destroy();
      setTimeout(() => { mp.gui.cursor.show(false, false); }, 600);
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

