


import { Messages } from '../globals/constants';
import { jobNumber, notifyType } from '../globals/enums';
import Jobs from '../models/job.model';
import './jobs/taxi.job';



mp.events.add(
   {
      'SERVER::JOB:ACCEPT': (player: PlayerMp, id: number) => { 
         if (player.character.job == jobNumber.UNEMPLOYED) {
            const job = Jobs.list.get(id);

            if (!job) {
               return;
            }
            
            player.character.setJob(player, job?.id!);
            player.sendNotification('uspesno ste se zaposlili', notifyType.SUCCESS, 4);
            player.call('CLIENT::JOB:OFFER', [false]);
         }
      }
   }
)