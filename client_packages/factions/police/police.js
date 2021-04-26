
const player = mp.players.local;
var vehiclesCEF, weaponCEF, equipCEF;


mp.events.addDataHandler('cuffed', (entity, newValue, oldValue) => {
   if (entity.type === 'player') {
      if (newValue !== oldValue) { 
         cuff(entity, newValue);
      }
   }
});

mp.events.add({

   'entityStreamIn': (entity) => {
      if (entity.type === 'player') cuff(entity, entity.getVariable('cuffed'));
   },

   'client:player.cuff': (entity, toggle) => { 
      mp.gui.chat.push(entity.name + ' lisice ' + JSON.stringify(toggle))
      cuff(entity, toggle);
   },

   'render': () => { 
      if (player.cuffed) { 
         // DISABLE SPRINT, ATTACK, AIM, JUMP
         mp.game.controls.disableControlAction(0, 24, true);
         mp.game.controls.disableControlAction(0, 25, true);
         // mp.game.controls.disableControlAction(0, 21, true);
         mp.game.controls.disableControlAction(0, 55, true);
      }
   }

})


function cuff (entity, toggle) { 
   if (toggle) { 
      entity.setEnableHandcuffs(true);
      entity.cuffed = true;

      let cuffs = mp.objects.new(mp.game.joaat('p_cs_cuffs_02_s'), entity.position,
         {
             rotation: rotation,
             alpha: alpha,
             dimension: dimension
         });
      entity.attachTo(entity2, boneIndex, xPosOffset, yPosOffset, zPosOffset, xRot, yRot, zRot, p9, useSoftPinning, collision, isPed, vertexIndex, fixedRot);

   }
   else {
      entity.setEnableHandcuffs(false);
      entity.cuffed = false;
   }
}


