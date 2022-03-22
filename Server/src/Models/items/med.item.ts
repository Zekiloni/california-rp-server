import { Items } from '../item.model';
import { animations, playerConfig } from '@configs';
import { inventories } from '@models';
import { ItemEnums, notifications } from '@enums';
import { lang } from '@constants';


const medType = [ItemEnums.type.USABLE, ItemEnums.type.MEDIC_KIT]

export class medItem extends Items {
   regeneration: number;
   useTime: number;

   constructor (name: string, model: string, regeneration: number, time: number, weight: number, description: string) {
      super (name, medType, model, weight, description);

      this.regeneration = regeneration;
      this.useTime = time;
   }

   async use (player: PlayerMp, item: inventories) {

      if (player.health > playerConfig.main.healthRegeneration) {
         player.notification(lang.youHaveMoreThanHealth, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      if (player.vehicle) {
         player.notification(lang.cannotInVehicle, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      await item.destroy();

      const animation = { 
         dictionary: animations.medkit.dictionary,
         name: animations.medkit.name,
         time: this.useTime,
         flag: animations.medkit.flag 
      };

      // anim to do...
      // player.setVariable(shared_Data.ANIMATION, animation);

      player.character.setHealth(player, player.health + this.regeneration);
   }
};

new medItem('First Aid', 'sm_prop_smug_crate_s_medical', 80, 6, 0.4, 'Prva pomoć');
