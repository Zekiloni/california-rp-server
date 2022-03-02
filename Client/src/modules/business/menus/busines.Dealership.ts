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


const openDealership = (info: any) => {
   dealershipMenu = !dealershipMenu;
   
   Browser.call(
      dealershipMenu ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'dealershipMenu'
   );
   
   if (dealershipMenu) {
      const position = new mp.Vector3(info.previewPoint.x, info.previewPoint.y, info.previewPoint.z);
   
      if (businesInfo) {
         toggleBusinesInfo(false);
      }

      if (info.spawnPoint) {
         testPoint = new mp.Vector3(info.spawnPoint.x, info.spawnPoint.y, info.spawnPoint.z);
      }

      const createdVehicle = modelPreview(info.products[0].name, new mp.Vector3(position.x, position.y, position.z));

      if (createdVehicle) {
         vehiclePreviewCamera(true, createdVehicle!);
      }

   } else { 
      if (vehicle) {
         vehicle.destroy();
      }
      
      vehiclePreviewCamera(false);
   }

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


const changeColor = (primaryColor: RGB, secondaryColor: RGB) => {
   if (dealershipMenu && vehicle) {
      const [primaryR, primaryG, primaryB] = primaryColor;
      const [secondaryR, secondaryG, secondaryB] = secondaryColor;

      vehicle.setCustomPrimaryColour(primaryR, primaryG, primaryB);
      vehicle.setCustomSecondaryColour(secondaryR, secondaryG, secondaryB);
   }
}


const modelPreview = (model: string, position?: Vector3Mp) => {
   if (vehicle) {
      vehicle.model = mp.game.joaat(model);
   } else {
      vehicle = mp.vehicles.new(
         mp.game.joaat(model), position!, {
            alpha: 255, engine: false, numberPlate: 'dealership'
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
