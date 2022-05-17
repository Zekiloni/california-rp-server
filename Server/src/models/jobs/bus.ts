import { JobConfig, VehicleConfig } from '@configs';
import { Lang } from '@constants';
import { notifications } from '@enums';
import { VehiclePoint } from '@interfaces';
import { Vehicles } from '@models';
import { Jobs } from '../job.model';
import { dollars, initials, randomInteger } from '@shared';



export const bus = new Jobs(
   JobConfig.job.BUS_DRIVER, 
   JobConfig.names.BUS_DRIVER, 
   JobConfig.descriptions.BUS_DRIVER,
   JobConfig.positions.BUS_DRIVER,
   JobConfig.sprites.BUS_DRIVER,
   JobConfig.colors.BUS_DRIVER
);


bus.vehicle_position = {
   position: new mp.Vector3(461.4018, -582.2833, 28.4970),
   rotation: new mp.Vector3(0, 0, 83)
}


bus.maxShift = 3;

bus.start = function (player: PlayerMp, routeID: number) {
   if (player.character.completedShifts >= player.character.getJob!.maxShift!) {
      return player.notification(Lang.WORKED_MAX_TIMES, notifications.type.ERROR, notifications.time.MED);
   }

   const route = JobConfig.busRoutes[routeID];

   if (!route) {
      return;
   }
   
   const vehiclePoint = <VehiclePoint>this.vehicle_position;
   const vehicleColor: [RGB, RGB] = [
      [0, 0, 0], [0, 0, 0]
   ];

   if (player.character.getJobVehicle) {

   } else {
      Vehicles.new('bus', VehicleConfig.type.JOB, true, player.character.id, vehicleColor, vehiclePoint.position, vehiclePoint.rotation, {
         locked: false, spawned: false, numberplate: {
            issued: Date.now(),
            plate: initials(this.name) + randomInteger(100, 900).toFixed(0),
            expiring: 99999999
         }
      }).then(createdVehicle => {
         if (!createdVehicle) {
            return;
         }

         const vehicle = createdVehicle.load();

         if (!vehicle) {
            return;
         }
      });
   }


   player.character.working = true;
   player.call('CLIENT::BUS_DRIVER:START', [route.points])
};


bus.stop = function (player: PlayerMp, finished: boolean, stations: number) {
   player.outputChatBox('zavrsio si ' + JSON.stringify(stations) + ' stanica');
   player.character.working = false;

   let earned = stations * JobConfig.PRICE_PER_BUS_STATION;
   
   if (finished) {
      player.character.giveMoney(player, earned);
   }

   player.notification(
      finished ? `${Lang.ROUTE_SUCCESFULLY_FINISHED} ${Lang.YOU_EARNED} ${dollars(earned)}.` : ``,
      finished ? notifications.type.SUCCESS : notifications.type.ERROR,
      notifications.time.MED
   )
   
   if (player.character.getJobVehicle) {
      player.character.getJobVehicle.instance.destroy();
   }
};



mp.events.add('SERVER::BUS_DRIVER:FINISH', bus.stop);