
var player =  mp.players.local, interactionsCEF, opened = false;

mp.events.add({
   'client:showInteractions': () => {
      interactionsCEF = mp.browsers.new('package://interactions-menu/interactions-interface/interact.html');
      setTimeout(() => { mp.gui.cursor.show(true, true); }, 500);
   },

   'client:hideInteractions': () => {
      interactionsCEF.destroy();
      setTimeout(() => { mp.gui.cursor.show(false, false); }, 600);
   },
})


mp.keys.bind(0x4D, false, function() {
   if(opened == false) {
      if (mp.players.local.isTypingInTextChat) return;
      opened = true;
      mp.events.call('client:showInteractions');
   }
   else { 
      opened = false;
      mp.events.call('client:hideInteractions');
   }
});
