'use strict';

import { JobConfig } from '@configs';
import { colors, Lang } from '@constants';
import { Houses } from '@models';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { VehiclePoint } from '@interfaces';
import { Jobs } from '../job.model';



class PostalJob extends Jobs {
   deliveredPoints: number[] = [];
   vehicle_position: VehiclePoint = {
      position: new mp.Vector3(129.9908, 87.6114, 81.9316),
      rotation: new mp.Vector3(0, 0, -109)
   };

   constructor (id: number, name: string, desc: string, position: Vector3Mp, sprite: number, spriteColor: number) {
      super(id, name, desc, position, sprite, spriteColor);
   }

   createDelivery (player: PlayerMp) {
      Houses.findOne({
         where: {
            id: { [Op.notIn]: this.deliveredPoints }
         },
         order: [
            Sequelize.fn('RAND')
         ]
      }).then(houseFound => {
         if (!houseFound) {
            return;
         }

         console.log(houseFound.id)
         console.log(houseFound.position)

         player.call('CLIENT::POSTAL_POINT', [houseFound.id, houseFound.position]);
         player.message(Lang.POSTAL_STARTED, colors.hex.Help);
      })
   }

   start (player: PlayerMp) {
      if (player.character.working) 
         return;

      this.createDelivery(player);
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

   deliver (player: PlayerMp, street: string, houseNumber: number) {
      console.log(`Street ${street}, number ${houseNumber}`);
      console.log(this)
      console.log(this.deliveredPoints)
      // this.deliveredPoints.push(houseNumber);
      player.message(`Uspešno ste dostavili pošiljku ${street} No. ${houseNumber} !`, colors.hex.Info);
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



mp.events.add('SERVER::POSTAL_NEXT', postal.deliver);