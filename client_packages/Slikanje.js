

const Player = mp.players.local;

const Vehicles = [
   "blista", "dilettante", "faggio", "faggio2", "seminole", 
   "asea", "ingot", "bison", "burrito", "speedo4"
];

let Current = 0;
let Vehicle = null;

const Positions = {
   Vehicle: new mp.Vector3(-1738.0914, 163.9754, 66.897),
   Camera: new mp.Vector3(-1742.8474, 169.0432, 65.25045),
   CameraLook: new mp.Vector3(-1738.0914, 163.9754, 63.697)
}

mp.events.add({
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
         } else { 
            Vehicle = mp.vehicles.new(mp.game.joaat(Vehicles[Current]), Positions.Vehicle, {
               numberPlate: ' ', color: [[242, 173, 46], [242, 173, 46]]
            });
            Vehicle.setCustomPrimaryColour(242, 173, 46);
            Vehicle.setCustomSecondaryColour(242, 173, 46);
            Vehicle.setColours(126, 126);
            Vehicle.freezePosition(true);
            Vehicle.setHeading(80);
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