
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

   'client:player.cuff': (player, toggle) => { 
      mp.gui.chat.push(player.name + ' lisice ' + JSON.stringify(toggle))
      cuff(player, toggle);
   }

})


function cuff (player, toggle) { 
   if (toggle) { 
      player.setEnableHandcuffs(true);
      mp.game.invoke("0xDF1AF8B5D56542FA", player, true);
      player.cuffed = true;
      mp.gui.chat.push('turio sam')
   }
   else {
      player.setEnableHandcuffs(false);
      mp.game.invoke("0xDF1AF8B5D56542FA", player, false);
      player.cuffed = false;
      mp.gui.chat.push('mako sam')
   }
}


