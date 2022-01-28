


import { Messages } from '../globals/constants';
import { jobNumber, NotifyType } from '../globals/enums';
import Jobs from '../models/job.model';
import './jobs/taxi.job';



mp.events.add(
   {
      'SERVER::JOB:ACCEPT': (player: PlayerMp, jobId: number) => { 
         if (pplayer.character.job == jobNumber.UNEMPLOYED) {
            const job = Jobs.list.get(jobId);
            
            pplayer.character.setJob(player, job?.id!);
            player.sendNotification('uspesno ste se zaposlili', NotifyType.SUCCESS, 4);
            player.call('CLIENT::JOB:OFFER', [false]);
         }
      }
   }
)