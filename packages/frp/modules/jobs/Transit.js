
const routes = [
   require('../../data/bus_routes/Airport.json'),
   require('../../data/bus_routes/Zacundo.json'),
   require('../../data/bus_routes/Vinewood.json'),
   require('../../data/bus_routes/Morningwood.json'),
   require('../../data/bus_routes/Rockford.json')
]


class Bus { 
   constructor () { 
      mp.events.add({
         'server:player.transit.start': (player, route) => { 
            let character = player.getCharacter(), checkpoints = {};

            routes[route].Stations.forEach((s) => { 
               let coords = s.StationCoords;
               checkpoints[s.StationIndex] = { name: s.StationName, position: new mp.Vector3(coords.X, coords.Y, coords.Z) }
            })

            character.working.duty = true;
            player.call('client:player.transit.start', [checkpoints]);
         },

         'server:player.transit.stop': (player, finished, stations, distance) => { 
            if (finished) { 
               let character = player.getCharacter(), money = 0;
               money += distance * 0.002, money += stations * 0.05;

               player.sendMessage('Novac za rutu ' + Math.ceil(money), mp.colors.info);
               character.working.salary += Math.ceil(money);

               if (player.vehicle) player.vehicle.destroy();
            }
         }
      })
   }
}

let transit = new Bus();

mp.events.addCommand("bus", (player, message, i) => {
	mp.events.call('server:player.transit.start', player, i);
});
