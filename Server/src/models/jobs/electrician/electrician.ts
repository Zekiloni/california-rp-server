import { JobConfig, VehicleConfig } from '@configs';
import { colors } from '@constants';
import { notifications } from '@enums';
import { Jobs } from '../../job.model';
import { generateString } from '@shared';
import { VehiclePoint } from '@interfaces';
import { Vehicles } from '@models';

const PRICE_PER_BOX = 6;

class Electrician extends Jobs {
   points: Vector3Mp[] = [
      new mp.Vector3(-1390.44445, -440.00338, 36.357540),
      new mp.Vector3(-1295.06176, -625.46051, 26.830947),
      new mp.Vector3(-1425.88928, -643.81494, 28.673368),
      new mp.Vector3(-1253.70520, -874.64697, 12.192554),
      new mp.Vector3(-1172.71411, -1106.0572, 3.3458819),
      new mp.Vector3(-804.217346, -186.51335, 37.311050),
      new mp.Vector3(-884.874389, 446.425567, 86.504791),
      new mp.Vector3(-676.034912, 626.934020, 146.21464),
      new mp.Vector3(-623.020080, 208.436935, 74.186607),
      new mp.Vector3(-185.922241, 219.426193, 88.687248)
   ]

   vehicle_position: VehiclePoint = {
      position: new mp.Vector3(686.7717895507812, 74.45893096923828, 83.06054),
      rotation: new mp.Vector3(-3.10975980758667, 2.132307529449463, 153.1594)
   }

   vehicles: Map<number, VehicleMp> = new Map();

   constructor (id: number, name: string, description: string, position: Vector3Mp, sprite?: number, spriteColor?: number) {
      super(id, name, description, position, sprite, spriteColor);
   }

   getElectricianVehicle (player: PlayerMp) {
      return this.vehicles.get(player.id);
   }

   generatePoints () {
      let randomized: Vector3Mp[] = [];

      for (let i = 0; i < this.points.length; i ++) {
         randomized.push(
            this.points[Math.floor(Math.random() * this.points.length)]
         );
      }

      return randomized;
   }

   start (player: PlayerMp) {
      if (player.character.working) {
         // PORUKA: Already working nigger ;)
         return;
      }
      
      if (!player.vehicle) {
         Vehicles.new('utillitruck3', VehicleConfig.type.JOB, true, player.character.id, [[255, 201, 31], [234, 234, 234]], this.vehicle_position.position, this.vehicle_position.rotation, {
            locked: false, spawned: false, numberplate: {
               issued: Date.now(),
               plate: 'LS' + generateString(4),
               expiring: 99999999
            }
         }).then(createdVehicle => {
            if (!createdVehicle) {
               return;
            }
   
            console.log(createdVehicle.numberPlate)
   
            const vehicle = createdVehicle.load();
            const malfunctions = this.generatePoints();
            player.call('CLIENT::ELECTRICIAN_START', [malfunctions]);
      
            // Creating job vehicle 
      
            player.character.working = true;
   
            this.vehicles.set(player.id, vehicle!);
         })
      }
   }

   stop (player: PlayerMp, finished: boolean, points: number, distance: number) {
      player.character.working = false;

      const vehicle = this.getElectricianVehicle(player);

      if (vehicle) {
         if (player.vehicle) {
            player.removeFromVehicle();
         }

         vehicle.destroy();
         this.vehicles.delete(player.id);
      }

      const kilometers = (distance / 1000) * 1.6;

      if (finished) {
         // calculate pay : points, distance...
         const salary = (PRICE_PER_BOX * points * kilometers);
         player.character.giveMoney(player, salary);

         player.sendMessage(`Popravljeno ${points} kutija, ukupna predjena distanca je ${kilometers}km i zaradili ste ${salary}$.`, colors.hex.Info);
         player.notification('Uspešno ste završili posao.', notifications.type.SUCCESS, 4);
      } else {
         player.notification('Niste uspesno završili posao.', notifications.type.SUCCESS, 4);
      }
   }
}

export const electrician = new Electrician(
   JobConfig.job.ELECTRICIAN,
   JobConfig.names.ELECTRICIAN,
   JobConfig.descriptions.ELECTRICIAN,
   JobConfig.positions.ELECTRICIAN,
   JobConfig.sprites.ELECTRICIAN,
   JobConfig.colors.ELECTRICIAN
);

mp.events.call('SERVER::ELECTRICIAN_STOP', electrician.stop);


