import controls from '../../enums/controls';
import { distanceBetweenVectors } from '../../utils';
import { screenResolution } from '../core';


mp.nametags.enabled = false;
let nameTags: boolean = true;

const toggleNames = () => {
   nameTags = !nameTags;
}


const renderNametags = () => {
   if (!mp.players.local.getVariable('LOGGED_IN')) {
      return;
   }

   if (!mp.players.local.getVariable('SPAWNED')) {
      return;
   }

   if (!nameTags) {
      return;
   } 

   const { position, id } = mp.players.local;

   mp.players.forEach(target => { 
      const { position: targetPosition } = target;
      
      const distance = distanceBetweenVectors(position, targetPosition);

      if (distance < 7.5 && id != target.id && mp.players.local.hasClearLosTo(target.handle, 17)) {
         if (target.getAlpha() != 0) {

            const boneIndex = target.getBoneIndex(12844);
            const bonePosiiton = target.getWorldPositionOfBone(boneIndex);

            const screenPos = mp.game.graphics.world3dToScreen2d(bonePosiiton.x, bonePosiiton.y, bonePosiiton.z + 0.4);

            if (screenPos) { 
               let { x, y } = screenPos;

               let scale = (distance / 25);
               if (scale < 0.6) scale = 0.6;

               y -= (scale * (0.005 * (screenResolution.y / 1080))) - parseInt('0.010');

               if (target.isTypingInTextChat) {
                  mp.game.graphics.drawText('[...]', [x, y - 0.017], 
                     {
                        centre: true,
                        font: 4,
                        color: [255, 204, 69, 200],
                        scale: [0.325, 0.325],
                        outline: false
                     }
                  );
               }

               if (target.getVariable('WOUNDED') || target.getVariable('DEAD')) {
                  const info = target.getVariable('WOUNDED') ? 'THIS PLAYER IS BRUTALLY WOUNDED' : 'THIS PLAYER IS DEAD';
                  mp.game.graphics.drawText(info, [x, y - 0.0345], 
                     {
                        centre: true,
                        font: 4,
                        color: [255, 99, 71, 220],
                        scale: [0.335, 0.335],
                        outline: false
                     }
                  );
               }

               if (target.getVariable('BUBBLE')) {
                  mp.game.graphics.drawText('**' + target.getVariable('BUBBLE') + ' **', [x, y - 0.0515], 
                  {
                     centre: true,
                     font: 4,
                     color: [179, 128, 196, 225],
                     scale: [0.335, 0.335],
                     outline: false
                  }
               );
               }

               mp.game.graphics.drawText(target.name + ' [' + target.remoteId + ']', [x, y], 
                  {
                     centre: true,
                     font: 4,
                     color: [198, 198, 198, 225],
                     scale: [0.345, 0.345],
                     outline: false
                  }
               );
            }
         }
      }
   });
}


mp.events.add(RageEnums.EventKey.RENDER, renderNametags);
mp.keys.bind(controls.MINUS, true, toggleNames)