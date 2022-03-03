import { getCursorData } from "../../utils";


let vpCamera: CameraMp | null = null;
let vehicle: VehicleMp | null = null;


export function vehiclePreviewCamera (active: boolean, pVehicle?: VehicleMp) { 
   if (active && pVehicle) { 

      vehicle = pVehicle;
      const { position } = vehicle;

      vpCamera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
      vpCamera.setActive(true);
      vpCamera.setCoord(position.x + 7, position.y + 6.5, position.z);
      vpCamera.pointAtCoord(position.x, position.y, position.z);

      mp.game.cam.renderScriptCams(true, false, 0, true, false);
      mp.events.add('render', moveVehiclePreviewCamera);
   } else { 
      mp.events.remove('render', moveVehiclePreviewCamera);

      if (vpCamera) {
         vpCamera.destroy();
      }

      mp.game.cam.renderScriptCams(false, false, 0, false, false);
   }
}



function moveVehiclePreviewCamera() {
   if (!vehicle || !vpCamera) {
      return;
   };

   const data = getCursorData();

   if (!mp.keys.isDown(0x02)) return;
   const newHeading = vehicle.getHeading() + data.deltaX * 0.15;
   vehicle.setHeading(newHeading);

   let { x: camPosX, y: camPosY, z: camPosZ } = vpCamera.getCoord();

   camPosZ = camPosZ + data.deltaY * 0.001;
   const { x: vehPosX, y: vehPosY, z: vehPosZ } = vehicle.getCoords(true);

   if (camPosZ < vehPosZ + 1.0 && camPosZ > vehPosZ - 0.25) {
      vpCamera.setCoord(camPosX, camPosY, camPosZ);
      vpCamera.pointAtCoord(vehPosX, vehPosY, camPosZ);
   }
}

