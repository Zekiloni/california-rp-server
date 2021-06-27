

const Player = mp.players.local;


mp.events.addDataHandler({
   'Cuffed': (entity, newValue, oldValue) => {
      if (entity.type === 'player') {
         if (newValue !== oldValue) { 
            Cuff(entity, newValue);
         }
      }
   }
});


mp.events.add({
   'entityStreamIn': (entity) => {
      if (entity.type === 'player') Cuff(entity, entity.getVariable('cuffed'));

   },

   'render': () => { 
      if (Player.Cuffed) { 
         // DISABLE SPRINT, ATTACK, AIM, JUMP
         mp.game.controls.disableControlAction(0, 24, true);
         mp.game.controls.disableControlAction(0, 25, true);
         mp.game.controls.disableControlAction(0, 21, true);
         mp.game.controls.disableControlAction(0, 55, true);
      }
   },

   'client:player:cuff': (entity, toggle) => { 
      Cuff(entity, toggle);
   }

});


function Cuff (entity, toggle) { 
   if (toggle) { 
      entity.setEnableHandcuffs(true);
      entity.Cuffed = true;

      entity.cuffs = mp.objects.new(mp.game.joaat('p_cs_cuffs_02_s'), entity.position, {
         rotation: new mp.Vector3(0, 0, 0),
         alpha: 255,
         dimension: entity.dimension
      });

      entity.cuffs.notifyStreaming = true;
      utils.WaitEntity(entity.cuffs).then(() => {
         let bone = mp.players.local.getBoneIndex(6286);
         entity.cuffs.attachTo(entity.handle, bone, -0.02, 0.06, 0.0, 75.0, 0.0, 76.0, true, true, false, false, 0, true);
      })

   }
   else {
      entity.setEnableHandcuffs(false);
      entity.Cuffed = false;
      if (entity.cuffs) { 
         if (entity.cuffs.doesExist()) { 
            entity.cuffs.destroy();
         }
      }
   }
}
