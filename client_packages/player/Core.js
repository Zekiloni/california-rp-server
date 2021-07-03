
const Player = mp.players.local;


// BLACK SCREEN AFTER DEATH
mp.game.gameplay.setFadeOutAfterDeath(false); 


// DONT REMOVE WEAPON WHEN OUT OF AMMO
mp.game.weapon.unequipEmptyWeapons = false;
Player.setCanSwitchWeapon(false);


mp.events.addDataHandler({
   'logged': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === Player.remoteId) {
         Player.logged = newValue;
      }
   },

   'spawned': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === Player.remoteId) {
         Player.spawned = newValue;
      }
   },

   'Money': (entity, newCash, oldCash) => {
      if (entity && entity.remoteId === Player.remoteId) {
         Player.Money = newCash;
      }
   },

   'Job': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === Player.remoteId) {
         Player.Job = newValue;
      }
   },

   'Seatbelt': (entity, newValue, oldValue) => { 
      if (entity && entity.remoteId === Player.remoteId) { 
         Player.Seatbelt = newValue;
      }
   },

   'Duty': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === Player.remoteId) {
         Player.Duty = newValue;
      }
   },

   'Bubble': (entity, newValue, oldValue) => {
      if (entity && entity.remoteId === Player.remoteId && newValue != oldValue) {
         Player.Bubble = newValue;
         mp.gui.chat.push(JSON.stringify(Player.Bubble));
      }
   },

   'Interaction': (entity, newValue, oldValue) => {
      if (entity && entity.type == 'player') {
         if (newValue !== oldValue) { 
            Interaction(entity, newValue);
         }
      }
   }
});




mp.events.add({

   'entityStreamIn': (entity) => { 
      if (entity.type === 'player') Interaction(entity, entity.getVariable('Interaction'));

   },

   'client:player:freeze': (toggle) => {
      Player.freezePosition(toggle);
   },

   'client:player:rotate': (value) => {
      Player.setHeading(value);
   },
});



function Interaction (entity, value) { 
      
   if (value) { 
      try { 
         mp.gui.chat.push(JSON.stringify(value.Model));
         mp.gui.chat.push(JSON.stringify(value.Offset));
         mp.gui.chat.push(JSON.stringify(value.Bone));
   
         entity.Attachment = mp.objects.new(mp.game.joaat(value.Model), entity.position, {
            rotation: entity.rotation,
            alpha: 255,
            dimension: entity.dimension
         });
   
         entity.Attachment.notifyStreaming = true;
         utils.WaitEntity(entity.Attachment).then(() => {
            const Bone = entity.getBoneIndex(value.Bone);
            entity.Attachment.attachTo(entity.handle, Bone, value.Offset.X, value.Offset.Y, value.Offset.Z, value.Offset.rX, value.Offset.rY, value.Offset.rZ, true, true, false, false, 0, true);
         })
      } catch (e) { 
         JSON.stringify(e);
      }
   }
   else {
      // if (entity.Attachment) { 
      //    if (entity.Attachment.doesExist()) { 
      //       entity.Attachment.destroy();
      //    }
      // }
   }
}



