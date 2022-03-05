import controls from "../../../enums/controls";




let ALPREnabled: boolean = false;


const toggleALPR = () => {
   ALPREnabled = !ALPREnabled;

   if (ALPREnabled) {
      mp.events.add(RageEnums.EventKey.RENDER, trace);
   } else { 
      mp.events.remove(RageEnums.EventKey.RENDER, trace);
   }
};


const trace = () => {
   if (mp.players.local.vehicle) {
      const vehicle = mp.players.local.vehicle;

      const ForwardPosition = vehicle.getOffsetFromInWorldCoords(0.0, 10, 0.0);
      const BackwardPosition = vehicle.getOffsetFromInWorldCoords(0.0, -10, 0.0);
      
      const ForwardVehicle = mp.raycasting.testPointToPoint(vehicle.position, ForwardPosition);
      const BackwardVehicle = mp.raycasting.testPointToPoint(vehicle.position, BackwardPosition);

      if (!ForwardVehicle) {
         mp.game.graphics.drawLine(vehicle.position.x, vehicle.position.y, vehicle.position.z, ForwardPosition.x, ForwardPosition.y, ForwardPosition.z, 255, 255, 255, 255);
      } else {
         mp.game.graphics.drawLine(vehicle.position.x, vehicle.position.y, vehicle.position.z, ForwardPosition.x, ForwardPosition.y, ForwardPosition.z, 0, 255, 0, 255);
      }
   }
}


mp.keys.bind(controls.KEY_N, true, toggleALPR);


export {};
