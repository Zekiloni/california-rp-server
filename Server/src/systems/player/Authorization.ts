import { Bans } from "@models";

function playerReady (player: PlayerMp) {
   player.dimension = player.id + 1;

   Bans.findOne({ where: { ip: player.ip, social: player.socialClub, hardware: player.serial } }).then(banned => {
      if (banned) {
         player.kick(banned.reason);
      }

      player.call('showPlayerAuthorization', [true]);
   });
}

mp.events.add('playerReady', playerReady);