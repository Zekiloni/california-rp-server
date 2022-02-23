
import { Browser } from '../../browser';
import { changeModel, toggleBuilder } from './builder';
import availableObjects from './builder.Objects';


let active: boolean = false;


const openObjectsMenu = () => {
   active = !active;

   Browser.call(active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'objectsMenu');

   if (active) {

      const firstModel = availableObjects[0].objects[0];
      toggleBuilder(true, firstModel);

      Browser.call('BROWSER::BUILDER:OBJECTS_MENU', availableObjects);
   } else { 
      toggleBuilder(false);
   }
}


const previewModel = (category: number, item: number) => {
   const model = availableObjects[category].objects[item];
   
   if (!model) {
      return;
   }

   changeModel(model);
}


mp.events.add('CLIENT::BUILDER:MENU_TOGGLE', openObjectsMenu);
mp.events.add('CLIENT::BUILDER:MODEL_PREVIEW', previewModel);
