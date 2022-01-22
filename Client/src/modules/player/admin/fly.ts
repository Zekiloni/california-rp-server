import controls from '../../../enums/controls';
import { getCrossProduct, getNormalizedVector } from '../../../utils';

let active: boolean = false;
let camera: CameraMp | null;
let shiftModifier = false;
let controlModifier = false;

let bindASCIIKeys = {
   Q: 69,
   E: 81,
   LCtrl: 17,
   Shift: 16
};


mp.events.add('CLIENT::ADMIN:FLY', () => { 
   active = !active;
   mp.game.ui.displayRadar(!active);
   if (active) {
      start();
   } else {
      stop();
   }
});


function start () {
   const { position } = mp.players.local;

   let cameraPosition = new mp.Vector3(
      position.x,
      position.y,
      position.z
   );

   let cameraRotation = mp.game.cam.getGameplayCamRot(2);

   camera = mp.cameras.new('default', cameraPosition, cameraRotation, 45);

   camera.setActive(true);
   mp.game.cam.renderScriptCams(true, false, 0, true, false);
   mp.players.local.freezePosition(true);
   mp.players.local.setInvincible(true);
   mp.players.local.setVisible(false, false);
   mp.players.local.setCollision(false, false);

   mp.events.add('render', fly);

};

function stop () {

   mp.events.remove('render', fly);

   if (camera) {
      mp.players.local.position = camera.getCoord();
      mp.players.local.setHeading(camera.getRot(2).z);
      camera.destroy(true);
      camera = null;
   }

   mp.game.cam.renderScriptCams(false, false, 0, true, false);
   mp.players.local.freezePosition(false);
   mp.players.local.setInvincible(false);
   mp.players.local.setVisible(true, false);
   mp.players.local.setCollision(true, false);
   
};


function fly () {
   if (!camera || mp.gui.cursor.visible) {
      return;
   }

   controlModifier = mp.keys.isDown(bindASCIIKeys.LCtrl);
   shiftModifier = mp.keys.isDown(bindASCIIKeys.Shift);
   let rot = camera.getRot(2);
   let fastMult = 1;
   let slowMult = 1;
   if (shiftModifier) {
      fastMult = 3;
   } else if (controlModifier) {
      slowMult = 0.5;
   }
   let rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
   let rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
   let leftAxisX = mp.game.controls.getDisabledControlNormal(0, 218);
   let leftAxisY = mp.game.controls.getDisabledControlNormal(0, 219);
   let pos = camera.getCoord();
   let rr = camera.getDirection();
   let vector = new mp.Vector3(0, 0, 0);
   vector.x = rr.x * leftAxisY * fastMult * slowMult;
   vector.y = rr.y * leftAxisY * fastMult * slowMult;
   vector.z = rr.z * leftAxisY * fastMult * slowMult;
   let upVector = new mp.Vector3(0, 0, 1);
   let rightVector = getCrossProduct(
      getNormalizedVector(rr),
      getNormalizedVector(upVector)
   );
   rightVector.x *= leftAxisX * 0.5;
   rightVector.y *= leftAxisX * 0.5;
   rightVector.z *= leftAxisX * 0.5;
   let upMovement = 0.0;
   if (mp.keys.isDown(bindASCIIKeys.Q)) {
      upMovement = 0.5;
   }
   let downMovement = 0.0;
   if (mp.keys.isDown(bindASCIIKeys.E)) {
      downMovement = 0.5;
   }
   mp.players.local.position = new mp.Vector3(
      pos.x + vector.x + 1,
      pos.y + vector.y + 1,
      pos.z + vector.z + 1
   );
   mp.players.local.heading = rr.z;
   camera.setCoord(
      pos.x - vector.x + rightVector.x,
      pos.y - vector.y + rightVector.y,
      pos.z - vector.z + rightVector.z + upMovement - downMovement
   );
   camera.setRot(
      rot.x + rightAxisY * -5.0,
      0.0,
      rot.z + rightAxisX * -5.0,
      2
   );
 };
 