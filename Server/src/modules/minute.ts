
import { serverConfig } from '@configs';


function minuteCheck() {
   const now = new Date();

   if (!serverConfig.freezeTime) {
      const hours = now.getHours(), minutes = now.getMinutes(), seconds = now.getSeconds();
      mp.world.time.set(hours, minutes, seconds);
   }

   mp.players.forEach((player: PlayerMp) => {
      if (player.character) {
         player.character.updatePlayer(player);
      }
   });
   
   setTimeout(minuteCheck, 1 * 60 * 1000);
};


minuteCheck();