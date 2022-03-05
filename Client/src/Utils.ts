import {Genders } from './data/Player';
import { clothingComponents } from './enums/clothing';
import { pedGender } from './enums/ped';
import femaleTorsos from './modules/player/clothing/female.torsos';
import maleTorsos from './modules/player/clothing/male.torsos';


const ATMS = [ 
   3424098598, 3168729781, 2930269768, 506770882
];


export function isNearATM (Position: Vector3Mp) { 
   for (const ATM of ATMS) { 
      const Nearby = mp.game.object.getClosestObjectOfType(Position.x, Position.y, Position.z, 1.8, ATM, false, true, true);
      if (Nearby) {
         return true;
      }
   }
};


export function getForwardVector (rotation: Vector3Mp) {
   const z = -rotation.z;
   const x = rotation.x;
   const num = Math.abs(Math.cos(x));
   return {
      x: -Math.sin(z) * num,
      y: Math.cos(z) * num,
      z: Math.sin(x)
   };
}


function getLookEntity (distance: number) {
   const camera = mp.cameras.new("gameplay"); 

   const position = camera.getCoord();
   const direction = camera.getDirection();

   let farAway = new mp.Vector3(
      (direction.x * distance) + (position.x), 
      (direction.y * distance) + (position.y), 
      (direction.z * distance) + (position.z)
   ); 

   const result = mp.raycasting.testPointToPoint(position, farAway); 

   return result; 
};

mp.events.add(RageEnums.EventKey.RENDER, () => {
   
})


export function getBestTorso () {
   const drawable = mp.players.local.getDrawableVariation(clothingComponents.TOP);

   const gender = Genders[mp.players.local.model];
   switch (gender) { 
      case pedGender.MALE: { 
         if (maleTorsos[String(drawable) as keyof typeof maleTorsos] != undefined || maleTorsos[String(drawable) as keyof typeof maleTorsos][0] != undefined) {
            const Torso = maleTorsos[String(drawable) as keyof typeof maleTorsos][0].BestTorsoDrawable;
            return Torso;
         }
      }

      case pedGender.FEMALE: {
         if (femaleTorsos[String(drawable) as keyof typeof femaleTorsos] != undefined || femaleTorsos[String(drawable) as keyof typeof femaleTorsos][0] != undefined) {
            const Torso = femaleTorsos[String(drawable) as keyof typeof femaleTorsos][0].BestTorsoDrawable;
            return Torso;
         }
      }
   }
}


export const getNormalizedVector = function(vector: Vector3Mp) {
   var mag = Math.sqrt(
   vector.x * vector.x + vector.y * vector.y + vector.z * vector.z
   );
   vector.x = vector.x / mag;
   vector.y = vector.y / mag;
   vector.z = vector.z / mag;
   return vector;
};


export const getCrossProduct = function(v1: Vector3Mp, v2: Vector3Mp) {
   let vector = new mp.Vector3(0, 0, 0);
   vector.x = v1.y * v2.z - v1.z * v2.y;
   vector.y = v1.z * v2.x - v1.x * v2.z;
   vector.z = v1.x * v2.y - v1.y * v2.x;
   return vector;
};


export function disableMoving () { 
   mp.game.controls.disableControlAction(0, 30, true);
   mp.game.controls.disableControlAction(0, 31, true);
   mp.game.controls.disableControlAction(0, 32, true);
   mp.game.controls.disableControlAction(0, 33, true);
   mp.game.controls.disableControlAction(0, 34, true);
   mp.game.controls.disableControlAction(0, 35, true);
}

export function removeClothing (Entity: PlayerMp) {
   const Gender = Genders[Entity.model];
   switch (Gender) { 
      case '0': {
         Entity.setComponentVariation(clothingComponents.TOP, 15, 0, 2);
         Entity.setComponentVariation(clothingComponents.TORSO, 15, 0, 2);
         Entity.setComponentVariation(clothingComponents.LEGS, 61, 0, 2);
         Entity.setComponentVariation(clothingComponents.SHOES, 34, 0, 2);
         Entity.setComponentVariation(clothingComponents.UNDERSHIRT, 15, 0, 2);
         break;
      }

      case '1': {
         Entity.setComponentVariation(clothingComponents.TOP, 15, 0, 2);
         Entity.setComponentVariation(clothingComponents.TORSO, 15, 0, 2);
         Entity.setComponentVariation(clothingComponents.LEGS, 17, 0, 2);
         Entity.setComponentVariation(clothingComponents.SHOES, 35, 0, 2);
         Entity.setComponentVariation(clothingComponents.UNDERSHIRT, 14, 0, 2);
         break;
      }
   }
};


