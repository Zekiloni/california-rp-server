import { screenResolution } from '../core';


mp.nametags.enabled = false;

const player = mp.players.local;

mp.events.add('render', () => { 
   if (player.getVariable('LOGGED_IN') && player.getVariable('SPAWNED')) { 
      mp.players.forEach((Target) => { 

         const TargetPosition = Target.position;
         const PlayerPosition = Player.position;

         const Distance = new mp.Vector3(PlayerPosition.x, PlayerPosition.y, PlayerPosition.z).subtract(new mp.Vector3(TargetPosition.x, TargetPosition.y, TargetPosition.z)).length();
         
         if (Distance < 8 && Player.id != Target.id && Player.hasClearLosTo(Target.handle, 17)) {
            if (Target.getAlpha() != 0) { 
               
               const Index = Target.getBoneIndex(12844)
               const NameTag = Target.getWorldPositionOfBone(Index);

               const Position = mp.game.graphics.world3dToScreen2d(NameTag.x, NameTag.y, NameTag.z + 0.4);

               if (Position) { 
                  let x = Position.x;
                  let y = Position.y;

                  let scale = (Distance / 25);
                  if (scale < 0.6) scale = 0.6;
                  
                  y -= (scale * (0.005 * (screenResolution.y / 1080))) - parseInt('0.010');

                  if (Target.hasVariable('Bubble') && Target.getVariable('Bubble')) { 
                     const BubblePosition = mp.game.graphics.world3dToScreen2d(NameTag.x, NameTag.y, NameTag.z + 0.6);
                     if (BubblePosition) { 
                        const Bubble = Target.getVariable('Bubble');
                        // mp.game.graphics.drawText('* ' + Target.name + ' ' + Bubble.Content + '.', [BubblePosition.x, BubblePosition.y], {
                        //    font: 4,
                        //    color: Bubble.Color,
                        //    scale: [0.325, 0.325],
                        //    outline: false
                        // });
                     }
                  }

                  if (Target.hasVariable('Wounded') && Target.getVariable('Wounded')) {
                     const WoundedPosition = mp.game.graphics.world3dToScreen2d(NameTag.x, NameTag.y, NameTag.z + 0.75);
                     if (WoundedPosition) { 
                        const Wound = Target.getVariable('Wounded');
                        // mp.game.graphics.drawText('(( ' + Wound.Text + ' ))', [WoundedPosition.x, WoundedPosition.y], {
                        //    font: 4,
                        //    color: Wound.Color,
                        //    scale: [0.315, 0.315],
                        //    outline: false
                        // });
                     }
                  }

                  const content = Target.name + ' [' + Target.remoteId + ']';

                  mp.game.graphics.drawText(content, [x, y], {
                     centre: true,
                     font: 4,
                     color: [132, 142, 156, 200],
                     scale: [0.325, 0.325],
                     outline: false
                  });
               }

            }
         }

      });

   }
});