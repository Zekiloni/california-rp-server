
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


/*if(opened == false) {
      if (mp.players.local.isTypingInTextChat) return;
      opened = true;
      mp.events.call('client:showInteractions');
   }
   else { 
      opened = false;
      mp.events.call('client:hideInteractions');
   } */

mp.keys.bind(0x4D, false, function() {
   if (mp.players.local.isTypingInTextChat) return;
   if (!player.data.spawned) return;
   mp.gui.cursor.visible = !mp.gui.cursor.visible;
});

mp.events.add('click', (x, y, upOrDown, leftOrRight) => {
   let pos3d = mp.game.graphics.screen2dToWorld3d([x, y]);
   const camera = mp.cameras.new("gameplay"); // gets the current gameplay camera
   let position = camera.getCoord();

   const end = lerp(position, pos3d, 5);
   const result = mp.raycasting.testPointToPoint(position, end, [mp.players.local]);
 
   console.log(JSON.stringify(result));
});
