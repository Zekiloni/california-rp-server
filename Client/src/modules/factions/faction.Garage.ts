import { Browser } from "../../browser";



let garageActive: boolean = false;


interface GarageVehicle {
   name: string
   model: string
   livery?: number
}


const toggleGarage = (factionName?: string, vehicles?: GarageVehicle[]) => {
   garageActive = !garageActive;
   Browser.call(garageActive ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'factionGarage');

   if (garageActive) {
      Browser.call('BROWSER::FACTION:GARAGE', factionName, vehicles);
   }
};

mp.events.add('CLIENT::FACTION:GARAGE', toggleGarage);