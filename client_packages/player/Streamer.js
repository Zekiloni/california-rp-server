

const Player = mp.players.local;



mp.events.add({
   'entityStreamIn': (entity) => {

   },

   'client:doors.sync': (model, position, state) => { 
      mp.game.object.doorControl(parseInt(model), position[0], position[1], position[2], state, 0.0, 50.0, 0)
   },

   'client:interior.request.ipl': (ipl) => { 
      mp.game.streaming.requestIpl(ipl);
      // mp.game.invoke("0x41B4893843BBDB74", ipl);
      player.freezePosition(true)
      setTimeout(() => { player.freezePosition(false) }, 1500);
   }
});
