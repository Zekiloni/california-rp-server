import { Clothing_Components, Genders } from "./Data/Player";

const ATMS = [ 
   3424098598, 3168729781, 2930269768, 506770882
];


export function IsNearATM (Position: Vector3Mp) { 
   for (const ATM of ATMS) { 
      const Nearby = mp.game.object.getClosestObjectOfType(Position.x, Position.y, Position.z, 1.8, ATM, false, true, true);
      if (Nearby) {
         return true;
      }
   }
};

export const Controls = {
   KEY_X: 0x58,
   KEY_L: 0x4C,
   KEY_Y: 0x59,
   LEFT_ARROW: 0x25,
   RIGHT_ARROW: 0x27,
   ENTER: 0x0D,
   KEY_P: 0x50,
   KEY_I: 0x49,
   TAB: 0x09,
   NUMBER_1: 0x31,
   NUMBER_2: 0x32
}


export function DisableMoving () { 
   mp.game.controls.disableControlAction(0, 30, true);
   mp.game.controls.disableControlAction(0, 31, true);
   mp.game.controls.disableControlAction(0, 32, true);
   mp.game.controls.disableControlAction(0, 33, true);
   mp.game.controls.disableControlAction(0, 34, true);
   mp.game.controls.disableControlAction(0, 35, true);
}

export function RemoveClothing (Entity: PlayerMp) {
   const Gender = Genders[Entity.model];
   switch (Gender) { 
      case '0': {
         Entity.setComponentVariation(Clothing_Components.Top, 15, 0, 2);
         Entity.setComponentVariation(Clothing_Components.Torso, 15, 0, 2);
         Entity.setComponentVariation(Clothing_Components.Legs, 61, 0, 2);
         Entity.setComponentVariation(Clothing_Components.Shoes, 34, 0, 2);
         Entity.setComponentVariation(Clothing_Components.Undershirt, 15, 0, 2);
         break;
      }

      case '1': {
         Entity.setComponentVariation(Clothing_Components.Top, 15, 0, 2);
         Entity.setComponentVariation(Clothing_Components.Torso, 15, 0, 2);
         Entity.setComponentVariation(Clothing_Components.Legs, 17, 0, 2);
         Entity.setComponentVariation(Clothing_Components.Shoes, 35, 0, 2);
         Entity.setComponentVariation(Clothing_Components.Undershirt, 14, 0, 2);
         break;
      }
   }


};

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
      const Player = mp.players.local;
      MovableCamera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
      const CameraPositon = new mp.Vector3(Player.position.x + Player.getForwardX() * 1.5, Player.position.y + Player.getForwardY() * 1.5, Player.position.z + 0.3);
      MovableCamera.setCoord(CameraPositon.x, CameraPositon.y, CameraPositon.z);
      MovableCamera.pointAtCoord(Player.position.x, Player.position.y, Player.position.z + 0.3);
      MovableCamera.setActive(true);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);
   
      mp.events.add('render', MoveCamera);
      mp.events.add('CLIENT::PLAYER_CAMERA:ZOOM', ZoomCamera);
   } else { 
      mp.events.remove('render', MoveCamera);
      mp.events.remove('CLIENT::PLAYER_CAMERA:ZOOM', ZoomCamera);
      if (MovableCamera) MovableCamera.destroy();
      mp.game.cam.renderScriptCams(false, false, 0, false, false);
   }
}

function ZoomCamera (Delta: number) {
   const Player = mp.players.local;
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

   MovableCamera.setCoord(x, y, z);
}



let [PrevX, PrevY] = mp.gui.cursor.position;


export function CursorData () { 
   const x = PrevX, y = PrevY;
   PrevX = mp.gui.cursor.position[0];
   PrevY = mp.gui.cursor.position[1];
   return { DeltaX: mp.gui.cursor.position[0] - x, DeltaY: mp.gui.cursor.position[1] - y };
}


export function MoveCamera () { 
   const Player = mp.players.local;
   const Data = CursorData();

   if (!mp.keys.isDown(0x02)) return;
   const newHeading = Player.getHeading() + Data.DeltaX * 0.15;
   Player.setHeading(newHeading);

   let { x: camPosX, y: camPosY, z: camPosZ } = MovableCamera.getCoord();
   //let { X: camPointX, Y: camPointY, Z: camPointZ } = MovableCamera.getDirection();

   camPosZ = camPosZ + Data.DeltaY * 0.001;
   const { x: charPosX, y: charPosY, z: charPosZ } = Player.getCoords(true);

   if (camPosZ < charPosZ + 0.7 && camPosZ > charPosZ - 0.8) { 
      MovableCamera.setCoord(camPosX, camPosY, camPosZ);
      MovableCamera.pointAtCoord(charPosX, charPosY, camPosZ);
   }
}

export function CreateInteractionSpot (Name: string, Position: Vector3Mp) { 
   const Player = mp.players.local;
   const checkpoint = mp.checkpoints.new(48, Position, 2.5, { color: [196, 12, 28, 195], visible: true, dimension: Player.dimension });
   const blip = mp.blips.new(1, new mp.Vector3(Position.x, Position.y, 0), { name: Name, color: 1, shortRange: false });
   return { Checkpoint: checkpoint, Blip: blip };
};
