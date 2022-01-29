function minuteCheck() {
   
   const today = new Date();
   if (!serverConfig.freezeTime) {
      mp.world.time.set(today.getHours(), today.getMinutes(), today.getSeconds());
   }

   mp.players.forEach((player: PlayerMp) => {
      if (player.character) {
         updatePlayer(player);
      }
   });
   
   setTimeout(minuteCheck, interval);

};


minuteCheck();