export function CompareVectors (i: Vector3Mp, x: Vector3Mp) { 
   return i.x == x.x && i.y == x.y && i.z == x.z;
};


export function distanceBetweenVectors (first: Vector3Mp, second: Vector3Mp) {
   return new mp.Vector3(first.x, first.y, first.z).subtract(new mp.Vector3(second.x, second.y, second.z)).length();
}


export function loadAnimation (i: string): Promise<boolean> { 
   if (mp.game.streaming.hasAnimDictLoaded(i)) return Promise.resolve(true);
   return new Promise(async resolve => { 
      mp.game.streaming.requestAnimDict(i);
      while (!mp.game.streaming.hasAnimDictLoaded(i)) { 
         await mp.game.waitAsync(0);
      }
      resolve(true);
   })
};


export function loadMovementClipset (clipset: string): Promise<boolean> { 
   if (mp.game.streaming.hasClipSetLoaded(clipset)) return Promise.resolve(true);
   return new Promise(async resolve => { 
      mp.game.streaming.requestClipSet(clipset);
      while (!mp.game.streaming.hasClipSetLoaded(clipset)) { 
         await mp.game.waitAsync(10);
      }
      resolve(true);
   })
}

export function waitForEntity (entity: EntityMp) {
   if (mp.game.entity.isAnEntity(entity.handle)) {
      Promise.resolve(true);
   } else { 
      return new Promise(async resolve => {
         while (!mp.game.entity.isAnEntity(entity.handle)) {
            await mp.game.waitAsync(0);
         }
         resolve(true)
      });
   }
};


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

export function getStreetZone (position: Vector3Mp) { 
   const path = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0),
      zoneName = mp.game.gxt.get(mp.game.zone.getNameOfZone(position.x, position.y, position.z)),
      streetName = mp.game.ui.getStreetNameFromHashKey(path.streetName);
   return { zone: zoneName, street: streetName };
}

let MovableCamera: CameraMp;

export function playerPreviewCamera (Toggle: boolean) { 
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
   if (dist > 3.5 || dist < 0.35) return;

   MovableCamera.setCoord(x, y, z);
}



let [PrevX, PrevY] = mp.gui.cursor.position;


export function getCursorData () { 
   const x = PrevX, y = PrevY;
   PrevX = mp.gui.cursor.position[0];
   PrevY = mp.gui.cursor.position[1];
   return { deltaX: mp.gui.cursor.position[0] - x, deltaY: mp.gui.cursor.position[1] - y };
}


export function MoveCamera () { 
   const Player = mp.players.local;
   const Data = getCursorData();

   if (!mp.keys.isDown(0x02)) return;
   const newHeading = Player.getHeading() + Data.deltaX * 0.15;
   Player.setHeading(newHeading);

   let { x: camPosX, y: camPosY, z: camPosZ } = MovableCamera.getCoord();
   //let { X: camPointX, Y: camPointY, Z: camPointZ } = MovableCamera.getDirection();

   camPosZ = camPosZ + Data.deltaY * 0.001;
   const { x: charPosX, y: charPosY, z: charPosZ } = Player.getCoords(true);

   if (camPosZ < charPosZ + 0.7 && camPosZ > charPosZ - 0.8) { 
      MovableCamera.setCoord(camPosX, camPosY, camPosZ);
      MovableCamera.pointAtCoord(charPosX, charPosY, camPosZ);
   }
}

export function CreateInteractionSpot (Name: string, Position: Vector3Mp, WithBlip: boolean = true) { 
   const Player = mp.players.local;
   const checkpoint = mp.checkpoints.new(48, Position, 2.5, { color: [196, 12, 28, 195], visible: true, dimension: Player.dimension });

   if (WithBlip) {
      const blip = mp.blips.new(1, new mp.Vector3(Position.x, Position.y, 0), { name: Name, color: 1, shortRange: false });
      return { Checkpoint: checkpoint, Blip: blip };
   }
   return { checkpoint };
};

