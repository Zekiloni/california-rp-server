import { Browser } from "../../../browser";


interface gsIPlayer extends PlayerMp {
   isFilling?: boolean
}

(<gsIPlayer>mp.players.local).isFilling = false;


const pumpObjects = [
   1339433404, 
   1694452750, 
   1933174915, 
   2287735495
];


let isGasStationActive: boolean = false;

const gasStationMenu = (busines?: object) => {
   if (isNearPump(mp.players.local.position)) {
      if (busines && !isGasStationActive) {
         isGasStationActive = true;
         
         Browser.call('BROWSER::SHOW', 'gasStation');
         Browser.call('BROWSER::GAS_STATION', busines);

      } else if (isGasStationActive) {
         isGasStationActive = false;

         Browser.call('BROWSER::HIDE', 'gasStation');
         
      }
   }
};


export const vehicleFill = (businesID: number, fuelType: number, amount: number) => {
   const { x, y, z } = mp.players.local.position;

   const vehicle = mp.vehicles.getClosest(mp.players.local.position);

   if (vehicle) {
      mp.events.callRemote('SERVER::GAS_STATION_FILL_VEHICLE', businesID, fuelType, amount);
   }
}


export const isNearPump = (position: Vector3Mp) => {
   const { x, y, z } = position;

   for (const pump of pumpObjects) {
      return mp.game.object.getClosestObjectOfType(x, y, z, 2.0, pump, false, true, true);
   }
};



mp.events.add('CLIENT::GAS_STATION_MENU', gasStationMenu);