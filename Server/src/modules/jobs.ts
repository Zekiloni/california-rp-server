



import { notifications } from '@enums';
import { jobs } from '@models';


import './jobs/taxi.job';


mp.events.add(
   {
      'SERVER::JOB:ACCEPT': (player: PlayerMp, id: number) => { 

         if (!player.character.isUnemployed()) { 
            return;
         }

         const job = jobs.list.get(id);

         if (!job) {
            return;
         }
         
         player.character.setJob(player, job?.id!);
         player.notification('uspesno ste se zaposlili', notifications.type.SUCCESS, 4);
         player.call('CLIENT::JOB:OFFER', [false]);
      }
   }
)