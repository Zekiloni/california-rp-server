
import { Browser } from '../../browser';


let active: boolean = false;


mp.events.add(
   {
      'CLIENT::ITEMS:RADIO:TOGGLE': toggleRadio,
      'CLIENT::ITEMS:RADIO:UPDATE': updateRadio
   }
)


function toggleRadio (info?: any) {
   active = !active;
   Browser.call(active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'handheldRadio');

   if (active && info) {
      Browser.call('BROWSER::HANDHELD_RADIO', info);
   }

   if (!active) {
      mp.events.callRemote('SERVER::ANIMATION:STOP');
   }
}


function updateRadio (data: string) {
   mp.events.callRemote('SERVER::ITEMS:RADIO:UPDATE', data);
}