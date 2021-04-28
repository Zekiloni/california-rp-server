
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

      mp.vehicles.forEach((vehicle) => { 
         if (vehicle.getVariable('callsign') != null) { 
            let position = vehicle.position;
            callsign(vehicle, vehicle.getVariable('callsign'), position.x, position.y);
         }
      })

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


let resolution;
let scale = 0.35;

callsign = (vehicle, sign, x, y) => {

   let localPos = mp.players.local.position, vehiclePosition = vehicle.position;
   // let dist = mp.game.system.vdist(localPos.x, localPos.y, localPos.z, vehiclePosition.x, vehiclePosition.y, vehiclePosition.z);
   // if (dist > 10) return;

   resolution = mp.game.graphics.getScreenActiveResolution(0, 0);
   y -= scale * (0.005 * (resolution.y / 1080));

   drawCallsign(x, y - 0.075, sign, 255);
}

drawCallsign = (x, y, text, alpha, color = [255, 255, 255]) => {
   mp.game.ui.setTextFont(4);
   mp.game.ui.setTextScale(scale, scale);
   mp.game.ui.setTextColour(color[0], color[1], color[2], alpha);
   mp.game.ui.setTextJustification(0);
   mp.game.invoke("0x2513DFB0FB8400FE");
   mp.game.ui.setTextEntry("STRING");
   mp.game.ui.addTextComponentSubstringPlayerName(text);
   mp.game.ui.drawText(x, y);
}
