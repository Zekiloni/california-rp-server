import { Browser } from '../browser';
import controls from '../enums/controls';


let inBank: boolean = false;

let active = { 
   menu: false,
   atm: false
};


mp.events.add(
   {
      'CLIENT::BANK:MENU': onEnterBank
   }
);


mp.keys.bind(controls.KEY_E, true, openMenu);


function onEnterBank (toggle: boolean) {
   inBank = toggle;
}


function openMenu () {
   if (!inBank) {
      return;
   }

   active.menu = !active.menu;
   Browser.call(active.menu ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'banking');
}

