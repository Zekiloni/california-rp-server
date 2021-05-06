

const player = mp.players.local;
let route = [], current = false, max = 0, distance = 0;
let browser = null;

let cancel = null;
let garage = new mp.Vector3(447.428, -591.51739, 28.0754);


class Station { 
   constructor (id, name, position) { 
      this.id = id;
      this.name = name;
      this.position = new mp.Vector3(parseFloat(position.x), parseFloat(position.y), parseFloat(position.z - 1.07));
      this.checkpoint = mp.checkpoints.new(47, this.position, 5, { color: [ 241, 224, 90, 250 ], visible: true, dimension: player.dimension });
      this.checkpoint.station = this.id;
      let number = this.id + 1;
      this.blip = mp.blips.new(1, new mp.Vector3(this.position.x, this.position.y, 0), { name: number + '. ' + this.name, color: 5, shortRange: false });
      
      route.push(this)
   }

   delete () { 
      this.checkpoint.destroy();
      this.blip.destroy();
      let i = route.indexOf(this);
      route.splice(i, 1)
   }
}

mp.events.add({
   'client:player.transit.start': (checkpoints) => { 
      let stations = {};
      for (let i in checkpoints) { 
         let station = checkpoints[i];
         new Station(parseInt(i), station.name, station.position);
         stations[i] = { name: station.name, active: true };
      }

      max = route.length - 1;
      current = 0;
      browser = mp.browsers.new('package://jobs/transit-interface/transit.html');
      browser.execute('transit.toggle = true, transit.stations = ' + JSON.stringify(stations) + ';');
   },

   'playerEnterCheckpoint': (checkpoint) => {
      if (player.job == 3 && route.length > 0) { 
         mp.gui.chat.push('[DEBUG] playerEnterCheckpoint - 1')
         let vehicle = player.vehicle;
         if (vehicle && checkpoint.station >= 0) { // && vehicle.getClass() == 17
            mp.gui.chat.push('[DEBUG] playerEnterCheckpoint - 2, Station ' + checkpoint.station)
            checkpoint.station == max && current == max ? ( Finish(checkpoint.station, true) ) : ( Next(checkpoint.station) );
         }
      }
   }
})


   // 'playerLeaveVehicle': (vehicle, seat) => {
   //    if (player.job == 3 && checkpoint.station) { 
   //       if (browser && station >= 0 && station != false && mp.browsers.at(browser.id)) { 
   //          browser.execute('transit.toggle = false'); 
   //          cancel = setTimeout(() => { end(false); }, (5 * 60) * 1000)
   //       }
   //    }
   // },

   // 'playerEnterVehicle': (vehicle, seat) => {
   //    if (player.job == 3 && checkpoint.station) { 
   //       if (vehicle.getClass() == 17) { 
   //          browser.execute('transit.toggle = true'); 
   //          clearTimeout(cancel)
   //       }
   //    }
   // }

function Next (i) { 
   if (i == current) { 
      let station = route.find( ({ id }) => id === i );
      current ++;
      let next = route.find( ({ id }) => id === current );

      mp.game.ui.setNewWaypoint(next.position.x, next.position.y);

      Distance(station.position, next.position).then((dist) => { 
         station.delete();
         distance += dist;
         mp.gui.chat.push('[DEBUG] Next Station ' + current + ', Distance now ' + distance);
         browser.execute(`transit.disable(${i})`)
      })

   } else { 
      mp.gui.chat.push('[DEBUG] Wrong Station')
   }
  
}

function end () { 
   blip = mp.blips.new(1, new mp.Vector3(garage.x, garage.y, 0), { name: 'LS Transit Garaža', color: 5, shortRange: false }),
   checkpoint = mp.checkpoints.new(0, garage, 5, { color: [ 241, 224, 90, 255 ], visible: true, dimension: player.dimension })
   if (mp.browsers.at(browser.id)) browser.destroy();
   station = false, finished = true;
}

async function Distance (station, next) {
   return new mp.Vector3(station.x, station.y, station.z).subtract(new mp.Vector3(next.x, next.y, next.z)).length();
}

function Finish (i, done) { 
   let station = route.find( ({ id }) => id === i );
   station.delete();
   if (mp.browsers.at(browser.id)) browser.destroy();
   distance = 0, route = [], max = 0;
   mp.gui.chat.push('Finish !')
}
