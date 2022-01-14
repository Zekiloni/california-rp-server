


import './jobs/taxi.job';



mp.events.add(
   {
      'SERVER::JOB:ACCEPT': (player: PlayerMp, jobId: number) => { 

      }
   }
)