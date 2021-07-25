
const Player = mp.players.local;


const Server = {
   Color: {
      R: 104, G: 69, B: 234, A: 255
   }
}

export function CompareVectors (i: Vector3Mp, x: Vector3Mp) { 
   return i.x == x.x && i.y == x.y && i.z == x.z;
};

export function DistanceBetweenVectors (First: Vector3Mp, Second: Vector3Mp) {
   return new mp.Vector3(First.x, First.y, First.z).subtract(new mp.Vector3(Second.x, Second.y, Second.z)).length();
}

export function LoadAnimationDictionary (i: string): Promise<boolean> { 
   if (mp.game.streaming.hasAnimDictLoaded(i)) return Promise.resolve(true);
   return new Promise(async resolve => { 
      mp.game.streaming.requestAnimDict(i);
      while (!mp.game.streaming.hasAnimDictLoaded(i)) { 
         await mp.game.waitAsync(0);
      }
      resolve(true);
   })
};


export function LoadMovementClipset (Clipset: string): Promise<boolean> { 
   if (mp.game.streaming.hasClipSetLoaded(Clipset)) return Promise.resolve(true);
   return new Promise(async resolve => { 
      mp.game.streaming.requestClipSet(Clipset);
      while (!mp.game.streaming.hasClipSetLoaded(Clipset)) { 
         await mp.game.waitAsync(10);
      }
      resolve(true);
   })
}



export function WaitEntity (Entity: EntityMp) {
   return new Promise(resolve => {
      let wait = setInterval(() => {
         if (mp.game.entity.isAnEntity(Entity.handle)) {
            clearInterval(wait);
            resolve(true);
         }
      }, 1);
   });
}

export function WeaponString (Weapon: number) {
	if (typeof Weapon !== 'undefined')
		return '0x' + Weapon.toString(16).toUpperCase()
	else 
		return '0xA2719263'
}



export function OnlinePlayers () {
   let List: any = [];
   mp.players.forEach(_Player => {
      List.push({ id: _Player.remoteId, name: _Player.name }); 
   }); 
   return List;
}


export function GetAdress (Position: Vector3Mp) { 
   const path = mp.game.pathfind.getStreetNameAtCoord(Position.x, Position.y, Position.z, 0, 0),
      Zone = mp.game.gxt.get(mp.game.zone.getNameOfZone(Position.x, Position.y, Position.z)),
      Street = mp.game.ui.getStreetNameFromHashKey(path.streetName);
   return { zone: Zone, street: Street };
}

let MovableCamera: CameraMp;

export function PlayerPreviewCamera (Toggle: boolean) { 
   if (Toggle) { 
      MovableCamera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
      const CameraPositon = new mp.Vector3(Player.position.x + Player.getForwardX() * 1.5, Player.position.y + Player.getForwardY() * 1.5, Player.position.z);
      MovableCamera.setCoord(CameraPositon.x, CameraPositon.y, CameraPositon.z);
      MovableCamera.pointAtCoord(Player.position.x, Player.position.y, Player.position.z);
      MovableCamera.setActive(true);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);
   
      mp.events.add('render', MoveCamera);
      mp.events.add('client:player.camera:zoom', ZoomCamera);
   } else { 
      mp.events.remove('render', MoveCamera);
      mp.events.remove('client:player.camera:zoom', ZoomCamera);
      if (MovableCamera) MovableCamera.destroy();
      mp.game.cam.renderScriptCams(false, false, 0, false, false);
   }
}

function ZoomCamera (Delta: number) {
   let { x, y, z } = MovableCamera.getCoord();

   if (Delta < 0) { 
      x += MovableCamera.getDirection().x * 0.1;
      y += MovableCamera.getDirection().y * 0.1;
      
   } else { 
      x -= MovableCamera.getDirection().x * 0.1;
      y -= MovableCamera.getDirection().y * 0.1;
   }

   const dist = mp.game.gameplay.getDistanceBetweenCoords(Player.position.x, Player.position.y, Player.position.z, x, y, z, false);
   if (dist > 3.5 || dist < 0.3) return;

   MovableCamera.setPosition(x, y, z);
}

let [PrevX, PrevY] = mp.gui.cursor.position;

export function CursorData () { 
   const x = PrevX, y = PrevY;
   PrevX = mp.gui.cursor.position[0];
   PrevY = mp.gui.cursor.position[1];
   return { DeltaX: mp.gui.cursor.position[0] - x, DeltaY: mp.gui.cursor.position[1] - y };
}

export function MoveCamera () { 
   const Data = CursorData();

   if (!mp.keys.isDown(0x02)) return;
   const newHeading = Player.getHeading() + Data.DeltaX * 0.15;
   Player.setHeading(newHeading);

   let { x: camPosX, y: camPosY, z: camPosZ } = MovableCamera.getCoord();
   let { pointX: camPointX, pointY: camPointY, pointZ: camPointZ } = MovableCamera.getDirection();

   camPosZ = camPosZ + Data.DeltaY * 0.001;
   const { x: charPosX, y: charPosY, z: charPosZ } = Player.getCoords(true);

   if (camPosZ < charPosZ + 0.7 && camPosZ > charPosZ - 0.8) { 
      MovableCamera.setPosition(camPosX, camPosY, camPosZ);
      MovableCamera.pointAtCoord(charPosX, charPosY, camPosZ);

      
   }
}

export function CreateInteractionSpot (Name: string, Position: Vector3Mp) { 
   const checkpoint = mp.checkpoints.new(48, Position, 2.5, { color: [196, 12, 28, 195], visible: true, dimension: Player.dimension });
   const blip = mp.blips.new(1, new mp.Vector3(Position.x, Position.y, 0), { name: Name, color: 1, shortRange: false });
   return { checkpoint: checkpoint, blip: blip };
};

