
const player = mp.players.local;
var inventoryCEF, opened = false;


mp.events.add({
   'client:openInventory': () => {
      inventoryCEF = mp.browsers.new('package://inventory/inventory-interface/inventory.html');
      setTimeout(() => { mp.gui.cursor.show(true, true); }, 500);
  },

  'client:closeInventory': () => {
      inventoryCEF.destroy();
      setTimeout(() => { mp.gui.cursor.show(false, false); }, 600);
  },
})


// inventory opening on and closing if opened I
mp.keys.bind(0x49, false, function() {
   if(player.loggedIn) { 
      if(opened == false) {
         if (mp.players.local.isTypingInTextChat) return;
            opened = true;
            mp.events.call('client:openInventory');
      }
      else { 
         opened = false;
         mp.events.call('client:closeInventory');
      }
   }
});

