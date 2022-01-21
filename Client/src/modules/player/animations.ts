import { animationFlags } from '../../enums/animations.flags';
import { entityType } from '../../enums/entity';
import { animationData } from '../../interfaces/animations';
import { loadAnimation } from '../../utils';


function stream (entity: EntityMp) { 
   if (entity.type != entityType.PLAYER) { 
      return;
   }

   const animation: animationData | null = entity.getVariable('ANIMATION');

   if (animation != null) {
      playAnimation (
         <PlayerMp | PedMp>entity,
         animation.dictionary,
         animation.name,
         animation.flag,
         animation.duration
      );
   }
}


function check (entity: EntityMp, value: animationData | null, oldValue: animationData) { 
   if (entity.type != entityType.PLAYER) {
      return;
   }

   if (value == oldValue && value != null) { 
      return;
   }

   const animation = value;

   if (animation) {
      playAnimation (
         <PlayerMp | PedMp>entity,
         animation.dictionary,
         animation.name,
         animation.flag,
         animation.duration
      );
   } else { 
      (<PlayerMp | PedMp>entity).clearTasks();
   }
  
};


export async function playAnimation (
   entity: PlayerMp | PedMp,
   dict: string,
   name: string,
   flag: animationFlags = animationFlags.CANCELABLE,
   duration: number = -1
): Promise<void> {

   if (entity.type == entityType.PLAYER && (<PlayerMp>entity).vehicle) {
      return;
   }

   const isReadyToPlay = await loadAnimation(dict);
   if (!isReadyToPlay) {
      return;
   }

   // if (mp.players.local.getVariable('DEAD')) {
   //    return;
   // }

   if (mp.players.local.isPlayingAnim(dict, name, 3)) {
      return;
   }

   entity.taskPlayAnim(dict, name, 8.0, -1, duration, flag, 0, false, false, false);
};


mp.events.addDataHandler('ANIMATION', check);
mp.events.add('entityStreamIn', stream);
