import controls from '../../../enums/controls';
import { screenResolution } from '../../core';


let DLActive: boolean = false;

function activateDL () {
   DLActive = !DLActive;

   if (DLActive)
      mp.events.add(RageEnums.EventKey.RENDER, renderDL);
   else
      mp.events.remove(RageEnums.EventKey.RENDER, renderDL);
}


function renderDL () {
   const { position } = mp.players.local;

   mp.players.forEachInRange(position, 40, (target) => {
      const { position: tPosition, id, name } = target;
      const hp = target.getHealth().toFixed(1);

      mp.game.graphics.drawLine(position.x, position.y, position.z, tPosition.x, tPosition.y, tPosition.z, 205, 205, 205, 255);

      const distance = position.subtract(tPosition).length();
      let { x, y } = mp.game.graphics.world3dToScreen2d(tPosition.x, tPosition.y, tPosition.z + 0.15);

      if (x && y && distance) {
         let scale = (distance / 25);
         if (scale < 0.6) scale = 0.6;
         
         y -= (scale * (0.005 * (screenResolution.y / 1080))) - parseInt('0.010');

         mp.game.graphics.drawText('[' + id + '] ' + name + '~n~ HP: ' + hp, [x, y], {
            font: 4,
            color: [255, 255, 255, 255],
            scale: [0.345, 0.345],
            outline: false,  
            centre: true
         });
      }
   });  

   mp.vehicles.forEachInRange(position, 40, (vehicle) => {

   })
}
