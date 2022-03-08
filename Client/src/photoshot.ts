


interface ShootingItem {
   name: string
   model: string
}


let itemsShooting: ShootingItem[] = [];
let currentItem = 0;
let itemObject: ObjectMp | null = null;


const shootingConfiguration = {
   position: new mp.Vector3(99.9932861328125, -1740.6622314453125, 40.6728286),
};


mp.events.add('MIDNIGHT:ITEM+PHOTOSHOOTING', (items: ShootingItem[]) => {
   itemsShooting = items;
   
   mp.players.local.position = new mp.Vector3(shootingConfiguration.position.x + 7, shootingConfiguration.position.y + 7 , shootingConfiguration.position.z);
   mp.players.local.freezePosition(true);

   mp.game.ui.displayRadar(false);

   let camera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
   camera.setActive(true);
   mp.game.cam.renderScriptCams(true, false, 0, true, false);

   mp.game.wait(50);

   do {
      const item = itemsShooting[currentItem];

      if (itemObject) { 
         itemObject.model = mp.game.joaat(item.model);
      } else { 
         itemObject = mp.objects.new(mp.game.joaat(item.model), shootingConfiguration.position);
         mp.game.wait(30);
      }

      // itemObject.placeOnGroundProperly();

      const { x, y ,z } = itemObject.position;

      camera.pointAtCoord(itemObject.position.x, itemObject.position.y, itemObject.position.z);
      camera.setCoord(x + 1, y, z + 0.025);

      mp.game.wait(50);
      mp.gui.takeScreenshot(item.name.toLowerCase().replace(' ', '_') + '.png', 1, 100, 100);
      mp.game.wait(40);
      currentItem ++;
   } while (currentItem != itemsShooting.length -1);

   if (camera) { 
      camera.destroy();
   }
   
   if (itemObject) {
      itemObject.destroy();
   }
   
   mp.gui.chat.push('slikanje zavrseno');
   itemObject = null;
   currentItem = 0;

   mp.players.local.freezePosition(false);
   mp.game.ui.displayRadar(true);
   mp.game.cam.renderScriptCams(false, false, 0, false, false);
});


 