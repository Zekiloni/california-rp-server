import { JobConfig } from '@configs';
import { jobs } from '@models';



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
   
};

busDriver.stop = function (player: PlayerMp, finished: boolean, stations: number) {

};