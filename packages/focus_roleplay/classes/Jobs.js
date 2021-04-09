

mp.jobs = { 
   'Jetsam Terminal': { 
      description: 'Sedište San Andreas brodske kompanije Jetsam, međunarodna izvozna kompanija.' , 
      maxWorkers: 8, point: new mp.Vector3(816.988, -2977.546, 6.0206), blipI: 569, sprite: 77
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

   init = () => { 
      for (let i in mp.jobs) { 
         
         let job = mp.jobs[i];
         let name = i;

         if (job.point) { 
            job.blip = mp.blips.new(job.blipI, job.point, { name: name, color: job.sprite, shortRange: true });
            job.colshape = mp.colshapes.newRectangle(job.point.x, job.point.y, 2, 2, 0);
            job.colshape.job = name;
            job.label = mp.labels.new(name + '~n~' + '/takejob', job.point, { los: true, font: 0, drawDistance: 4 });
         }
      }
   }
}


mp.job = new Jobs();
mp.job.init();