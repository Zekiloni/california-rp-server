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
   mp.events.callRemote('SERVER::PLAYER_MENU:ACTION', action, value);
};


const report = (message: string) => {
   return mp.events.callRemoteProc('SERVER::PLAYER:REPORT', message).then(created => {
      return created;
   })
}

const deleteReport = () => {
   return mp.events.callRemoteProc('SERVER::PLAYER:DELETE_REPORT').then(isDeleted => {
      return isDeleted;
   });
}

const reportResponse = (answer: string) => {
   Browser.call('BROWSER::PLAYER_PANEL:REPORT_RESPONSE', answer);
}



mp.keys.bind(controls.KEY_M, true, togglePanel);
mp.events.add('CLIENT::PLAYER_MENU:TOGGLE', togglePanel);
mp.events.add('CLIENT::PLAYER_MENU:ACTION', panelAction);
mp.events.add('CLIENT::PLAYER_MENU:REPORT_RESPONSE', reportResponse);
mp.events.addProc('CLIENT::PLAYER_MENU:REPORT', report);
mp.events.addProc('CLIENT::PLAYER_MENU:DELETE_REPORT', deleteReport)