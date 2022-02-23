

import { Browser } from '../../browser';
import clickEntity from '../utils/click.Entity';
import { objects } from './loader';


enum Movements {
   MOVING, ROTATION
}

enum Directions { 
   X, Y, Z
}

enum PropertyType { 
   HOUSE = 1, BUSINES = 2
}

interface Property { 
   type: PropertyType | null,
   id: number | null
}

interface BuilderConfig {
   active: boolean
   object: ObjectMp | null
   movement: Movements
   direction: Directions
   automaticGround: boolean
   clickSelectMode: boolean
   positionSensitivity: number
   rotationSensitivity: number
};


const resolution = mp.game.graphics.getScreenActiveResolution(0, 0);


let editing: BuilderConfig = {
   active: false,
   object: null,
   movement: Movements.MOVING,
   direction: Directions.X,
   automaticGround: false,
   clickSelectMode: false,
   positionSensitivity: 50,
   rotationSensitivity: 800,
}


export const toggleBuilder = (toggle: boolean, objectModel?: string) => {
   editing.active = toggle;

   if (editing.active && objectModel) { 
      mp.events.add('render', editor);
      mp.events.add(RageEnums.EventKey.CLICK, click);
      Browser.call('BROWSER::SHOW', 'objectEditor');
      
      const created = createObject(objectModel);
      select(created!);

   } else { 
      mp.events.remove('render', editor);
      mp.events.remove(RageEnums.EventKey.CLICK, click);

      mp.gui.cursor.show(false, false);
      editing.active = false;

      Browser.call('BROWSER::HIDE', 'objectEditor');

      objects.forEach(object => { 
         if (object.temporary && object.gameObject) {
            const index = objects.indexOf(object);
            object.gameObject.destroy();
            objects.splice(index, 1);
         }
      })

      editing.object = null;
   }
}


let oldCursorPosition = [0, 0];

const editor = () => {
   if (editing.active) {
      if (editing.object) {
         if (mp.keys.isDown(32) === true && !mp.players.local.isTypingInTextChat) { 
            mp.gui.cursor.show(false, false);
         } else {
            mp.gui.cursor.show(true, true);
         }

         const { position, rotation } = editing.object;

         mp.game.graphics.drawLine(position.x - 1.5, position.y, position.z, position.x + 1.5, position.y, position.z, 0, 0, 255, 255);
         mp.game.graphics.drawLine(position.x, position.y - 1.5, position.z, position.x, position.y + 1.0, position.z, 255, 0, 0, 255);
         mp.game.graphics.drawLine(position.x, position.y, position.z - 1.5, position.x, position.y, position.z + 1.5, 0, 255, 0, 255);
         

         if (mp.keys.isDown(0x02)) {
            let [cursorPositionX, cursorPositionY] = mp.gui.cursor.position;
            let [cursorOldX, cursorOldY] = oldCursorPosition;
            let cursorDirection = { x: cursorPositionX - cursorOldX, y: cursorPositionY - cursorOldY };
            cursorDirection.x /= resolution.x;
            cursorDirection.y /= resolution.y;

            let { x: posX, y: posY, z: posZ } = position;
            let { x: rotX, y: rotY, z: rotZ } = rotation;

            switch (editing.direction) {
               case Directions.X: { 
                  const mainPos = mp.game.graphics.world3dToScreen2d(posX, posY, posZ);
                  let referencePos;
                  if (editing.movement == Movements.MOVING) {
                     referencePos = mp.game.graphics.world3dToScreen2d(posX + 1, posY, posZ);
                  } else {
                     referencePos = mp.game.graphics.world3dToScreen2d(posX, posY + 1, posZ);
                  }

                  if (mainPos == undefined || referencePos == undefined) {
                     return;
                  };

                  let screenDirection = { x: referencePos.x - mainPos.x, y: referencePos.y - mainPos.y };
                  let magnitude = cursorDirection.x * screenDirection.x + cursorDirection.y * screenDirection.y;

                  if (editing.movement == Movements.MOVING) {
                     editing.object.position = new mp.Vector3(posX + magnitude * editing.positionSensitivity, posY, posZ);
                  } else {
                     editing.object.rotation= new mp.Vector3(rotX - magnitude * editing.rotationSensitivity, rotY, rotZ);
                  }
                  break;
               }

               case Directions.Y: {
                  const mainPos = mp.game.graphics.world3dToScreen2d(posX, posY, posZ);
                  let referencePos;
                  if (editing.movement == Movements.MOVING) {
                     referencePos = mp.game.graphics.world3dToScreen2d(posX, posY + 1, posZ);
                  } else {
                     referencePos = mp.game.graphics.world3dToScreen2d(posX + 1, posY, posZ);
                  }

                  if (mainPos == undefined || referencePos == undefined) {
                     return;
                  };
                  
                  let screenDirection = { x: referencePos.x - mainPos.x, y: referencePos.y - mainPos.y };
                  let magnitude = cursorDirection.x * screenDirection.x + cursorDirection.y * screenDirection.y;

                  if (editing.movement == Movements.MOVING) {
                     editing.object.position = new mp.Vector3(posX, posY + magnitude * editing.positionSensitivity, posZ);
                  } else {
                     editing.object.rotation = new mp.Vector3(rotX, rotY - magnitude * editing.rotationSensitivity, rotZ);
                  }
                  break;
               }

               case Directions.Z: {
                  const mainPos = mp.game.graphics.world3dToScreen2d(posX, posY, posZ);
                  let referencePos = mp.game.graphics.world3dToScreen2d(posX, posY, posZ + 1);

                  if (mainPos == undefined || referencePos == undefined) {
                     return;
                  };
                  
                  let screenDirection = { x: referencePos.x - mainPos.x, y: referencePos.y - mainPos.y };
                  let magnitude = cursorDirection.x * screenDirection.x + cursorDirection.y * screenDirection.y;

                  if (editing.movement == Movements.MOVING) {
                     editing.object.position = new mp.Vector3(posX, posY, posZ + magnitude * editing.positionSensitivity);
                  } else {
                     editing.object.rotation = new mp.Vector3(rotX, rotY, rotZ - magnitude * editing.rotationSensitivity);
                  }
                  break;
               }
            }

            if (editing.automaticGround) {
               setProperlyOnGround(editing.object);
            }
            
            oldCursorPosition = [cursorPositionX, cursorPositionY];

            Browser.call('BROWSER::BUILDER:UPDATE_POSITION', editing.object.position);
            Browser.call('BROWSER::BUILDER:UPDATE_ROTATION', editing.object.rotation);

         }
      }
   }
};


