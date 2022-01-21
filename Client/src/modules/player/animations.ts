import { animationFlags } from '../../enums/animations.flags';
import { loadAnimation } from '../../utils';


export async function playAnimation (
   dict: string,
   name: string,
   flags: animationFlags = animationFlags.CANCELABLE,
   duration: number = -1
): Promise<void> {

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

   mp.players.local.taskPlayAnim(dict, name, 8.0, -1, duration, flags, 0, false, false, false);
}