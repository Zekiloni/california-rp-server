'use strict';

import { JobConfig } from '@configs';
import { Lang } from '@constants';
import { notifications } from '@enums';
import { Houses } from '@models';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { Jobs } from '../job.model';



class PostalJob extends Jobs {
   deliveredPoints: number[] = [];
   maxShift = 3;

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

      if (player.character.completedShifts >= this.maxShift)
         return player.notification(Lang.WORKED_MAX_TIMES, notifications.type.ERROR, notifications.time.MED);

      
      this.getDeliveryPoint().then(packagePoint => {
         if (!packagePoint)
            return;

         player.call('CLIENT::POSTAL:POINT', [])
      }) 
   }

   stop (player: PlayerMp) {
      if (!player.character.working) 
         return;

      if (player.character.getJobVehicle) {
         player.character.getJobVehicle.destroy();
      }
      

   }

   deliver (player: PlayerMp, houseID: number) {
      if (!player.character.working)
         return;
      
      this.deliveredPoints.push(houseID);
   }
}


const postal = new PostalJob(
   JobConfig.job.POSTAL,
   JobConfig.names.POSTAL,
   JobConfig.descriptions.POSTAL,
   JobConfig.positions.POSTAL,
   JobConfig.sprites.POSTAL,
   JobConfig.colors.POSTAL
);

