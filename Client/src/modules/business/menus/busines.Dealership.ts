import { Browser } from "../../../browser";
import { DealershipTestDrve } from "../../../interfaces/business";
import { vehiclePreviewCamera } from "../../utils/vehicle.pCamera";
import { businesInfo, toggleBusinesInfo } from "../business.Core";


let dealershipMenu: boolean = false;
let vehicle: VehicleMp | null = null;
let testPoint: Vector3Mp | null = null;

const time = 5 * 1000;

let testing: DealershipTestDrve = {
   previous: {
      position: null,
      dimension: null
   },
   active: false,
   vehicle: null,
   timer: null
};


const openDealership = (info?: any) => {
   dealershipMenu = !dealershipMenu;
   
   Browser.call(
      dealershipMenu ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'dealershipMenu'
   );
   
   if (dealershipMenu) {
      const position = new mp.Vector3(info.preview_Point.x, info.preview_Point.y, info.preview_Point.z);

      if (businesInfo) {
         toggleBusinesInfo(false);
      }

      if (info.spawnPoint) {
         testPoint = new mp.Vector3(info.spawnPoint.x, info.spawnPoint.y, info.spawnPoint.z);
      }

      Browser.call('BROWSER::DEALERSHIP:MENU', info);
      const createdVehicle = modelPreview(info.products[0].name, new mp.Vector3(position.x, position.y, position.z), info.name);

      if (createdVehicle) {
         vehiclePreviewCamera(true, createdVehicle!);
      }

   } else { 
      if (vehicle) {
         vehicle.destroy();
         vehicle = null;
      }

      vehiclePreviewCamera(false);
   }

};


const buyVehicle = (businesID: number, productID: number) => {
   const color = [vehicle?.getColor(0, 0, 0), vehicle?.getColor(1, 1, 1)];
   mp.gui.chat.push(JSON.stringify(color))

   mp.events.callRemoteProc('SERVER::DEALERSHIP:BUY', businesID, productID, JSON.stringify(color)).then((isPurchased: boolean) => { 
      if (isPurchased) {
         openDealership();
      }
   })
};


const testingDrive = (toggle: boolean, model?: string) => {
   testing.active = toggle;

   if (!testing.active) {
      if (testing.vehicle) {
         vehicle?.destroy();
         mp.players.local.position = testing.previous.position!;
         mp.players.local.dimension = testing.previous.dimension!;
         clearTimeout(testing.timer!);
         testing.timer = null;
      }
   } else { 
      
      testing.previous = {
         position: mp.players.local.position,
         dimension: mp.players.local.dimension
      }

      testing.timer = setTimeout(() => {
         testingDrive(false);
      }, time);

   }
};


const changeColor = (primaryColor: number, secondaryColor: number) => {
   if (dealershipMenu && vehicle) {
      vehicle.setColours(primaryColor, secondaryColor);
   }
}


const modelPreview = (model: string, position?: Vector3Mp, numberPlate?: string) => {
   if (vehicle) {
      vehicle.model = mp.game.joaat(model);
   } else {
      vehicle = mp.vehicles.new(
         mp.game.joaat(model), position!, {
            alpha: 255, engine: false, numberPlate: numberPlate
         }
      );
   } 

   vehicleInfo(
      mp.game.joaat(model)
   );

   return vehicle;
}


const vehicleInfo = (model: number) => {
   Browser.call(
      'BROWSER::DEALERSHIP:VEHICLE_INFO',
      mp.game.ui.getLabelText(mp.game.vehicle.getDisplayNameFromVehicleModel(model)),
      mp.game.vehicle.getVehicleClassFromName(model),
      ((mp.game.vehicle.getVehicleModelMaxSpeed(model) * 3.6).toFixed(0)),
      mp.game.vehicle.getVehicleModelMaxBraking(model),
      mp.game.vehicle.getVehicleModelAcceleration(model),
      mp.game.vehicle.getVehicleModelMaxTraction(model),
      mp.game.vehicle.getVehicleModelMaxNumberOfPassengers(model)
   );
}

mp.events.add('CLIENT::DEALERSHIP:MENU', openDealership);
mp.events.add('CLIENT::DEALERSHIP:COLOR', changeColor);
mp.events.add('CLIENT::DEALERSHIP:TEST_DRIVE', testingDrive);
mp.events.add('CLIENT::DEALERSHIP:PREVIEW', modelPreview);
mp.events.add('CLIENT::DEALERSHIP:BUY', buyVehicle)
