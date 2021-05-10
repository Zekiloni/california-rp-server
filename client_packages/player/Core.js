const player = mp.players.local;


// black screen after death
mp.game.gameplay.setFadeOutAfterDeath(false); 

// dont remove weapon when run out from ammo
mp.game.weapon.unequipEmptyWeapons = false;
player.setCanSwitchWeapon(false);

mp.events.addDataHandler({
   'logged': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === player.remoteId && newValue !== oldValue) {
         player.logged = newValue;
      }
   },

   'spawned': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === player.remoteId && newValue !== oldValue) {
         player.spawned = newValue;
      }
   },

   'money': (entity, newCash, oldCash) => {
      if (entity && entity.remoteId === player.remoteId && newCash !== oldCash) {
         player.money = newCash;
      }
   },

   'job': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === player.remoteId && newValue !== oldValue) {
         player.job = newValue;
      }
   }
});

mp.events.add({
   
   'client:player.freeze': (toggle) => {
      player.freezePosition(toggle);
   },

   'client:createCheckpoint': (posX, posY, posZ) => {
      mp.checkpoints.new(1, new mp.Vector3(posX, posY, posZ), 10,
      {
         direction: new mp.Vector3(posX, posY, posZ),
         color: [ 255, 255, 255, 255 ],
         visible: true,
         dimension: player.dimension
      });
   },

   'client:player.rotate': (value) => {
      player.setHeading(value);
   },

   'client:screenEffect': (effect, duration) => {
      mp.game.graphics.startScreenEffect(effect, parseInt(duration), false);
   }
});