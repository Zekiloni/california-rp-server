

const Player = mp.players.local;

const Vehicles = [
   "packer", "phantom", "hauler", "faggio2", "seminole",
   "asea", "ingot", "bison", "burrito", "speedo4"
];

let Current = 0;
let Vehicle = null;

const Positions = {
   Vehicle: new mp.Vector3(-1735.195, 161.823, 64.4375),
   Camera: new mp.Vector3(-1740.1019, 173.7072, 65.1874),
   CameraLook: new mp.Vector3(-1735.195, 161.823, 64.4375)
}

mp.events.add({

   'CLIENT:PLAYER.PEDSHOT': () => { 
      let pedHeadShot;
      if (pedHeadShot == null) {
          pedHeadShot = mp.players.local.registerheadshot();
          mp.gui.chat.push(`pedHeadShot: ${pedHeadShot}`);
      }
      
      mp.events.add('render', () => {
          if (pedHeadShot == null) {
              pedHeadShot = mp.players.local.registerheadshot();
              mp.gui.chat.push(`pedHeadShot: ${pedHeadShot}`);
          }
          if (mp.game.ped.isPedheadshotValid(pedHeadShot) && mp.game.ped.isPedheadshotReady(pedHeadShot)) {
              const headshotTexture = mp.game.ped.getPedheadshotTxdString(pedHeadShot);
         
              mp.game.graphics.drawSprite(headshotTexture, headshotTexture, 0.5, 0.5, 0.1, 0.1, 0, 255, 255, 255, 100);
          }
      });
   },
   
   'CLIENT::VEHICLES:SCREENSHOT': async () => { 
      Player.position = new mp.Vector3(Positions.Vehicle.x + 8, Positions.Vehicle.y + 4, Positions.Vehicle.z -1.4);
      mp.game.ui.displayRadar(false);
      mp.game.wait(100);

      mp.gui.chat.push('slikanje pokrenuto');
      let Camera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
      Camera.setActive(true);
      Camera.setCoord(Positions.Camera.x, Positions.Camera.y, Positions.Camera.z);
      Camera.pointAtCoord(Positions.CameraLook.x, Positions.CameraLook.y, Positions.CameraLook.z);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);
      
      mp.game.wait(50);

      do {
         if (Vehicle) { 
            Vehicle.model = mp.game.joaat(Vehicles[Current]);
            Vehicle.freezePosition(true);
            Vehicle.setColours(71, 71);
         } else { 
            Vehicle = mp.vehicles.new(mp.game.joaat(Vehicles[Current]), Positions.Vehicle, {
               numberPlate: ' ',
            });
            Vehicle.setHeading(80);
            Vehicle.freezePosition(true);
            mp.game.wait(5);
            Vehicle.setColours(71, 71);
         }
         mp.game.wait(100);
         mp.gui.takeScreenshot(Vehicles[Current] + '.png', 1, 10, 0);
         mp.game.wait(100);
         Current ++;
      } while (Current != Vehicles.length -1);


      if (Camera) Camera.destroy();
      if (Vehicle) Vehicle.destroy();
      mp.gui.chat.push('slikanje zavrseno');
      Camera = null;
      Vehicle = null;
      Current = 0;
      mp.game.ui.displayRadar(true);
      mp.game.cam.renderScriptCams(false, false, 0, false, false);

   }
})