const createObject = (model: string) => {
   const { position, dimension } = mp.players.local;

   const created = objects.push( 
      { 
         temporary: true, 
         model: model, 
         gameObject: mp.objects.new(mp.game.joaat(model), new mp.Vector3(position.x + 2, position.y + 2, position.z), {
            alpha: 255, dimension: dimension
         })
      }
   );

   return objects[created].gameObject;
};


export const changeModel = (model: string) => {
   if (editing.object) {
      editing.object.model = mp.game.joaat(model);
   }
}


export const save = async (name?: string) => {
   if (!editing.object) {
      return;
   }
   
   const object = objects.find(object => object.gameObject?.id == editing.object!.id);

   if (object?.temporary) {
      const response = await mp.events.callRemoteProc('SERVER::BUILDER:OBJECT_CREATE', editing.object.model, editing.object.position, editing.object.rotation, name);
      if (response) {
         object.temporary = false;
         object.databaseID = response.id;
      }
   } else { 
      mp.events.callRemote('SERVER::BUILDER:OBJECT_SAVE', object?.databaseID, editing.object.position, editing.object.rotation, name);
   }

}

const removeObject = () => {
   if (!editing.object) {
      return;
   }

   const object = objects.find(object => object.gameObject!.id == editing.object!.id);

   if (object?.temporary) { 
      const index = objects.indexOf(object);
      objects.splice(index, 1);
   } else { 
      mp.events.callRemote('SERVER::BUILDER:OBJECT_DELETE', object?.databaseID); 
   }

   object?.gameObject?.destroy();
};


const setProperlyOnGround = (object: ObjectMp) => {
   if (object.doesExist()) {
      object.placeOnGroundProperly();
      let position = object.getCoords(true);
      let rotation = object.getRotation(2);
      object.position = new mp.Vector3(position.x, position.y, position.z);
      object.rotation = new mp.Vector3(rotation.x, rotation.y, rotation.z);
   }
};


const select = (gameObject: ObjectMp | null) => {
   if (!gameObject) {
      editing.active = false;
      editing.object = null;
   } else { 
      editing.active = true;
      editing.object = gameObject;

      Browser.call('BROWSER::BUILDER:UPDATE_POSITION', editing.object.position);
      Browser.call('BROWSER::BUILDER:UPDATE_ROTATION', editing.object.rotation);

      const object = objects.find(object => object.gameObject!.id == gameObject.id); 

      Browser.call('BROWSER::BUILDER:UPDATE_OBJECT_STATUS', object?.temporary);
   }
}


const click = (x: number, y: number, upOrDown: string, leftOrRight: string, relativeX: number, relativeY: number, worldPosition: Vector3Mp, hitEntity: number) => {
   if (editing.active && editing.clickSelectMode) {
      const hitedObject = clickEntity(worldPosition, mp.players.local);
      mp.gui.chat.push(JSON.stringify(hitedObject));
   }
};


const setMovement = (i: Movements) => {
   editing.movement = i;
   mp.gui.chat.push(JSON.stringify(editing.object?.rotation))
}


const automaticGround = (toggle: boolean) => {
   editing.automaticGround = toggle;
}

const setDirection = (i: Directions) => {
   editing.direction = i;
}


mp.events.add('CLIENT::BUILDER:SET_MOVEMENT', setMovement);
mp.events.add('CLIENT::BUILDER:SET_AUTOMATIC_GROUND', automaticGround);
mp.events.add('CLIENT::BUILDER:SET_DIRECTION', setDirection);
mp.events.add('CLIENT::BUILDER:OBJECT_SAVE', save);
mp.events.add('CLIENT::BUILDER:OBJECT_DELETE', removeObject);

export {}