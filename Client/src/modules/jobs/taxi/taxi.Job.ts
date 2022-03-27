import { Browser } from '../../../browser';



let taxiMenuActive: boolean = false;


function showTaxiMenu (isWorking?: boolean, activeWorkers?: number, calls?: string) {
   taxiMenuActive = !taxiMenuActive;
   Browser.call(taxiMenuActive ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'taxiMenu');

   if (taxiMenuActive && activeWorkers != undefined && isWorking != undefined && calls != undefined) {
      Browser.call('BROWSER::TAXI_INFO', isWorking, activeWorkers, calls);
   }
}


function startTaxiWork (rentVehicle: boolean) {
   return mp.events.callRemoteProc('SERVER::TAXI:START', rentVehicle).then(isStarted => isStarted);
}


function stopTaxiWork () {
   return mp.events.callRemoteProc('SERVER::TAXI:STOP').then(stopped => stopped);
}


mp.events.add('CLIENT::TAXI:MENU', showTaxiMenu);
mp.events.addProc('CLIENT::TAXI:START', startTaxiWork);
mp.events.addProc('CLIENT::TAXI:STOP', stopTaxiWork);

