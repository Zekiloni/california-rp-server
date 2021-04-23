
const player = mp.players.local;
const blockedClasses = [13, 14, 15, 16, 21]; 

mp.game.controls.useDefaultVehicleEntering = true;


mp.events.add({
   'entityStreamIn': (entity) => {
      if (entity.type === "vehicle") {
         if (entity.hasVariable("IndicatorRight")) entity.setIndicatorLights(0, entity.getVariable("IndicatorRight"));
         if (entity.hasVariable("IndicatorLeft")) entity.setIndicatorLights(1, entity.getVariable("IndicatorLeft"));
      }
   },

   'client:player.vehicle': (hud, engine) => { 
      mp.game.vehicle.defaultEngineBehaviour = false;
      player.setConfigFlag(429, true);
      mp.events.call('client:hud.vehicle', hud);
   }
});

mp.events.addDataHandler({
   'IndicatorRight': (entity, value) => {
      if (entity.type === "vehicle") entity.setIndicatorLights(0, (value == null) ? false : value);
   },

   'IndicatorLeft': (entity, value) => {
      if (entity.type === "vehicle") entity.setIndicatorLights(1, (value == null) ? false : value);
   },
});


// left
mp.keys.bind(0x25, false, () => {
   if (!player.logged) return false;
   if (mp.players.local.isTypingInTextChat) return false;
   let vehicle = mp.players.local.vehicle;
   if (vehicle && vehicle.getPedInSeat(-1) == mp.players.local.handle && blockedClasses.indexOf(vehicle.getClass()) == -1) mp.events.callRemote('server:vehicle.indicators', 1);
});

// right
mp.keys.bind(0x27, false, () => {
   if (!player.logged) return false;
   if (mp.players.local.isTypingInTextChat) return false;
   let vehicle = mp.players.local.vehicle;
   if (vehicle && vehicle.getPedInSeat(-1) == mp.players.local.handle && blockedClasses.indexOf(vehicle.getClass()) == -1) mp.events.callRemote('server:vehicle.indicators', 0);
});

