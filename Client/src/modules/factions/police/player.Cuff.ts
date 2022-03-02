import { animationFlags } from '../../../enums/animations.flags';
import { clothingComponents } from '../../../enums/clothing';
import { entityType } from '../../../enums/entity';
import { playAnimation } from '../../player/animation';


const config = {
   accessory: {
      drawable: 41,
      texture: 0
   },
   animation: {
      dictionary: 'mp_arresting',
      name: 'idle',
      flag: 49
   }
}


interface Cuffed { 
   [key: number]: {
      drawable: number
      texture: number
   }
}

let cuffed: Cuffed = {};


const checkMoving = () => {
   const isCuffed = cuffed[mp.players.local.remoteId];

   if (isCuffed) {
      mp.game.controls.disableControlAction(0, RageEnums.Controls.INPUT_ATTACK, true);
      mp.game.controls.disableControlAction(0, RageEnums.Controls.INPUT_AIM, true);
      mp.game.controls.disableControlAction(0, RageEnums.Controls.INPUT_SPRINT, true);
      mp.game.controls.disableControlAction(0, RageEnums.Controls.INPUT_DIVE, true);
   }
}


const cuffStream = (entity: EntityMp) => {
   if (entity.type != entityType.PLAYER) {
      return;
   }

   if (!entity.hasVariable('CUFFED')) {
      return;
   }

   const cuffed = entity.getVariable('CUFFED');

   cuff(entity, cuffed);
}


const cuff = (entity: EntityMp, value: boolean, oldValue?: boolean) => {
   if (entity.type != entityType.PLAYER) {
      return;
   }

   const target = <PlayerMp>entity;

   if (value) { 
      target.setEnableHandcuffs(true);

      playAnimation(target, config.animation.dictionary, config.animation.name, config.animation.flag, -1, false);
      target.setComponentVariation(clothingComponents.ACCESSORIE, config.accessory.drawable, config.accessory.texture, 0);

      cuffed[target.remoteId] = {
         drawable: target.getDrawableVariation(clothingComponents.ACCESSORIE),
         texture: target.getTextureVariation(clothingComponents.ACCESSORIE)
      };

      mp.gui.chat.push(JSON.stringify(cuffed[target.remoteId]))
   } else {
      const isCuffed = cuffed[target.remoteId];

      if (isCuffed) {
         target.clearTasks();
         target.setComponentVariation(clothingComponents.ACCESSORIE, isCuffed.drawable, isCuffed.texture, 2);
         delete cuffed[target.remoteId];
      }
   }
};


mp.events.add(RageEnums.EventKey.RENDER, checkMoving);
mp.events.add(RageEnums.EventKey.ENTITY_STREAM_IN, cuffStream)
mp.events.addDataHandler('CUFFED', cuff);