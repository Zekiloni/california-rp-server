const player = mp.players.local;


// black screen after death
mp.game.gameplay.setFadeOutAfterDeath(false); 

// dont remove weapon when run out from ammo
mp.game.weapon.unequipEmptyWeapons = false;
player.setCanSwitchWeapon(false);

let frontCamera;


mp.events.addDataHandler({
   'logged': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === player.remoteId) {
         player.logged = newValue;
      }
   },

   'spawned': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === player.remoteId) {
         player.spawned = newValue;
      }
   },

   'Money': (entity, newCash, oldCash) => {
      if (entity && entity.remoteId === player.remoteId) {
         player.money = newCash;
      }
   },

   'Job': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === player.remoteId) {
         player.Job = newValue;
      }
   },

   'Duty': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === player.remoteId) {
         player.Duty = newValue;
      }
   },

   'Bubble': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === player.remoteId && newValue != oldValue) {
         player.Bubble = newValue;
      }
   }
});

mp.events.add({
   
   'client:player.freeze': (toggle) => {
      player.freezePosition(toggle);
   },

   'client:player.rotate': (value) => {
      player.setHeading(value);
   },

   'client:screenEffect': (effect, duration) => {
      mp.game.graphics.startScreenEffect(effect, parseInt(duration), false);
   },

   'client:player.camera:inFront': (status) => { 
      if (status) {
         frontCamera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 30);
         let position = player.position;
         frontCamera.setActive(true);
         frontCamera.setCoord(position.x, position.y + 4, position.z);
         frontCamera.pointAtCoord(position.x, position.y, position.z);
         mp.game.cam.renderScriptCams(true, false, 0, true, false);
      } else { 
         let exist = frontCamera.doesExist()
         if (exist)
            frontCamera.destroy();
            mp.game.cam.renderScriptCams(false, false, 0, false, false);
      }
   }
});







function BrowserControls (freezeControls, mouse) {
   mouse ? mp.gui.chat.activate(false) : mp.gui.chat.activate(true);
   // mp.game.invoke('setTypingInChatState', mouse);
   setTimeout(() => { mp.gui.cursor.show(freezeControls, mouse); }, 250);
}

player.BrowserControls = BrowserControls;