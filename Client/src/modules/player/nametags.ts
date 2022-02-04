import { distanceBetweenVectors } from '../../utils';
import { screenResolution } from '../core';


mp.nametags.enabled = false;

mp.events.add('render', nametags)

function nametags () {
   if (!mp.players.local.getVariable('LOGGED_IN')) {
      return;
   }

   if (!mp.players.local.getVariable('SPAWNED')) {
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

               if (target.getVariable('WOUNDED')) {
                  mp.game.graphics.drawText('* THIS PLAYER IS BRUTALLY WOUNDED *', [x, y - 0.0345], 
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

// mp.events.add('render', () => { 
//    if (player.getVariable('LOGGED_IN') && player.getVariable('SPAWNED')) { 
//       mp.players.forEach((Target) => { 

//          const TargetPosition = Target.position;
//          const PlayerPosition = Player.position;

//          const Distance = new mp.Vector3(PlayerPosition.x, PlayerPosition.y, PlayerPosition.z).subtract(new mp.Vector3(TargetPosition.x, TargetPosition.y, TargetPosition.z)).length();
         
//          if (Distance < 8 && Player.id != Target.id && Player.hasClearLosTo(Target.handle, 17)) {
//             if (Target.getAlpha() != 0) { 
               
//                const Index = Target.getBoneIndex(12844)
//                const NameTag = Target.getWorldPositionOfBone(Index);

//                const Position = mp.game.graphics.world3dToScreen2d(NameTag.x, NameTag.y, NameTag.z + 0.4);

//                if (Position) { 
//                   let x = Position.x;
//                   let y = Position.y;

//                   let scale = (Distance / 25);
//                   if (scale < 0.6) scale = 0.6;
                  
//                   y -= (scale * (0.005 * (screenResolution.y / 1080))) - parseInt('0.010');

//                   if (Target.hasVariable('Bubble') && Target.getVariable('Bubble')) { 
//                      const BubblePosition = mp.game.graphics.world3dToScreen2d(NameTag.x, NameTag.y, NameTag.z + 0.6);
//                      if (BubblePosition) { 
//                         const Bubble = Target.getVariable('Bubble');
//                         // mp.game.graphics.drawText('* ' + Target.name + ' ' + Bubble.Content + '.', [BubblePosition.x, BubblePosition.y], {
//                         //    font: 4,
//                         //    color: Bubble.Color,
//                         //    scale: [0.325, 0.325],
//                         //    outline: false
//                         // });
//                      }
//                   }

//                   if (Target.hasVariable('Wounded') && Target.getVariable('Wounded')) {
//                      const WoundedPosition = mp.game.graphics.world3dToScreen2d(NameTag.x, NameTag.y, NameTag.z + 0.75);
//                      if (WoundedPosition) { 
//                         const Wound = Target.getVariable('Wounded');
//                         // mp.game.graphics.drawText('(( ' + Wound.Text + ' ))', [WoundedPosition.x, WoundedPosition.y], {
//                         //    font: 4,
//                         //    color: Wound.Color,
//                         //    scale: [0.315, 0.315],
//                         //    outline: false
//                         // });
//                      }
//                   }

//                   const content = Target.name + ' [' + Target.remoteId + ']';

//                   mp.game.graphics.drawText(content, [x, y], {
//                      centre: true,
//                      font: 4,
//                      color: [132, 142, 156, 200],
//                      scale: [0.325, 0.325],
//                      outline: false
//                   });
//                }

//             }
//          }

//       });

//    }
// });