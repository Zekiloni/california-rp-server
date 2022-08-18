import { Bans } from "./s.Ban";

import "./account/s.Account.Manager";
import "./character/s.Character.Manager";


class PlayerManager {

   /**
    * Event triggered when a player has downloaded or loaded every resource packages and is ready to play in your server.
    * @static
    * @param {PlayerMp} player
    * @memberof PlayerManager
    */
   static onPLayerReady (player: PlayerMp) {
       /* we set player another dimension */
      player.dimension = player.id + 1;

      Bans.findOne({ where: { ip: player.ip, social: player.socialClub, hardware: player.serial } }).then(banned => {
         if (banned) {
            player.kick(banned.reason);
         }
   
         player.call('showPlayerAuthorization', [true]);
      });
   }

   
}


mp.events.add('playerReady', PlayerManager.onPLayerReady);