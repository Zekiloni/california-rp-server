

const Player = mp.players.local;

mp.events.addDataHandler({
   'roadblock': (entity, value, oldValue) => {
      entity.roadblock = value;
   }
});

mp.events.add({
   'entityStreamIn': (entity) => {
      mp.gui.chat.push('rb 1')
      mp.gui.chat.push('varijabla ' + JSON.stringify(entity.roadblock))
      if (entity.roadblock) {
         mp.gui.chat.push('rb je')
         entity.setPhysicsParams(17.5, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0);
         entity.setActivatePhysicsAsSoonAsItIsUnfrozen(true);
      }
   }
});