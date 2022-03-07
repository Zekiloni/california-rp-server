import { Browser } from '../../browser';
import controls from '../../enums/controls';
import { inventoryActive } from './items.Core';


let phoneActive: boolean = false;
let phoneMouse: boolean = false;

mp.events.addDataHandler(
   {
      'PHONE_RING': (entity: EntityMp, value: boolean, oldvValue: boolean) => { 
         if (entity.type == 'player' && value != oldvValue) { 
            // turn on ring sound
         }
      }
   }
)


const togglePhone = (info?: string) => {
   phoneActive = !phoneActive;
   
   if (inventoryActive) {
      mp.events.call('CLIENT::INVENTORY:TOGGLE');
   }

   Browser.call(phoneActive ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'phone');

   if (phoneActive) {
      phoneMouse = true;
      mp.keys.bind(controls.F4, true, togglePhoneMouse);
   } else { 
      phoneMouse = false;
      mp.keys.unbind(controls.F4, true, togglePhoneMouse);
   }
}


const togglePhoneMouse = () => {
   phoneMouse = !phoneMouse;
   mp.gui.cursor.show(phoneMouse, phoneMouse);
}


mp.events.add('CLIENT::PHONE:TOGGLE', togglePhone);