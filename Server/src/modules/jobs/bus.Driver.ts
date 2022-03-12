import { JobConfig, VehicleConfig } from '@configs';
import { VehiclePoint } from '@interfaces';
import { jobs, vehicles } from '@models';
import { initials, randomInteger } from '@shared/utils';



const busDriver = new jobs(
   JobConfig.job.BUS_DRIVER, 
   JobConfig.names.BUS_DRIVER, 
   JobConfig.descriptions.BUS_DRIVER,
   JobConfig.positions.BUS_DRIVER,
   JobConfig.sprites.BUS_DRIVER,
   JobConfig.colors.BUS_DRIVER
);


busDriver.vehicle_position = {
   position: new mp.Vector3(461.4018, -582.2833, 28.4970),
   rotation: new mp.Vector3(0, 0, 83)
}


busDriver.start = function (player: PlayerMp, routeID: number) {
   const route = JobConfig.busRoutes[routeID];

   if (!route) {
      return;
   }
   
   const vehiclePoint = <VehiclePoint>busDriver.vehicle_position;
   const vehicleColor: [RGB, RGB] = [
      [0, 0, 0], [0, 0, 0]
   ];

   const jobVehicle = mp.vehicles.toArray().find(vehicle => vehicle.instance.owner == player.character.id && vehicle.instance.job!.id == busDriver.id);

   if (jobVehicle) {

   } else {
      vehicles.new('bus', VehicleConfig.type.JOB, true, player.character.id, vehicleColor, vehiclePoint.position, vehiclePoint.rotation, {
         locked: false, spawned: false, numberplate: {
            issued: Date.now(),
            plate: initials(busDriver.name) + randomInteger(100, 900).toFixed(0),
            expiring: 99999999
         }
      }).then(createdVehicle => {
         if (!createdVehicle) {
            return;
         }

         console.log(createdVehicle.numberPlate)

         const vehicle = createdVehicle.load();

         if (!vehicle) {
            return;
         }
         
      });
   }


   player.character.working = true;
   player.call('CLIENT::BUS_DRIVER:START', [route.points])
};


busDriver.stop = function (player: PlayerMp, finished: boolean, stations: number) {
   player.outputChatBox('zavrsio si ' + JSON.stringify(stations) + ' stanica')
};



mp.events.add('SERVER::BUS_DRIVER:FINISH', busDriver.stop);