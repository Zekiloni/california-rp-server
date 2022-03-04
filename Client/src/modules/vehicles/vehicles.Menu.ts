import { Browser } from '../../browser';


let vehiclesMenu: boolean = false;


const toggleVehiclesMenu = (info: string) => {
   vehiclesMenu = !vehiclesMenu;

   Browser.call(vehiclesMenu ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'vehiclesMenu');

   if (vehiclesMenu) {
      Browser.call('BROWSER::VEHICLES:MENU', info);
   }
};



mp.events.add('CLIENT::VEHICLES:MENU', toggleVehiclesMenu)