let attachedObjects = [];

mp.events.add('attachObject', attachObject);

mp.events.add('detachObject', function (player) {
   try {
      if (player && mp.players.exists(player)) {
         if (attachedObjects[player.id] != undefined) attachedObjects[player.id].destroy();
         attachedObjects[player.id] = undefined;
      }
   } catch (e) { } 
});

attachObject = (player, jsonData) => { 
   try {
      if (player && mp.players.exists(player)) {
         if (attachedObjects[player.id] != undefined) attachedObjects[player.id].destroy();

         //if (player.getVariable('attachedObject') == null) return;
         //let data = JSON.parse(player.getVariable('attachedObject'));
         let data = JSON.parse(jsonData);
         let boneID = player.getBoneIndex(data.Bone);
         var object = mp.objects.new(data.Model, player.position,
         {
            rotation: new mp.Vector3(0, 0, 0),
            alpha: 255,
            dimension: player.dimension
         });

         waitEntity(object).then(() => {
            object.attachTo(player.handle, boneID, data.PosOffset.x, data.PosOffset.y, data.PosOffset.z, data.RotOffset.x, data.RotOffset.y, data.RotOffset.z, true, true, false, false, 0, true);
            attachedObjects[player.id] = object;
         });
      }

      function waitEntity(entity){
         return new Promise(resolve => {
               let wait = setInterval(() => {
                  if(mp.game.entity.isAnEntity(entity.handle)){
                     clearInterval(wait);
                     resolve();
                  }
               }, 1);
         });
      }
   } catch (e) { } 
}

mp._events.add("playerQuit", (player) => {
   try {
      if (attachedObjects[player.id] != undefined) {
         attachedObjects[player.id].destroy();
         attachedObjects[player.id] = undefined;
      }
   } catch (e) { }
});

mp.events.add('entityStreamIn', function (entity) {
   try {
         if (entity.type === 'player') {
         attachObject(entity);
      }
   } catch (e) { }
});

mp.events.add('entityStreamOut', function (entity) {
   try {
      if (entity.type != 'player') return;
      if (attachedObjects[entity.id] != undefined) {
         attachedObjects[entity.id].destroy();
         attachedObjects[entity.id] = undefined;
      }
   } catch (e) { } 
});

