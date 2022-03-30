import { animationFlags } from '../../enums/animations.flags';
import { entityType } from '../../enums/entity';
import { animationData } from '../../interfaces/animations';


export function loadAnimation (i: string): Promise<boolean> { 
   if (mp.game.streaming.hasAnimDictLoaded(i)) return Promise.resolve(true);
   return new Promise(async resolve => { 
      mp.game.streaming.requestAnimDict(i);
      while (!mp.game.streaming.hasAnimDictLoaded(i)) { 
         await mp.game.waitAsync(0);
      }
      resolve(true);
   })
};


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
   duration: number = -1,
   allowDead?: boolean
): Promise<void> {

   if (entity.type == entityType.PLAYER && (<PlayerMp>entity).vehicle) {
      return;
   }

   const isAnimLoaded = await loadAnimation(dict);
   
   if (!isAnimLoaded) {
      return;
   }

   if (allowDead == false) {
      if (mp.players.local.getVariable('DEAD') || mp.players.local.getVariable('WOUNDED')) {
         return;
      }
   }

   if (mp.players.local.isPlayingAnim(dict, name, 3)) {
      return;
   }

   entity.taskPlayAnim(dict, name, 8.0, -1, duration, flag, 0, false, false, false);
};


export function stopAnimation (player: PlayerMp, dictionary: string, name: string) {
   if (player.isPlayingAnim(dictionary, name, 3)) {
      player.stopAnim(dictionary, name, 1);
   }
}

export function isPlayingAnim (player: PlayerMp, dictionary: string, name: string) {
   return loadAnimation(dictionary).then(() => player.isPlayingAnim(dictionary, name, 3));
}

mp.events.addDataHandler('ANIMATION', check);
mp.events.add('entityStreamIn', stream);
