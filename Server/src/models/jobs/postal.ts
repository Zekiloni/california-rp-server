'use strict';

import { JobConfig } from '@configs';
import { colors, Lang } from '@constants';
import { Houses } from '@models';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { Jobs } from '../job.model';
import { VehiclePoint } from '@interfaces/vehicle.interfaces';



class PostalJob extends Jobs {
   deliveredPoints: number[] = [];
   vehicle_position: VehiclePoint = {
      position: new mp.Vector3(129.9908, 87.6114, 81.9316),
      rotation: new mp.Vector3(0, 0, -109)
   };

   constructor (id: number, name: string, desc: string, position: Vector3Mp, sprite: number, spriteColor: number) {
      super(id, name, desc, position, sprite, spriteColor);
   }

   getDeliveryPoint () {
      return Houses.findOne({
         where: {
            id: { [Op.notIn]: this.deliveredPoints }
         },
         order: [
            Sequelize.fn('RAND')
         ]
      })
   }

   start (player: PlayerMp) {
      if (player.character.working) 
         return;

      console.log('postal start 1')

      this.getDeliveryPoint().then(packagePoint => {
         if (!packagePoint)
            return;

         console.log('postal start 2')
         player.call('CLIENT::POSTAL:POINT', [packagePoint.id, packagePoint.position]);
         player.message(Lang.POSTAL_STARTED, colors.hex.Help);
      }) 
   }

   stop (player: PlayerMp) {
      if (!player.character.working) 
         return;
         
      console.log('postal stop 1')
      if (player.character.getJobVehicle) {
         player.character.getJobVehicle.destroy();
      }
      console.log('postal stop 2')

      player.character.completedShifts ++;

   }

   deliver (player: PlayerMp, houseID: number) {
      if (!player.character.working)
         return;
      
      this.deliveredPoints.push(houseID);

   }
}


export const postal = new PostalJob(
   JobConfig.job.POSTAL,
   JobConfig.names.POSTAL,
   JobConfig.descriptions.POSTAL,
   JobConfig.positions.POSTAL,
   JobConfig.sprites.POSTAL,
   JobConfig.colors.POSTAL
);

