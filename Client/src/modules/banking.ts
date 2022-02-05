import { Browser } from '../browser';
import controls from '../enums/controls';
import { gameInterface, UI_Status } from './game.UI';


let inBank: boolean = false;

let active = { 
   menu: false,
   atm: false
};


mp.events.add(
   {
      'CLIENT::BANKING:MENU': onEnterBank
   }
);

mp.events.addProc(
   {
      'CLIENT::BANKING:CREATE': async () => {
         const response = await mp.events.callRemoteProc('SERVER::BANKING:CREATE');
         mp.console.logInfo(JSON.stringify(response))
         return response;
      }
   }
);


mp.keys.bind(controls.KEY_E, true, openMenu);


function onEnterBank (toggle: boolean) {
   inBank = toggle;
}

let UIstatus: UI_Status;

function openMenu () {
   if (!inBank) {
      return;
   }

   if (mp.players.local.isTypingInTextChat) {
      return;
   }

   active.menu = !active.menu;
   Browser.call(active.menu ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'banking');

   if (active.menu) { 
      UIstatus = gameInterface.status;
      gameInterface.mainInterface(UI_Status.HIDDEN);
      mp.game.graphics.transitionToBlurred(1000);
   } else { 
      gameInterface.mainInterface(UIstatus!);
      mp.game.graphics.transitionFromBlurred(1000);
   }
}

