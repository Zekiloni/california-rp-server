
import { houses } from '@models';

mp.events.add(
   {
      'SERVER::HOUSE:ENTER': (player: PlayerMp, houseId: number) => { 
         houses.findOne({ where: { id: houseId } }).then(house => { 
            const { interior_position: intPos } = house!;

            if (house?.locked) return; // house locked

            player.position = new mp.Vector3(intPos.x, intPos.y, intPos.z);
            player.dimension = house?.id!;

            if (house?.ipl) { 
               // request ipl
            }
         });
      }
   }
)