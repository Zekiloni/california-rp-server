
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
            rotation: entity.rotation,
            alpha: 255,
            dimension: entity.dimension
      });
      entity.attachTo(cuffs, 6286, -0.02, 0.063, 0.0, 75.0, 0.0, 76.0, true, true, false, true, 0, true); 

   }
   else {
      entity.setEnableHandcuffs(false);
      entity.cuffed = false;
   }
}

/*AttachObjectToPlayer(target, NAPI.Util.GetHashKey("p_cs_cuffs_02_s"), 6286, new Vector3(-0.02f, 0.063f, 0.0f), new Vector3(75.0f, 0.0f, 76.0f));
public static void AttachObjectToPlayer(Player player, uint model, int bone, Vector3 posOffset, Vector3 rotOffset)
        {
            var attObj = new AttachedObject(model, bone, posOffset, rotOffset);
            player.SetSharedData("attachedObject", JsonConvert.SerializeObject(attObj));
            Trigger.ClientEventInRange(player.Position, 550, "attachObject", player);
        } */
