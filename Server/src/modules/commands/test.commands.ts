import { animations } from "@configs";
import { Lang, cmds } from "@constants";
import { notifications } from "@enums";
import { Commands } from "../commands";
import { shared_Data } from "@shared";
import { Items } from "@models";


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

Commands['ring'] = {
   description: 'ring',
   call (player: PlayerMp, targetSearch: string) {
      const target = mp.players.find(targetSearch);

      if (!target) {
         return;
      }

      target.setVariable(shared_Data.PHONE_CALL, [true, 324252, false]);
   } 
};


Commands['nigger'] = {
   description: '',
   call (player: PlayerMp) {
      let shootingItems = [];
      
      for (const i in Items.list) {
         const item = Items.list[i];

         if (item.model) {
            shootingItems.push( { name: i, model: item.model } );
         }
      }

      player.call('MIDNIGHT:ITEM+PHOTOSHOOTING', [shootingItems]);
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
         player.notification(Lang.userNotFound, notifications.type.ERROR, notifications.time.MED);
         return;
      }
      console.log(2)


      if (target.dist(player.position) > 3) {
         player.notification(Lang.playerNotNear, notifications.type.ERROR, notifications.time.MED);
         return;
      }
      console.log(3)

      const nearest = mp.objects.getClosest(player.position);
      if (!nearest || nearest!.getVariable(shared_Data.ITEM).name != 'First Aid') {
         player.notification(Lang.noFirstAidNearby, notifications.type.ERROR, notifications.time.MED)
         return;
      }
      console.log(4)

      if (player.dist(nearest.position) > 2.5) {
         player.notification(Lang.aidKitMustBeNear, notifications.type.ERROR, notifications.time.MED)
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