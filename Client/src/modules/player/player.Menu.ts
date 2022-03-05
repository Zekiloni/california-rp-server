import { Browser } from '../../browser';
import controls from "../../enums/controls";


let panelActive: boolean = false;


const togglePanel = async () => {

   if (!mp.players.local.getVariable('LOGGED_IN') || !mp.players.local.getVariable('SPAWNED')) {
      return;
   }

   if (mp.players.local.isTypingInTextChat) {
      return;
   }

   panelActive = !panelActive;

   Browser.call(panelActive ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'playerMenu');

   if (panelActive) {
      mp.events.callRemoteProc('SERVER::PLAYER_MENU').then(menuStaff => {
         Browser.call('BROWSER::PLAYER_MENU:INFO', menuStaff);
      })
   }
}


const panelAction = async (action: string, value: string | number | boolean) => {

   
};


mp.keys.bind(controls.KEY_M, true, togglePanel);
mp.events.add('CLIENT::PLAYER_MENU:TOGGLE', togglePanel);