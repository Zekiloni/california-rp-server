

const player = mp.players.local;
let route = {};
let station = {
   checkpoint: false,
   blip: false
}

mp.events.add({
   'client:player.transit.start': (checkpoints) => { 
      for (let i in checkpoints) { 
         let station = checkpoints[i];
         route[i] = { name: station.name, position: new mp.Vector3(station.position.x, station.position.y, station.position.z) }
      }

      station.checkpoint = mp.checkpoints.new(1, route[0].position, 5,
      { direction: new mp.Vector3(0, 0, 75), color: [ 241, 224, 90, 255 ], visible: true, dimension: player.dimension });

      station.blip = mp.blips.new(1, new mp.Vector3(route[0].position.x, route[0].position.y, 0), { name: route[0].name, color: 5, shortRange: false });
      station.checkpoint.station = 0;
   },

   'playerEnterCheckpoint': (player, checkpoint) => {
      if (route) { 
         if (player.job != 0) { 
            if (checkpoint.station) { 
               next(checkpoint.station);
            }
         }
      }
   }
})

function next (i) { 
   station.blip.destroy();
   station.checkpoint.destroy();

   i ++;
}