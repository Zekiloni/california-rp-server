

// let Terminal = require('../modules/jobs/Jetsam');
// let Transit = require('../modules/jobs/Transit');
// let Miner = require('../modules/jobs/Miner');
// let Food;


const List = {
   1: { 
      id: 1, name: 'Jetsam Terminal', description: 'Forklift Driver.',
      point: new mp.Vector3(816.988, -2977.546, 6.020), blip: 569, sprite: 77,
   },
   2: {
      id: 2, name: 'Los Santos Mine', description: 'Miner',
      point: new mp.Vector3(2706.490, 2777.513, 37.878), blip: 527, sprite: 36,
   },
   3: {
      id: 3,
      name: 'Los Santos Transit',
      description: 'Los Santos Transit je mreža transportnih vlasti u Los Santosu. Vozač autobusa, i mini buseva širom grada i izvan grada.',
      max_workers: 32,
      point: [0, 0, 0],
      blip: 513,
      sprite: 76,
   },
   4: {
      id: 4,
      name: 'Burgershot',
      description: 'Lanac restorana brze hrane Burgershot. Dostavljač hrane.',
      point: [0, 0, 0],
      blip: 419,
      sprite: 0,
   }
}


frp.Jobs = class Jobs { 

   static Job = {};

   constructor () { 
      
   }

   static Init () { 

   }

   async TakeJob (player) { 
      const Character = await player.Character();
      if (Character.Job != 0) return; // PORUKA: vec ste zaposleni

      Character.Job = this.id;

   }


};
