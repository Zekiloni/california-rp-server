
const Player = mp.players.local;

const Server = {
   Color: {
      R: 104, G: 69, B: 234, A: 255
   }
}

function CompareVectors (i, x) { 
   return i.x == x.x && i.y == x.y && i.z == x.z;
};


function LoadAnimDict (i) { 
   if (mp.game.streaming.hasAnimDictLoaded(i)) return Promise.resolve();
   return new Promise(async resolve => { 
      mp.game.streaming.requestAnimDict(i);
      while (!mp.game.streaming.hasAnimDictLoaded(i)) { 
         await mp.game.waitAsync(25);
      }
      resolve();
   })
};



function Attachment (entity, value) { 
   if (value) { 
      const Position = new mp.Vector3(entity.position.x, entity.position.y, entity.position.z);
      const Rotation = new mp.Vector3(entity.rotation.x, entity.rotation.y, entity.rotation.z);

      entity.Attachment = mp.objects.new(mp.game.joaat(value.name), Position, {
         rotation: Rotation,
         alpha: 255,
         dimension: entity.dimension
      });

      entity.Attachment.notifyStreaming = true;
      utils.WaitEntity(entity.Attachment).then(() => {
         const Bone = entity.getBoneIndex(entity.Bone);
         entity.Attachment.attachTo(entity.handle, Bone, value.Offset.X, value.Offset.Y, value.Offset.Z, value.Offset.rX, value.Offset.rY, value.Offset.rZ, true, true, false, false, 0, true);
      })

   }
   else {
      if (entity.Attachment) { 
         if (entity.Attachment.doesExist()) { 
            entity.Attachment.destroy();
         }
      }
   }
}


function WaitEntity (entity) {
   return new Promise(resolve => {
      let wait = setInterval(() => {
         if (mp.game.entity.isAnEntity(entity.handle)) {
            clearInterval(wait);
            resolve();
         }
      }, 1);
   });
}

function weaponString (weapon) {
	if (typeof weapon !== 'undefined')
		return '0x' + weapon.toString(16).toUpperCase()
	else 
		return '0xA2719263'
}


function Distance (first, second) {
   return new mp.Vector3(first.x, first.y, first.z).subtract(new mp.Vector3(second.x, second.y, second.z)).length();
}


function OnlinePlayers () {
   let list = [];
   mp.players.forEach(p => { 
      list.push({ id: p.remoteId, name: p.name }); 
   }); 
   return list;
}


function GetAdress (position) { 
   const path = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0),
      Zone = mp.game.gxt.get(mp.game.zone.getNameOfZone(position.x, position.y, position.z)),
      Street = mp.game.ui.getStreetNameFromHashKey(path.streetName);
   return { zone: Zone, street: Street };
}


function BrowserControls (freezeControls, mouse) {
   mouse ? mp.gui.chat.activate(false) : mp.gui.chat.activate(true);
   // mp.game.invoke('setTypingInChatState', mouse);
   setTimeout(() => { mp.gui.cursor.show(freezeControls, mouse); }, 250);
}

Player.BrowserControls = BrowserControls;


let MovableCamera = null;

function PlayerPreviewCamera (toggle) { 
   if (toggle) { 
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
      MovableCamera = null;
      mp.game.cam.renderScriptCams(false, false, 0, false, false);
   }
}

function ZoomCamera (delta) {
   let { x, y, z } = MovableCamera.getCoord();

   if (delta < 0) { 
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

function CursorData () { 
   const x = PrevX, y = PrevY;
   PrevX = mp.gui.cursor.position[0];
   PrevY = mp.gui.cursor.position[1];
   return { DeltaX: mp.gui.cursor.position[0] - x, DeltaY: mp.gui.cursor.position[1] - y };
}

function MoveCamera () { 
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

const Interactions = [];
function CreateInteractionSpot (position, checkpointData, blipData) {
   const Interaction = null;
   Interaction.Checkpoint = mp.checkpoints.new(checkpointData.Type, position, checkpointData.Radius,
   {
       color: [ 255, 255, 255, 255 ], // Boja
       visible: true,
       dimension: player.dimension
   });
   Interaction.Blip = mp.blips.new(blipData.Type, new mp.Vector3(position.x, position.y, 0), { name: blipData.Name, color: blipData.Color, shortRange: false });
   Interactions.push(Interaction);
}


/*'client:createjobWaypoint': (x, y) => { 
        mp.game.ui.setNewWaypoint(x, y);
   },

   'client:createJobMarker': (type = 1, position, radius = 10, color, dimension = 0) => { 
       let pos = position;
        mp.checkpoints.new(type, new mp.Vector3(pos.x, pos.y, pos.z - 1.5), radius,
        {
            color: [ color.r, color.g, color.b, color.a ],
            visible: true,
            dimension: dimension
        });
   },

    'client:destroyJobMarker': (marker) => { marker.destroy(); },

    'client:createJobBlip': (sprite = 1, position, name = 'A321', color = 36, alpha = 255, shortRange, rotation = 0, dimension = 0) => { 
        let jobBlip = mp.blips.new(sprite, new mp.Vector3(position.x, position.y, 0),
        {
            name: name,
            color: color,
            alpha, alpha,
            shortRange: shortRange,
            rotation: rotation,
            dimension: dimension,
        });
    }, */

global.utils = { CompareVectors, LoadAnimDict, weaponString, Distance, OnlinePlayers, GetAdress, PlayerPreviewCamera, WaitEntity, Server, Attachment };
