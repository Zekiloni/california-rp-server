

import { Browser } from '../../browser';
import controls from '../../enums/controls';
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



let property: Property | null = null;
let newObject: boolean = false;


let editing: BuilderConfig = {
   active: false,
   object: null,
   movement: Movements.MOVING,
   direction: Directions.X,
   automaticGround: false,
   clickSelectMode: false,
   positionSensitivity: 50,
   rotationSensitivity: 800
}


const toggleBuilder = (toggle: boolean, type?: PropertyType, id?: number) => {
   editing.active = toggle;

   if (editing.active && type && id) { 
      mp.events.add('render', editor);
      mp.events.add(RageEnums.EventKey.CLICK, click);
      Browser.call('BROWSER::SHOW', 'objectEditor');

      property = {
         type: type,
         id: id
      };
      
      const created = createObject('prop_patio_lounger1_table');
      select(created);

   } else { 
      mp.events.remove('render', editor);
      mp.events.remove(RageEnums.EventKey.CLICK, click);

      newObject = false;
      mp.gui.cursor.show(false, false);
      editing.active = false;

      Browser.call('BROWSER::HIDE', 'objectEditor');

      if (editing.object) {
         editing.object.destroy();
      }
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
         }
      }
   }
};


const createObject = (model: string) => {
   const { position, dimension } = mp.players.local;
   mp.gui.chat.push('Created Object')

   const createdObject = mp.objects.new(mp.game.joaat(model), new mp.Vector3(position.x + 2, position.y + 2, position.z), {
         alpha: 255, dimension: dimension
      }
   );

   newObject = true;
   mp.gui.chat.push('Created Object 2')

   return createdObject;
};


const removeObject = (object: ObjectMp) => {
   if (!object) {
      return;
   }

   const rObject = objects.get(object.id);

   if (rObject) {
      objects.delete(rObject.id);
      // update interior ....
   }

   object.destroy();
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


const select = (object: ObjectMp | null) => {
   if (!object) {
      editing.active = false;
      editing.object = null;
   } else { 
      editing.active = true;
      editing.object = object;
      Browser.call('BROWSER::BUILDER:UPDATE_POSITION', editing.object.position);
      Browser.call('BROWSER::BUILDER:UPDATE_ROTATION', editing.object.rotation);
   }
}


const changeModel = (model: string) => {
   if (editing.object) {
      editing.object.model = mp.game.joaat(model);
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


mp.events.add('CLIENT::INTERIOR:BUILDER:TOGGLE', toggleBuilder)
mp.events.add('CLIENT::BUILDER:SET_MOVEMENT', setMovement);
mp.events.add('CLIENT::BUILDER:SET_AUTOMATIC_GROUND', automaticGround);
mp.events.add('CLIENT::BUILDER:SET_DIRECTION', setDirection);


mp.keys.bind(controls.F2, true, function () {
   if (editing.active) {
      toggleBuilder(false);
   } else { 
      toggleBuilder(true, 1, 1);
   }
})



export {}