import { Browser } from "../browser";




let active: boolean = false;


mp.events.addDataHandler(
   {
      'PHONE_RING': (entity: EntityMp, value: boolean, oldvValue: boolean) => { 
         if (entity.type == 'player' && value != oldvValue) { 
            // turn on ring sound
         }
      }
   }
)


mp.events.add(
   {
      'CLIENT::PHONE:TOGGLE': (toggle: boolean) => { 
         active = toggle;
         Browser.call(toggle ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'Phone');
      }
   }
);