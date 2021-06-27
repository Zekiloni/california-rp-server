

const Player = mp.players.local;
let browser = null, opened = false, Vehicle = null, camera = null;

let Point = null;

mp.events.add({
   'client:business.dealership:menu': (info) => { 
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://business/business-interfaces/dealership.html');
         browser.execute('dealership.Business = ' + JSON.stringify(info));
         Player.BrowserControls(true, true);

         Point = new mp.Vector3(info.Point.x, info.Point.y, info.Point.z);

         camera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
         camera.setActive(true);
         camera.setCoord(Point.x + 6, Point.y, Point.z);
         camera.pointAtCoord(Point.x, Point.y, Point.z);
         mp.game.cam.renderScriptCams(true, false, 0, true, false);
         mp.events.add('render', MoveCamera);

         Preview(info.Products[0].Model);

      } else { 
         if (browser) browser.destroy();
         if (camera) camera.destroy();
         camera = null;
         mp.game.cam.renderScriptCams(false, false, 0, false, false);
         Vehicle.destroy();
         Player.BrowserControls(false, false);
         mp.events.remove('render', MoveCamera);
      }
   },

   'client:vehicle.dealership:zoom': (delta) => { 

      let { x, y, z } = camera.getCoord();

      if (delta < 0) { 
         x += camera.getDirection().x * 0.2;
         y += camera.getDirection().y * 0.2;
         
      } else { 
         x -= camera.getDirection().x * 0.2;
         y -= camera.getDirection().y * 0.2;
      }

      const dist = mp.game.gameplay.getDistanceBetweenCoords(Vehicle.position.x, Vehicle.position.y, Vehicle.position.z, x, y, z, false);
      if (dist > 12.5 || dist < 0.8) return;

      camera.setPosition(x, y, z);
   },

   'client:business.dealership:preview': Preview,

   'client:business.dealership:customization': (primary, secondary) => { 
      Vehicle.setColours(parseInt(primary), parseInt(secondary));
   },

})

async function Preview (model) { 
   if (mp.vehicles.exists(Vehicle)) { 
      if (Vehicle.handle === 0) await mp.game.waitAsync(0);
      Vehicle.model = mp.game.joaat(model);
   } else { 
      Vehicle = mp.vehicles.new(mp.game.joaat(model), Point, { numberPlate: 'Dealership', alpha: 255, engine: false, heading: 90, dimension: Player.dimension });
      mp.gui.chat.push('handle' + JSON.stringify(Vehicle.handle))
   }
};


let [PrevX, PrevY] = mp.gui.cursor.position;

function CursorData () { 
   const x = PrevX, y = PrevY;
   PrevX = mp.gui.cursor.position[0];
   PrevY = mp.gui.cursor.position[1];
   return { DeltaX: mp.gui.cursor.position[0] - x, DeltaY: mp.gui.cursor.position[1] - y };
}

function MoveCamera () { 
   const Data = CursorData();

   if (!mp.keys.isDown(0x02)) return;
   const newHeading = Vehicle.getHeading() + Data.DeltaX * 0.15;
   Vehicle.setHeading(newHeading);

   let { x: camPosX, y: camPosY, z: camPosZ } = camera.getCoord();
   let { pointX: camPointX, pointY: camPointY, pointZ: camPointZ } = camera.getDirection();

   camPosZ = camPosZ + Data.DeltaY * 0.001;
   const { x: vehPosX, y: vehPosY, z: vehPosZ } = Vehicle.getCoords(true);

   if (camPosZ < vehPosZ + 1.0 && camPosZ > vehPosZ - 0.3) { 
      camera.setPosition(camPosX, camPosY, camPosZ);
      camera.pointAtCoord(vehPosX, vehPosY, camPosZ);
   }
}


