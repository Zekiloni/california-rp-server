
import { Browser } from '../../../browser';
import controls from '../../../enums/controls';


let active: boolean = false;


mp.events.add(
   {
      'CLIENT::BUSINESS:RENT:MENU': openRentMenu
   }
);


function openRentMenu (info: string | false) {
   active = !active;
   Browser.call(active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'rentMenu');

   if (!active) {
      return;
   }

   Browser.call('BROWSER::RENT:MENU', info);
};


mp.keys.bind(controls.KEY_E || controls.ENTER, true, function () {
   if (active) {
      active = false;
      Browser.call('BROWSER::HIDE', 'rentMenu');
   }
});



