
import { Browser } from '../../browser';


let active: boolean = false;

mp.events.addProc('CLIENT::ITEMS:RADIO:TOGGLE', toggleRadio);

function toggleRadio (info: any) {
   active = !active;
   Browser.call(active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'handheldRadio');

   if (active && info) {
      Browser.call('BROWSER::HANDHELD_RADIO', info);
   }

   return active;
}
