export { };

const Player = mp.players.local;
let Active = false;
let Vehicle: VehicleMp | null = null;
let Camera: CameraMp | null = null;

let Point: Vector3Mp | null = null;

mp.events.add({
   'client:business.dealership:menu': (Info: any) => {
      Active = !Active;
      if (Active) {

         Point = new mp.Vector3(Info.Point.x, Info.Point.y, Info.Point.z);

         Camera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
         Camera.setActive(true);
         Camera.setCoord(Point.x + 6, Point.y, Point.z);
         Camera.pointAtCoord(Point.x, Point.y, Point.z);
         mp.game.cam.renderScriptCams(true, false, 0, true, false);
         mp.events.add('render', MoveCamera);

         Preview(Info.Products[0].Model);

      } else {
         if (Camera) Camera.destroy();
         Camera = null;
         mp.game.cam.renderScriptCams(false, false, 0, false, false);
         if (Vehicle) Vehicle.destroy();
         mp.events.remove('render', MoveCamera);
      }
   },

   'client:vehicle.dealership:zoom': (delta) => {
      if (!Camera || !Vehicle) return;
      let { x, y, z } = Camera.getCoord();

      if (delta < 0) {
         x += Camera.getDirection().x * 0.2;
         y += Camera.getDirection().y * 0.2;

      } else {
         x -= Camera.getDirection().x * 0.2;
         y -= Camera.getDirection().y * 0.2;
      }

      const dist = mp.game.gameplay.getDistanceBetweenCoords(Vehicle.position.x, Vehicle.position.y, Vehicle.position.z, x, y, z, false);
      if (dist > 12.5 || dist < 0.8) return;

      Camera.setPosition(x, y, z);
   },

   'client:business.dealership:preview': Preview,

   'client:business.dealership:customization': (primary, secondary) => {
      if (!Vehicle) return;
      Vehicle.setColours(parseInt(primary), parseInt(secondary));
   },

   'client:business.dealership.vehicle:buy': (total, model, color, biz) => {
      mp.events.callRemote('server:business.dealership.vehicle:buy', total, model, color, biz);
   }

})

async function Preview(Model: string) {
   if (!Vehicle || !Point) return;
   if (mp.vehicles.exists(Vehicle)) {
      if (Vehicle.handle === 0) await mp.game.waitAsync(0);
      Vehicle.model = mp.game.joaat(Model);
   } else {
      Vehicle = mp.vehicles.new(mp.game.joaat(Model), Point, { numberPlate: 'Dealership', alpha: 255, engine: false, heading: 90, dimension: Player.dimension });
   }
};


let [PrevX, PrevY] = mp.gui.cursor.position;

function CursorData() {
   const x = PrevX, y = PrevY;
   PrevX = mp.gui.cursor.position[0];
   PrevY = mp.gui.cursor.position[1];
   return { DeltaX: mp.gui.cursor.position[0] - x, DeltaY: mp.gui.cursor.position[1] - y };
}

function MoveCamera() {
   if (!Vehicle || !Camera) return;
   const Data = CursorData();

   if (!mp.keys.isDown(0x02)) return;
   const newHeading = Vehicle.getHeading() + Data.DeltaX * 0.15;
   Vehicle.setHeading(newHeading);

   let { x: camPosX, y: camPosY, z: camPosZ } = Camera.getCoord();
   //let { pointX: camPointX, pointY: camPointY, pointZ: camPointZ } = Camera.getDirection();

   camPosZ = camPosZ + Data.DeltaY * 0.001;
   const { x: vehPosX, y: vehPosY, z: vehPosZ } = Vehicle.getCoords(true);

   if (camPosZ < vehPosZ + 1.0 && camPosZ > vehPosZ - 0.3) {
      Camera.setPosition(camPosX, camPosY, camPosZ);
      Camera.pointAtCoord(vehPosX, vehPosY, camPosZ);
   }
}


