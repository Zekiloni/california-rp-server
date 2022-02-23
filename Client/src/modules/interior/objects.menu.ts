
import { mode } from '../../../webpack.config';
import { Browser } from '../../browser';
import { changeModel, toggleBuilder } from './builder';
import availableObjects from './builder.Objects';

let active: boolean = false;

let selected: { category: number, item: number } | null = null;


const openObjectsMenu = (property: number, id: number) => {
   active = !active;

   Browser.call(active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'objectsMenu');

   if (active) {
      selected = {
         category: 0,
         item: 0
      };

      const firstModel = availableObjects[selected.category].objects[selected.item];
      toggleBuilder(true, property, id, firstModel);
   } else { 

      selected = null;
      
   }
}


const previewModel = (category: number, item: number) => {
   if (selected) {
      selected.category = category;
      selected.item! = item;
      const model = availableObjects[category].objects[item];
      changeModel(model);
   }
}
