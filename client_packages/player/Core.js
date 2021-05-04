const player = mp.players.local;
let eatObject, drinkObject;


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

   'client:playerHandAction': (target, object) => { 
      eatObject = mp.objects.new(object, target.position,
      {
         rotation: target.rotation,
         alpha: 250,
         dimension: target.dimension
      });
      eatObject.notifyStreaming = true;

      setTimeout(() => {  
         var bone = mp.players.local.getBoneIndex(6286);
         var position = new mp.Vector3(0.05, -0.02, 0.01);
         var rotation = new mp.Vector3(20, 0, -15);
         eatObject.attachTo(target.handle, bone, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, true, false, false, true, 2, false);
         setTimeout(() => { eatObject.destroy(); }, 7000)
      }, 300)
   },

   'client:player.rotate': (value) => {
      player.setHeading(value);
   },


   'client:screenEffect': (effect, duration) => {
      mp.game.graphics.startScreenEffect(effect, parseInt(duration), false);
   }
});