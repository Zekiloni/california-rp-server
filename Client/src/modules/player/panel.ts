import controls from "../../enums/controls";


let panelActive: boolean = false;


const togglePanel = async () => {

   if (!mp.players.local.getVariable('LOGGED_IN') || !mp.players.local.getVariable('SPAWNED')) {
      return;
   }


   panelActive = !panelActive;

   if (panelActive) {
     // const info = mp.events.callRemoteProc('')
   }


}


mp.keys.bind(controls.KEY_M, true, togglePanel);