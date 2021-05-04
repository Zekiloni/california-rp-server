
const routes = [
   require('../../../configs/bus_routes/Airport.json'),
   require('../../../configs/bus_routes/Zacundo.json'),
   require('../../../configs/bus_routes/Vinewood.json'),
   require('../../../configs/bus_routes/Morningwood.json'),
   require('../../../configs/bus_routes/Rockford.json')
]


class Bus { 
   constructor () { 
      mp.events.add({
         'server:player.transit.start': (player, route) => { 
            let checkpoints = {};
            routes[route].Stations.forEach((s) => { 
               let coords = s.StationCoords;
               checkpoints[s.StationIndex] = { name: s.StationName, position: new mp.Vector3(coords.X, coords.Y, coords.Z) }
            })
            console.log(checkpoints)
            player.call('client:player.transit.start', [checkpoints]);
         },

         'server:player.transit.stop': (player, finished) => { 
            if (finished) { 

            } else { 

            }
         }
      })
   }
}

let transit = new Bus();

mp.events.addCommand("bus", (player, message, i) => {
	mp.events.call('server:player.transit.start', player, i);
});