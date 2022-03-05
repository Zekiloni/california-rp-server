import { Browser } from '../../browser';


let vehiclesMenu: boolean = false;


const toggleVehiclesMenu = (info: string) => {
   vehiclesMenu = !vehiclesMenu;

   Browser.call(vehiclesMenu ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'vehiclesMenu');

   if (vehiclesMenu) {
      Browser.call('BROWSER::VEHICLES:MENU', info);
   }
};


const vehicleMenuAction = (vehicleID: number, action: string) => {
   return mp.events.callRemoteProc('SERVER::VEHICLE:MENU_ACTION', vehicleID, action).then(info => {
      return info;
   });
}


mp.events.add('CLIENT::VEHICLES:MENU', toggleVehiclesMenu);
mp.events.addProc('CLIENT::VEHICLES:MENU_ACTION', vehicleMenuAction);