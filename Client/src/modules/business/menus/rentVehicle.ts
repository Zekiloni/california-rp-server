
import { Browser } from '../../../browser';
import markEntity from '../../utils/mark.Entity';


let rentVehicleActive: boolean = false;


const rentVehicleMenu = (busines?: object) => {
   rentVehicleActive = !rentVehicleActive;
   Browser.call(rentVehicleActive ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'rentVehicle');

   if (rentVehicleActive) {
      Browser.call('BROWSER::RENT_MENU', busines);
   }
};

const rentVehicle = (businesId: number, vehicleModel: string) => {
   mp.events.callRemoteProc('SERVER::RENT_VEHICLE', businesId, vehicleModel).then(
      (vehicleId: number | null) => vehicleId != null ? markEntity(mp.vehicles.atRemoteId(vehicleId), 3, [200, 200, 200, 255], 1) : null
   )
}


mp.events.add('CLIENT::RENT_VEHICLE_MENU', rentVehicleMenu);
mp.events.add('CLIENT:RENT_VEHICLE', rentVehicle);


