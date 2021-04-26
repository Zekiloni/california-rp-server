
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
   }

})


function cuff (entity, toggle) { 
   if (toggle) { 
      entity.setEnableHandcuffs(true);
      mp.game.invoke("0xDF1AF8B5D56542FA", entity, true);
      entity.cuffed = true;
      mp.gui.chat.push('turio sam')
   }
   else {
      entity.setEnableHandcuffs(false);
      mp.game.invoke("0xDF1AF8B5D56542FA", entity, false);
      entity.cuffed = false;
      mp.gui.chat.push('mako sam')
   }
}


