import { animations } from "@configs";
import { lang, cmds } from "@constants";
import { notifications } from "@enums";
import { Commands } from "../commands";
import { shared_Data } from "@shared";


Commands['uniform'] = {
   description: 'uniforma',
   call (player: PlayerMp) {
      player.setClothes(7, 126, 0, 2);
      player.setClothes(4, 96, 0, 2);
      player.setClothes(11, 250, 0, 2);
      player.setClothes(3, 0, 0, 2);
      player.setClothes(8, 15, 0, 2);
      player.setClothes(6, 25, 0, 2);

   }
}

Commands['of1'] = {
   description: 'uniforma',
   call (player: PlayerMp) {
      player.setClothes(11, 97, 0, 2);
      player.setClothes(8, 15, 0, 2);
      player.setClothes(4, 47, 0, 2);
      player.setClothes(6, 31, 0, 2);
   }
}

Commands['of2'] = {
   description: 'uniforma',
   call (player: PlayerMp) {
      player.setClothes(11, 143, 0, 2);
      player.setClothes(8, 15, 0, 2);
      player.setClothes(4, 55, 0, 2);
      player.setClothes(6, 48, 0, 2);
   }
}


Commands['firstaid'] = {
   description: 'Davanje prve pomoći.',
   params: [
      cmds.params.PLAYER
   ],
   call (player: PlayerMp, targetSearch: string) {
      const target = mp.players.find(targetSearch);

      if (!target) { 
         player.sendNotification(lang.userNotFound, notifications.type.ERROR, notifications.time.MED);
         return;
      }
      console.log(2)


      if (target.dist(player.position) > 3) {
         player.sendNotification(lang.playerNotNear, notifications.type.ERROR, notifications.time.MED);
         return;
      }
      console.log(3)

      const nearest = mp.objects.getClosest(player.position);
      if (!nearest || nearest!.getVariable(shared_Data.ITEM).name != 'First Aid') {
         player.sendNotification(lang.noFirstAidNearby, notifications.type.ERROR, notifications.time.MED)
         return;
      }
      console.log(4)

      if (player.dist(nearest.position) > 2.5) {
         player.sendNotification(lang.aidKitMustBeNear, notifications.type.ERROR, notifications.time.MED)
         return;
      }

      console.log(5)

      player.setVariable(shared_Data.ANIMATION, animations.paramedic);
      console.log(6)

      setTimeout(() => {
         console.log(7)
         target.character.respawn(target, false);
         player.stopAnimation();
      }, 15000);
   }
}