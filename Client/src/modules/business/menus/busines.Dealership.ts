import { Browser } from "../../../browser";
import { DealershipTestDrve } from "../../../interfaces/business";


let active: boolean = false;
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


const openDealership = (info: string) => {
   active = !active;
   
   Browser.call(
      active ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'dealershipMennu'
   );
   
   if (active) {
      const position = JSON.parse(info).vehicle_point;
      const firstModel = JSON.parse(info).products[0].name;
   
      const spawnPoint = JSON.parse(info).spawn_point;
      testPoint = new mp.Vector3(spawnPoint.x, spawnPoint.y, spawnPoint.z);

      vehicle = mp.vehicles.new(
         mp.game.joaat(firstModel), new mp.Vector3(position.x, position.y, position.z), {
            alpha: 255, engine: false, numberPlate: 'dealership'
         }
      );

   } else { 
      if (vehicle) {
         vehicle.destroy();
      }
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
   if (active && vehicle) {
      const [primaryR, primaryG, primaryB] = primaryColor;
      const [secondaryR, secondaryG, secondaryB] = secondaryColor;

      vehicle.setCustomPrimaryColour(primaryR, primaryG, primaryB);
      vehicle.setCustomSecondaryColour(secondaryR, secondaryG, secondaryB);
   }
}


const modelPreview = (model: string) => {
   if (vehicle) {
      vehicle.model = mp.game.joaat(model);
   }
}


mp.events.add('CLIENT::DEALERSHIP:COLOR', changeColor);
mp.events.add('CLIENT::DEALERSHIP:MENU', openDealership);
mp.events.add('CLIENT::DEALERSHIP:TEST_DRIVE', testingDrive);
mp.events.add('CLIENT::DEALERSHIP:PREVIEW', modelPreview);
