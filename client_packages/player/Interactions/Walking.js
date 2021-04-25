

const player = mp.players.local;

mp.events.addDataHandler('walking_style', (entity, value) => {
   if (entity.type === 'player') setWalkingStyle(entity, value);
});


mp.events.add({
   'entityStreamIn': (entity) => {
      if (entity.type === 'player') setWalkingStyle(entity, entity.getVariable('walking_style'));
   },

   'client:player.walking_style': (style) => {
      mp.events.callRemote('server:player.walking_style', style);
      setMovementClipset(player, style);
   }
});

function setWalkingStyle(entity, walkstyle) {
   try {
      if (walkstyle == null) entity.resetMovementClipset(0.0);
      else entity.setMovementClipset(walkstyle, 0.0);
   } catch (e) { }
}
