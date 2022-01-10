import { screenResolution } from "./core";



mp.events.add('render', () => {
   
   if (mp.keys.isDown(187)) {
      const startPosition = mp.players.local.getBoneCoords(12844, 0.5, 0, 0);
      const endPosition = new mp.Vector3(0, 0, 75);

      const camera = mp.cameras.new("gameplay");
      const distance = 15;
      let pointPosition = camera.getDirection();

      let farAway = new mp.Vector3((pointPosition.x * distance) + (startPosition.x), (pointPosition.y * distance) + (startPosition.y), (pointPosition.z * distance) + (startPosition.z)); // calculate a random point, drawn on a invisible line between camera position and direction (* distance)

      const hitData = mp.raycasting.testPointToPoint(startPosition, farAway);
      if (!hitData) {
         mp.game.graphics.drawLine(startPosition.x, startPosition.y, startPosition.z, farAway.x, farAway.y, farAway.z, 255, 255, 255, 255);
      } else {
         mp.game.graphics.drawLine(startPosition.x, startPosition.y, startPosition.z, farAway.x, farAway.y, farAway.z, 0, 255, 0, 255);

         let info: string | null = null;

         if (hitData.entity.type == 'vehicle' || hitData.entity.type == 'object')  {
            switch (hitData.entity.type) { 
               case 'vehicle': { 
                  info = 'model: ' + hitData.entity.model + ', speed ' + (hitData.entity.getSpeed() * 3.6) + ' kmh';
                  break;
               }
               
               case 'object': { 
                  if (hitData.entity.getVariable('ITEM')) { 
                     info = 'item: ' + hitData.entity.getVariable('ITEM').name + ', id: ' + hitData.entity.getVariable('ITEM').id;
                  }
                  break;
               }
            }
   
            const { position: playerPosition } = mp.players.local;
            const { position: objectPosition } = hitData.entity;
   
            const distance = playerPosition.subtract(objectPosition).length();
            const screenPos = mp.game.graphics.world3dToScreen2d(hitData.entity.position.x, hitData.entity.position.y, hitData.entity.position.z + 0.15);
   
            if (screenPos && info) { 
               let { x, y } = screenPos;
         
               if (distance <= 2.5) {       
                  let scale = (distance / 25);
                  if (scale < 0.6) scale = 0.6;
                  
                  y -= (scale * (0.005 * (screenResolution.y / 1080))) - parseInt('0.010');
   
                  mp.game.graphics.drawText(info!, [x, y], {
                     font: 4,
                     color: [255, 255, 255, 255],
                     scale: [0.325, 0.325],
                     outline: false,
                     centre: true
                  });
               }
            }
         }
      }
   }
});
