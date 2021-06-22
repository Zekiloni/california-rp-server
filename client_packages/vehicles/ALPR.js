

const Player = mp.players.local;
let Vehicles = { Front: null, Back: null }, browser = null, opened = false;

mp.events.add({

   'client:vehicle.alpr': () => {      
      opened = true;
   },

   'render': () => {
      if (opened && Player.vehicle) {
         ALPR();
      }
      
   },
})


function ALPR () {
   const Vehicle = Player.vehicle;
   const ForwardPosition = Vehicle.getOffsetFromInWorldCoords(0.0, 10, 0.0),
         BackwardPosition = Vehicle.getOffsetFromInWorldCoords(0.0, -10, 0.0);

   const ForwardVehicle = mp.raycasting.testPointToPoint(Vehicle.position, ForwardPosition, null, 2),
         BackwardVehicle = mp.raycasting.testPointToPoint(Vehicle.position, BackwardPosition, null, 2);

   if (ForwardVehicle) { // speed*3.6
      Vehicles.Front = ForwardVehicle;
      const Speed = ForwardVehicle.getSpeed() * 3.6;
      mp.gui.chat.push(JSON.stringify(Speed));

   } 
   if (BackwardVehicle) {
      Vehicles.Back = BackwardVehicle;
      const Speed = BackwardVehicle.getSpeed() * 3.6;
      mp.gui.chat.push(JSON.stringify(Speed));
   }
}

/*  let 

         mp.vehicles.forEachInRange(ForwardPosition, 5,
            (vehicle) => {
               DetectedVehicles.push(vehicle);
               break;
            }
         );
         mp.vehicles.forEachInRange(BackwardPosition, 5,
            (vehicle) => {
               DetectedVehicles.push(vehicle);
               break;
            }
         );
*/