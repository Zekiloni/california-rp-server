
const player = mp.players.local;

mp.events.addDataHandler({
   'container': (entity, value, oldValue) => {
      if (entity.type === 'player') { player.container = value; }
   },
});

mp.keys.bind(0x62, false, function() {
   if (!player.loggedIn) return false;
   if (!player.vehicle) return false;
   let vehicle = player.vehicle;
   if (vehicle.model == 444583674) {
      if (player.container) { 
         mp.events.callRemote('server:dettachContainer'); 
      } else { 
         mp.events.callRemote('server:checkForContainers'); 
      }  
   }
});


mp.events.add({ 
   'client:syncHandlerContainer': (target, object) => { 
      target.container = mp.objects.new(object, target.position,
      {
         rotation: target.rotation,
         alpha: 255,
         dimension: target.dimension
      });

      target.container.notifyStreaming = true;
      target.container.setNoCollision(player.vehicle.handle, false);


      setTimeout(() => {  
         var position = new mp.Vector3(0.05, -0.02, 0.01);
         target.container.attachTo(target.vehicle.handle, 0, position.x - 0.05, position.y + 6, position.z, 0, 0, 90, true, false, true, false, 2, true);
      }, 500)
   },

   'client:detachHandlerContainer': (target) => { 
      target.container.destroy();
   },
})