

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
   /*
   const ForwardVehicle = mp.raycasting.testPointToPoint(Vehicle.position, ForwardPosition), 
         BackwardVehicle = mp.raycasting.testPointToPoint(Vehicle.position, BackwardPosition);*/

   const ForwardVehicle = mp.raycasting.testCapsule(Vehicle.position, ForwardPosition, 10, Player, 2), 
         BackwardVehicle = mp.raycasting.testCapsule(Vehicle.position, BackwardPosition, 10, Player, 2);

   // Returna: object: position (Entity Coordinates) , surfaceNormal, material (Entity Model) , entity (Handle)

   if (ForwardVehicle && ForwardVehicle.entity.type == 'vehicle' ) { 
      Vehicles.Front = ForwardVehicle.entity;
      const Speed = Math.round(Vehicles.Front.getSpeed() * 3.6);
      mp.gui.chat.push(JSON.stringify(Speed));
   } 
   if (BackwardVehicle && BackwardVehicle.entity.type == 'vehicle' ) { 
      Vehicles.Back = BackwardVehicle.entity; 
      const Speed = Math.round(Vehicles.Back.getSpeed() * 3.6);
      mp.gui.chat.push(JSON.stringify(Speed));
   }
}