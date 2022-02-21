

import { objects } from './loader';

let active: boolean = false;

enum Movements {
   MOVING, ROTATION
}

enum Modes {
   KEYBOARD, MOUSE
}

enum PropertyType { 
   HOUSE, BUSINES
}

interface Property { 
   type: PropertyType | null,
   id: number | null
}

interface BuilderConfig {
   active: boolean
   sensitivity: number
   mode: Modes
   moving: Movements
   automaticGround: boolean
   clickSelect: boolean
   object: ObjectMp | null
};


let property: Property | null = null;
let newObject: boolean = false;

let editing: BuilderConfig = {
   active: false,
   sensitivity: 0.015,
   moving: Movements.MOVING,
   mode: Modes.KEYBOARD,
   clickSelect: false,
   object: null,
   automaticGround: false
}


const toggleBuilder = (toggle: boolean, type?: PropertyType, id?: number) => {
   active = toggle;

   if (active && type && id) { 
      mp.events.add('render', editor);
      property = {
         type: type,
         id: id
      };
   } else { 
      mp.events.remove('render', editor);
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
      }
      
   }
};


const createObject = (model: string) => {
   
   newObject = true;
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

   editing.object = objects.get(object.id)!;
}


const switchMode = (mode: Modes) => {
   editing.mode = mode;
}


const click = (x: number, y: number, upOrDown: string, leftOrRight: string, relativeX: number, relativeY: number, worldPosition: Vector3Mp, hitEntity: number) => {
   if (active && editing.clickSelect) {
      mp.gui.chat.push(JSON.stringify(hitEntity));
   }
};


mp.events.add(RageEnums.EventKey.CLICK, click);
mp.events.add('CLIENT::INTERIOR:BUILDER:TOGGLE', toggleBuilder)


export {}