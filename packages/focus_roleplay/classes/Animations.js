


mp.events.add({
   'server:finger.pointing.update': (player, camPitch, camHeading) => {
      mp.players.call(player.streamedPlayers, 'client:finger.pointing.update', [player.id, camPitch, camHeading]);
   },

   'server:finger.pointing.stop': (player) => {
      player.stopAnimation();
   }
})