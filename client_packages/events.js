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

   'client:playerHandAction': (target, object) => { 
      eatObject = mp.objects.new(object, target.position,
      {
         rotation: target.rotation,
         alpha: 250,
         dimension: target.dimension
      });
      eatObject.notifyStreaming = true;

      setTimeout(() => {  
         var bone = mp.players.local.getBoneIndex(6286);
         var position = new mp.Vector3(0.05, -0.02, 0.01);
         var rotation = new mp.Vector3(20, 0, -15);
         eatObject.attachTo(target.handle, bone, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, true, false, false, true, 2, false);
         setTimeout(() => { eatObject.destroy(); }, 7000)
      }, 300)
   },

   'client:syncDoorsState': (model, x, y, z, state) => { 
      mp.gui.chat.push(`${model}, x ${x}, y ${y}, state ${state}`)
      let posX = parseInt(x),
         posY = parseInt(y),
         posZ = parseInt(z);
      mp.game.object.doorControl(model, posX, posY, posZ, state, 0.0, 50.0, 0)
   },

   'client:screenEffect': (effect, duration) => {
      mp.game.graphics.startScreenEffect(effect, parseInt(duration), false);
   }
});