
const player = mp.players.local;
var vehiclesCEF, weaponCEF, equipCEF;


mp.events.addDataHandler({
   'cuffed': (entity, newValue, oldValue) => {
      if (entity.type === 'player') {
         if (newValue !== oldValue) { 
            cuff(entity, newValue);
         }
      }
   },

   'callsign': (entity, newValue, oldValue) => {
      if (entity.type === 'vehicle') {
         if (newValue !== oldValue) { 
            entity.callsign = newValue;
            mp.gui.chat.push('ima callsign ' + newValue)
         }
      }
   }
});


mp.events.add({

   'entityStreamIn': (entity) => {
      if (entity.type === 'player') cuff(entity, entity.getVariable('cuffed'));

      if (entity.type === 'vehicle') { 
         if (entity.getVariable('callsign')) {
            entity.callsign = entity.getVariable('callsign');
            mp.gui.chat.push('callsign je ' + entity.callsign);
         }
      }
   },

   'client:player.cuff': (entity, toggle) => { 
      cuff(entity, toggle);
   },

   'render': () => { 
      if (player.cuffed) { 
         // DISABLE SPRINT, ATTACK, AIM, JUMP
         mp.game.controls.disableControlAction(0, 24, true);
         mp.game.controls.disableControlAction(0, 25, true);
         mp.game.controls.disableControlAction(0, 21, true);
         mp.game.controls.disableControlAction(0, 55, true);
      }

   }
})


function cuff (entity, toggle) { 
   if (toggle) { 
      entity.setEnableHandcuffs(true);
      entity.cuffed = true;

      entity.cuffs = mp.objects.new(mp.game.joaat('p_cs_cuffs_02_s'), entity.position, {
         rotation: new mp.Vector3(0, 0, 0),
         alpha: 255,
         dimension: entity.dimension
      });

      entity.cuffs.notifyStreaming = true;
      waitEntity(entity.cuffs).then(() => {
         let bone = mp.players.local.getBoneIndex(6286);
         entity.cuffs.attachTo(entity.handle, bone, -0.02, 0.06, 0.0, 75.0, 0.0, 76.0, true, true, false, false, 0, true);
      })

   }
   else {
      entity.setEnableHandcuffs(false);
      entity.cuffed = false;
      if (entity.cuffs) { 
         if (entity.cuffs.doesExist()) { 
            entity.cuffs.destroy();
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


