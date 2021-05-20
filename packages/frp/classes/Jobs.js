

let Terminal = require('../modules/jobs/Jetsam');
let Transit = require('../modules/jobs/Transit');
let Miner = require('../modules/jobs/Miner');
let Food;


frp.Jobs = { 
   1: { 
      id: 1,
      name: 'Jetsam Terminal',
      description: 'Sedište San Andreas brodske kompanije Jetsam, međunarodna izvozna kompanija. Rad u luci sa liftom za kontenjere i transfer kontenjera.', 
      max_workers: 8,
      point: [816.988, -2977.546, 6.020],
      blip: 569,
      sprite: 77,
      job: (player, args) => { Terminal.start(player, args); }
   },

   2: {
      id: 2,
      name: 'Los Santos Mine',
      description: 'San Andreas ',
      max_workers: 24,
      point: [2706.490, 2777.513, 37.878],
      blip: 527,
      sprite: 36,
      job: (player, args) => { Miner.start(player); console.log('START 1');   }
   },

   3: {
      id: 3,
      name: 'Los Santos Transit',
      description: 'Los Santos Transit je mreža transportnih vlasti u Los Santosu. Vozač autobusa, i mini buseva širom grada i izvan grada.',
      max_workers: 32,
      point: [0, 0, 0],
      blip: 513,
      sprite: 76,
      job: (player, args) => { Transit.start(player, args); }
   },

   4: { 
      id: 4,
      name: 'Burgershot',
      description: 'Lanac restorana brze hrane Burgershot. Dostavljač hrane.',
      point: [0, 0, 0],
      blip: 419,
      sprite: 0,
      job: (player, args) => { Food.start(player, args); }
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
      for (let i in frp.Jobs) { 
         let job = frp.Jobs[i];

         if (job.point) { 
            let position = new mp.Vector3(job.point[0], job.point[1], job.point[2]);
            job.blip = mp.blips.new(job.blip, job.point, { name: job.name, color: job.sprite, shortRange: true });
            job.colshape = mp.colshapes.newRectangle(job.point[0], job.point[1], 2, 2, 0);
            job.colshape.job = i;
            job.label = mp.labels.new(job.name + '~n~~y~' + '/job take', position, { los: true, font: 0, drawDistance: 4 });
         }
      }
   }
}


mp.job = new Jobs();
mp.job.init();