

let JetsamTerminal = require('./modules/jobs/JetsamTerminal');


mp.jobs = { 
   1: { 
      name: 'Jetsam Terminal',
      description: 'Sedište San Andreas brodske kompanije Jetsam, međunarodna izvozna kompanija.' , 
      max_workers: 8, point: new mp.Vector3(816.988, -2977.546, 6.0206), blip: 569, sprite: 77,
      job: (player) => { JetsamTerminal.start(player); }
   }
}



class Jobs { 
   constructor () { 
      mp.events.add({
         'playerEnterColshape': (player, shape) => { 
            if (shape.job) { 
               player.near = { type: 'job', id: shape.job };
            }
         },

         'playerExitColshape': (player, shape) => {
            if (shape.job && player.near) { 
               player.near = null;
            }
         }
      })
   }

   init () { 
      for (let i in mp.jobs) { 
         let job = mp.jobs[i];

         if (job.point) { 
            job.blip = mp.blips.new(job.blip, job.point, { name: job.name, color: job.sprite, shortRange: true });
            job.colshape = mp.colshapes.newRectangle(job.point.x, job.point.y, 2, 2, 0);
            job.colshape.job = i;
            job.label = mp.labels.new(job.name + '~n~' + '/takejob', job.point, { los: true, font: 0, drawDistance: 4 });
         }
      }
   }
}


mp.job = new Jobs();
mp.job.init();