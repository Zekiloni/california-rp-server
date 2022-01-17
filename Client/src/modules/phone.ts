import { Browser } from "../browser";




let active: boolean = false;

mp.events.add(
   {
      'CLIENT::PHONE:TOGGLE': (toggle: boolean) => { 
         active = toggle;
         Browser.call(toggle ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'Phone');
      }
   }
);