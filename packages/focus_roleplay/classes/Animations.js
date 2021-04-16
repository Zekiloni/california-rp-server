


mp.events.add({
   'server:player.finger.pointing.update': (player, camPitch, camHeading) => {
      mp.players.call(player.streamedPlayers, 'client:finger.pointing.update', [player.id, camPitch, camHeading]);
   },

   'server:player.finger.pointing.stop': (player) => {
      player.stopAnimation();
   },

   'server:player.crouch': (player) => {
      player.data.crouching = !player.data.crouching;
   },

   'server:player.mood': (player, mood) => { 
      let character = player.getCharacter();
      character.setMood(player, mood);
   },
})