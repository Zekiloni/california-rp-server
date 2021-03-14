mp.events.add("server:fpsync.update", (player, camPitch, camHeading) => {
   mp.players.call(player.streamedPlayers, "client:fpsync.update", [player.id, camPitch, camHeading]);

});

mp.events.add("server:pointingStop", (player) => {
   player.stopAnimation();
});