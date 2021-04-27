
const player = mp.players.local;
let marker = null;

mp.events.addDataHandler('container', (entity, newValue, oldValue) => {
   if (entity.type === 'vehicle' && entity.model == 444583674) {
      if (newValue !== oldValue) { 
         container(entity, newValue);
      }
   }
});

mp.events.add({
   'entityStreamIn': (entity) => {
      if (entity.type === 'vehicle' && entity.model == 444583674) { 
         if (entity.getVariable('container')) container(entity, entity.getVariable('container'));
      }
   },

   'render': () => { 
      if (player.vehicle && player.vehicle.model == 444583674) { 
         if (player.vehicle.getVariable('container') != false) { 
            // mp.game.controls.disableControlAction(0, 110, true); // DISABLEATI NUM 8 i 5 da kad ima =>
            // mp.game.controls.disableControlAction(27, 111, true); // > kontenjer ne moze da podize i spusta
         }
      }
   }
})

mp.keys.bind(0x59, false, function() {
   if (player.logged && player.spawned) {
      if (player.vehicle && player.vehicle.model == 444583674) { 
         let vehicle = player.vehicle;
         if (vehicle.container) { 
            mp.events.callRemote('server:vehicle.detach.container'); 
            if (marker) marker.destroy();
         } else { 
            mp.events.callRemote('server:vehicle.attach.container'); 
            marker = mp.blips.new(0, new mp.Vector3(1111.625, -3139.361, 0), { name: 'Zona za dostavu kontenjera', color: 49, shortRange: false });
         }
      }
   }
});

function container (vehicle, value) { 
   if (value) { 
      vehicle.container = value;
      vehicle.containerObject = mp.objects.new('prop_container_03a', vehicle.position, { rotation: vehicle.rotation, alpha: 255, dimension: vehicle.dimension });
      vehicle.containerObject.notifyStreaming = true;
      vehicle.containerObject.setNoCollision(vehicle.handle, false);
      waitEntity(vehicle.containerObject).then(() => {
         let position = new mp.Vector3(0.05, -0.02, 0.01);
         vehicle.containerObject.attachTo(vehicle.handle, 0, position.x - 0.05, position.y + 6, position.z, 0, 0, 90, true, false, true, false, 2, true);
      })
   } else { 
      vehicle.container = false;
      if (vehicle.containerObject) { 
         if (vehicle.containerObject.doesExist()) { 
            vehicle.containerObject.destroy();
         }
      }
   }
}

function waitEntity (entity) {
   return new Promise(resolve => {
      let wait = setInterval(() => {
         if (mp.game.entity.isAnEntity(entity.handle)) {
            clearInterval(wait);
            resolve();
         }
      }, 1);
   });
}
