import { Browser } from "../../../browser";


let active: boolean = false;


const openVehicleRent = (info?: string) => {
   active = !active;
   
   Browser.call(
      active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'rentVehileMenu'
   );

   if (active) {
      Browser.call('BROWSER::RENT:MENU', info);
   }
};


const rentVehicle = (businesID: number, vehicleName: string, time: number) => {
   mp.events.callRemoteProc('SERVER::BUSINES:RENT_VEHICLE', businesID, vehicleName, time).then(response => {
      if (response && active) {
         openVehicleRent();
      }
   });
};


mp.events.add('CLIENT::RENT_VEHICLE:TAKE', rentVehicle);
mp.events.add('CLIENT::RENT_VEHICLE:MENU', openVehicleRent);