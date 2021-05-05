

let JetsamTerminal = require('./modules/jobs/Jetsam');
let LS_Transit = require('./modules/jobs/Transit');
let Miner = require('./modules/jobs/Miner');


mp.jobs = { 
   1: { 
      id: 1, name: 'Jetsam Terminal',
      description: 'Sedište San Andreas brodske kompanije Jetsam, međunarodna izvozna kompanija.' , 
      max_workers: 8, point: new mp.Vector3(816.988, -2977.546, 6.0206), blip: 569, sprite: 77,
      job: (player, args) => { JetsamTerminal.start(player, args); }
   },

   2: {
      id: 2, name: 'Miner',
      description: 'San Andreas ',
      max_workers: 24, point: new mp.Vector3(816.988, -7977, 1), blip: 650, sprite: 11,
      job: (player, args) => { Miner.start(player, args); }
   },

   3: {
      id: 3, name: 'Los Santos Transit',
      description: 'San Andreas ',
      max_workers: 24, point: new mp.Vector3(816.988, -7977, 1), blip: 650, sprite: 11,
      job: (player, args) => { Miner.start(player, args); }
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
         },

         'server:player.job.accept': (player, job) => { 
            let character = player.getCharacter();
            character.Job(player, job);
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
            job.label = mp.labels.new(job.name + '~n~~y~' + '/job take', job.point, { los: true, font: 0, drawDistance: 4 });
         }
      }
   }
}


mp.job = new Jobs();
mp.job.init();