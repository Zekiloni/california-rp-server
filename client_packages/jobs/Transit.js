

const player = mp.players.local;
let route = {};
let station = false, checkpoint = false, blip = false, stations = 0;
let browser = null;

let jobCancel = null, timer = 5 * 60;

const START = 0;

mp.events.add({
   'client:player.transit.start': (checkpoints) => { 
      for (let i in checkpoints) { 
         let s = checkpoints[i];
         route[i] = { name: s.name, position: new mp.Vector3(parseFloat(s.position.x), parseFloat(s.position.y), parseFloat(s.position.z) - 5) }
         stations ++;
      }

      browser = mp.browsers.new('package://jobs/transit-interface/transit.html');
      browser.execute(`transit.toggle = true, transit.stations = ${stations}, transit.next = \"${route[START + 1].name}\"`);
      browser.execute(`transit.current.i = ${START}, transit.current.name = \"${route[START].name}\"`);

      station = START;

      checkpoint = mp.checkpoints.new(1, route[START].position, 5,
      { direction: new mp.Vector3(0, 0, 75), color: [ 241, 224, 90, 255 ], visible: true, dimension: player.dimension });

      blip = mp.blips.new(1, new mp.Vector3(route[START].position.x, route[START].position.y, 0), { name: route[START].name, color: 5, shortRange: false });
   },

   'playerEnterCheckpoint': (checkpoint) => {
      if (route) { 
         if (player.job != 0) { 
            station == stations -1 ? end(true) : next();
         }
      }
   },

   'playerLeaveVehicle': (vehicle, seat) => {
      if (station) { 
         if (vehicle.getClass() == 17) { 
            browser.execute('transit.toggle = false'); 
            jobCancel = setTimeout(() => { end(false); }, timer * 1000)
         }
      }
   },

   'playerEnterVehicle': (vehicle, seat) => {
      if (station) { 
         if (vehicle.getClass() == 17) { 
            browser.execute('transit.toggle = true'); 
            clearTimeout(jobCancel)
         }
      }
   }
})

function next () { 
   if (blip) blip.destroy();
   if (checkpoint) checkpoint.destroy();

   let nextStation = route[station ++];

   browser.execute(`transit.current.i = ${station}, transit.current.name = \"${nextStation.name}\", transit.next = \"${route[station + 1].name}\"`);

   blip = mp.blips.new(1, new mp.Vector3(nextStation.position.x, nextStation.position.y, 0), { name: nextStation.name, color: 5, shortRange: false });
   checkpoint = mp.checkpoints.new(1, nextStation.position, 5, { color: [ 241, 224, 90, 255 ], visible: true, dimension: player.dimension });
}

function end (finish) { 
   mp.events.callRemote('server:player.transit.stop', finish);
   browser.destroy();
   station = false;
}