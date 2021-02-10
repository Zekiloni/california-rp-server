const player = mp.players.local;
let eatObject, drinkObject;

mp.events.add({
   
   'client:freezePlayer': (toggle) => {
      player.freezePosition(toggle);
      let toggleString;
      if(toggle)
         toggleString = "Zaledjen si."
      else
         toggleString = "Odledjen si."
      player.call("client:showNotification", toggleString);
   },

   'client:createCheckpoint': (posX, posY, posZ) => {
      mp.checkpoints.new(1, new mp.Vector3(posX, posY, posZ), 10,
      {
         direction: new mp.Vector3(posX, posY, posZ),
         color: [ 255, 255, 255, 255 ],
         visible: true,
         dimension: player.dimension
      });
   },

   'client:playerEating': (object) => { 
      eatObject = mp.objects.new(object, player.position,
      {
         rotation: player.rotation,
         alpha: 250,
         dimension: player.dimension
      });
      eatObject.name = 'eat';
      eatObject.notifyStreaming = true;
   },

   'client:playerDrinking': (object) => { 
      drinkObject = mp.objects.new(object, player.position,
      {
         rotation: player.rotation,
         alpha: 250,
         dimension: player.dimension
      });
      drinkObject.name = 'drink';
      drinkObject.notifyStreaming = true;
   },

   'entityStreamIn': (obj) => { 
      if (obj.name == 'eat') { 
         var bone = mp.players.local.getBoneIndex(6286);
         var position = new mp.Vector3(-0.0, -0.00, 0.01);
         var rotation = new mp.Vector3(20, 0, -15);
         obj.attachTo(player.handle, bone, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, true, false, false, true, 2, false);
         setTimeout(() => { obj.destroy(); }, 7000)
      } 
      else if (obj.name == 'drink') { 
         var bone = mp.players.local.getBoneIndex(6286);
         var position = new mp.Vector3(+0.7, -0.05, 0.01);
         var rotation = new mp.Vector3(-90, 0, -15);
         obj.attachTo(player.handle, bone, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, true, false, false, true, 2, true);
         setTimeout(() => { obj.destroy(); }, 7000)
      }
   }
});