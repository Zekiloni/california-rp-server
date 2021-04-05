const player = mp.players.local;
let eatObject, drinkObject;

mp.events.add({
   
   'client:freezePlayer': (toggle) => {
      player.freezePosition(toggle);
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

   'client:doors.sync': (model, position, state) => { 
      mp.game.object.doorControl(model, position[0], position[1], position[2], state, 0.0, 50.0, 0)
   },

   'client:player.rotate': (value) => {
      player.setHeading(value);
   },

   'client:interior.request.ipl': (ipl) => { 
      mp.game.streaming.requestIpl(ipl);
      // mp.game.invoke("0x41B4893843BBDB74", ipl);
      player.freezePosition(true)
      setTimeout(() => { player.freezePosition(false) }, 1500);
   },

   'client:screenEffect': (effect, duration) => {
      mp.game.graphics.startScreenEffect(effect, parseInt(duration), false);
   }
});