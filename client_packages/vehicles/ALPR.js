

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

   const ForwardVehicle = mp.raycasting.testPointToPoint(Vehicle.position, ForwardPosition, [Player.vehicle]),
         BackwardVehicle = mp.raycasting.testPointToPoint(Vehicle.position, BackwardPosition, [Player.vehicle]);

   if (ForwardVehicle && ForwardVehicle.entity.type == 'vehicle') { // speed*3.6
      Vehicles.Front = ForwardVehicle.entity;
      const Speed = Vehicles.Front.getSpeed() * 3.6;
      mp.gui.chat.push(JSON.stringify(Speed));

   } 
   if (BackwardVehicle && ForwardVehicle.entity.type == 'vehicle') {
      Vehicles.Back = BackwardVehicle.entity;
      const Speed = Vehicles.Back.getSpeed() * 3.6;
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