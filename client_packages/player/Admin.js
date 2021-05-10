

const Player = mp.players.local;


let camdir = false;
let noclip = false;
let charpos = false;


mp.events.add({
   'client:player.noClip': () => { 
      noClip = !noClip;
      Player.setInvincible(noclip);
      Player.freezePosition(false);
      Player.setVisible(!noclip, !noclip);
      Player.setCollision(!noclip, !noclip);
      Player.setHasGravity(!noclip);
      noclip ? Player.setMaxSpeed(0.0001) : Player.setMaxSpeed(10)
   },

   'render': () => { 
      if (noclip) {
         if (mp.keys.isDown(87) === true) {
            const pos = Player.position;
            const dir = getCameraDirection();
            Player.setCoordsNoOffset(pos.x + dir.x, pos.y + dir.y, pos.z + dir.z, false, false, false);
         }
         if (mp.keys.isDown(83) === true) {
            const pos = Player.position;
            const dir = getCameraDirection();
            Player.setCoordsNoOffset(pos.x - dir.x, pos.y - dir.y, pos.z - dir.z, false, false, false);
         }
      }
      if (charpos) {
         const pos = Player.position;
         mp.game.graphics.drawText(`X:${pos.x}    Y:${pos.y}    Z:${pos.z}`, [0.5, 0.005],
         {
            font: 4,
            color: [255, 255, 255, 255],
            scale: [1.0, 1.0],
            outline: true,
         });
      }
      if (camdir) {
         const dir = getCameraDirection();
         mp.game.graphics.drawText(`X:${dir.x}    Y:${dir.y}    Z:${dir.z}`, [0.5, 0.05],
         {
            font: 4,
            color: [255, 255, 255, 255],
            scale: [1.0, 1.0],
            outline: true,
         });
      }
   }
})

function getCameraDirection () {
   const heading = mp.game.cam.getGameplayCamRelativeHeading() + Player.getHeading();
   const pitch = mp.game.cam.getGameplayCamRot(0).x;
   let x = -Math.sin(heading * Math.PI / 180.0);
   let y = Math.cos(heading * Math.PI / 180.0);
   let z = Math.sin(pitch * Math.PI / 180.0);
   let len = Math.sqrt(x *x+y*y+z*z);
   if (len != 0) { x = x / len; y = y / len; z = z / len; }
   return new mp.Vector3(x, y, z);
};