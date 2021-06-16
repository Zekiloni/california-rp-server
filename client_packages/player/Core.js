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
         player.Money = newCash;
      }
   },

   'Job': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === player.remoteId) {
         player.Job = newValue;
      }
   },

   'Seatbelt': (entity, newValue, oldValue) => { 
      if (entity && entity.remoteId === player.remoteId) { 
         player.Seatbelt = newValue;
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
         mp.gui.chat.push(JSON.stringify(player.Bubble));
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

   'odeca_lista': () => {
      ClothingMenu();
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


function ClothingMenu () { 
   let list = {
      0: { variations: {} }, 1: { variations: {} }, 2: { variations: {} },
      3: { variations: {} }, 4: { variations: {} }, 5: { variations: {} },
      6: { variations: {} }, 7: { variations: {} }, 8: { variations: {} },
      9: { variations: {} }, 10: { variations: {} }, 11: { variations: {} }
   };
   for (const i in list) { 
      mp.gui.chat.push(i);
      const MaxVariations = player.getNumberOfDrawableVariations(parseInt(i));
      for (let v = 0; v < MaxVariations; v ++) { 
         list[i].variations[v] = { textures: {} }; 
         for (let t = 0; t < 16; t ++) { 
            list[i].variations[v].textures[t] = 'aa';
            // player.isComponentVariationValid(parseInt(i), v, t);
         }
      }
   }

   // mp.events.callRemote('posalji_odecu', JSON.stringify(list));
   mp.gui.chat.push(JSON.stringify(list));
   
}