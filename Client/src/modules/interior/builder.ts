

import { Browser } from '../../browser';
import controls from '../../enums/controls';
import { getCursorData } from '../../utils';
import { screenResolution } from '../core';
import clickEntity from '../utils/click.Entity';
import { objects } from './loader';


enum Movements {
   MOVING, ROTATION
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
   moveSensitivity: number
   rotateSensitivity: number
   movement: Movements
   automaticGround: boolean
   clickSelectMode: boolean
   object: ObjectMp | null
};


let property: Property | null = null;
let newObject: boolean = false;

let editing: BuilderConfig = {
   active: false,
   moveSensitivity: 50,
   rotateSensitivity: 800,
   movement: Movements.MOVING,
   clickSelectMode: false,
   object: null,
   automaticGround: false
}


const toggleBuilder = (toggle: boolean, type?: PropertyType, id?: number) => {
   editing.active = toggle;

   if (editing.active && type && id) { 
      mp.events.add('render', editor);
      mp.events.add(RageEnums.EventKey.CLICK, click);
      mp.gui.chat.push('Builder Activated')

      property = {
         type: type,
         id: id
      };
      
      const created = createObject('v_res_m_dinetble');
      editing.active = true;
      editing.object = created;

   } else { 
      mp.events.remove('render', editor);
      mp.events.remove(RageEnums.EventKey.CLICK, click);

      newObject = false;
      mp.gui.cursor.show(false, false);
      editing.active = false;

      if (editing.object) {
         editing.object.destroy();
      }
   }
}


const editor = () => {
   if (editing.active) {
      if (editing.object) {
         if (mp.keys.isDown(32) === true && !mp.players.local.isTypingInTextChat) { 
            mp.gui.cursor.show(false, false);
         } else {
            mp.gui.cursor.show(true, true);
         }

         const cameraPositon = mp.cameras.new('gameplay').getCoord();
         const hoverPosition = mp.game.graphics.screen2dToWorld3d(new mp.Vector3(mp.gui.cursor.position[0], mp.gui.cursor.position[1], 0));
         const groundZ = mp.game.gameplay.getGroundZFor3dCoord(hoverPosition.x, hoverPosition.y, hoverPosition.z + 5, 0.0, false);
         mp.game.graphics.drawLine(hoverPosition.x, hoverPosition.y, hoverPosition.z, hoverPosition.x, hoverPosition.y, hoverPosition.z + 2, 255, 0, 0, 255);

         // if (mp.raycasting.testPointToPoint(cameraPositon, hoverPosition)) {
         //    editing.object.setAlpha(100);
         // }

         const { position, rotation } = editing.object;

         mp.game.graphics.drawLine(position.x - 1.5, position.y, position.z, position.x + 1.5, position.y, position.z, 0, 0, 255, 255);
         mp.game.graphics.drawLine(position.x, position.y - 1.5, position.z, position.x, position.y + 1.0, position.z, 255, 0, 0, 255);
         mp.game.graphics.drawLine(position.x, position.y, position.z - 1.5, position.x, position.y, position.z + 1.5, 0, 255, 0, 255);


         if (mp.keys.isDown(0x02)) {
            let { deltaX, deltaY } = getCursorData();

            const newPosition = mp.game.graphics.screen2dToWorld3d(new mp.Vector3(deltaX, deltaY, 0));

            switch (editing.movement) {
               case Movements.MOVING: {
                  editing.object.position = new mp.Vector3(hoverPosition.x, hoverPosition.y, hoverPosition.z);
                  setProperlyOnGround(editing.object);
                  Browser.call('BROWSER::BUILDER:UPDATE_POSITION', editing.object.position);
                  break;
               }
            }
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
      return;
   }

   editing.object = object;
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
}


const automaticGround = (toggle: boolean) => {
   editing.automaticGround = toggle;
}


mp.events.add('CLIENT::INTERIOR:BUILDER:TOGGLE', toggleBuilder)
mp.events.add('CLIENT::BUILDER:SET_MOVEMENT', setMovement);
mp.events.add('CLIENT::BUILDER:SET_AUTOMATIC_GROUND', automaticGround);


mp.keys.bind(controls.F2, true, function () {
   if (editing.active) {
      toggleBuilder(false);
   } else { 
      toggleBuilder(true, 1, 1);
   }
})



export {}