

const player = mp.players.local;
let route = {};
let station = false, checkpoint = false, blip = false, stations = 0;
let browser = null, finished = false;

let jobCancel = null;
let garage = new mp.Vector3(447.428, -591.51739, 28.0754);

const START = 0;

mp.events.add({
   'client:player.transit.start': (checkpoints) => { 
      for (let i in checkpoints) { 
         let s = checkpoints[i];
         let ground = mp.game.gameplay.getGroundZFor3dCoord(parseFloat(s.position.x), parseFloat(s.position.y), parseFloat(s.position.z + 5), parseFloat(0), false);
         if (ground == 0) { ground = parseFloat(s.position.z + 0.15) }
         route[i] = { name: s.name, position: new mp.Vector3(parseFloat(s.position.x), parseFloat(s.position.y), ground) }
         stations ++;
      }

      browser = mp.browsers.new('package://jobs/transit-interface/transit.html');
      browser.execute(`transit.toggle = true, transit.stations = ${stations}, transit.next = \"${route[START + 1].name}\"`);
      browser.execute(`transit.current.i = ${START}, transit.current.name = \"${route[START].name}\"`);

      station = START;

      checkpoint = mp.checkpoints.new(0, route[START].position, 5,{ color: [ 241, 224, 90, 255 ], visible: true, dimension: player.dimension });
      blip = mp.blips.new(1, new mp.Vector3(route[START].position.x, route[START].position.y, 0), { name: route[START].name, color: 5, shortRange: false });
   },

   'playerEnterCheckpoint': (checkpoint) => {
      if (player.job != 0) { 
         let vehicle = player.vehicle;
         if (vehicle && vehicle.getClass() == 17 && station >= 0) { 
            finished ? ( finish(true) ) : ( next() );
         }
      }
   },

   'playerLeaveVehicle': (vehicle, seat) => {
      if (browser && station >= 0 && station != false && mp.browsers.at(browser.id)) { 
         browser.execute('transit.toggle = false'); 
         jobCancel = setTimeout(() => { end(false); }, (5 * 60) * 1000)
      }
   },

   'playerEnterVehicle': (vehicle, seat) => {
      if (browser && station >= 0 && station != false && mp.browsers.at(browser.id)) { 
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

   mp.gui.chat.push('Sledeca stanica')
   station ++;
   let nextStation = route[station];

   setTimeout(() => {
      if (mp.players.local.vehicle) { 
         player.freezePosition(true), mp.players.local.vehicle.freezePosition(true); 
         if (mp.players.local.vehicle) { setTimeout(() => { player.freezePosition(true), mp.players.local.vehicle.freezePosition(false) }, 10 * 1000); }
      }
   }, 650);


   station >= stations -1 ? ( end(true) ) : (
      browser.execute(`transit.current.i = ${station}, transit.current.name = \"${nextStation.name}\", transit.next = \"${route[station + 1].name}\"`),
      blip = mp.blips.new(1, new mp.Vector3(nextStation.position.x, nextStation.position.y, 0), { name: nextStation.name, color: 5, shortRange: false }),
      checkpoint = mp.checkpoints.new(0, nextStation.position, 5, { color: [ 241, 224, 90, 255 ], visible: true, dimension: player.dimension }),
      mp.gui.chat.push('id browsera ' + JSON.stringify(browser.id))
   );
}

function end () { 
   blip = mp.blips.new(1, new mp.Vector3(garage.x, garage.y, 0), { name: 'LS Transit Garaža', color: 5, shortRange: false }),
   checkpoint = mp.checkpoints.new(0, garage, 5, { color: [ 241, 224, 90, 255 ], visible: true, dimension: player.dimension })
   if (mp.browsers.at(browser.id)) browser.destroy();
   station = false, finished = true;
}

async function distance (first, last) {
   return first.dist(last);
}

function finish (done) { 
   if (blip) blip.destroy();
   if (checkpoint) checkpoint.destroy();

   mp.gui.chat.push('Zadnja pozicija stanice ' + JSON.stringify(route));
   // mp.gui.chat.push('Predzadnja pozicija stanice ' + JSON.stringify(route[stations - 1].position));


   // distance(route[START].position, route[stations].position).then((dist) => { 
   //    mp.events.callRemote('server:player.transit.stop', done, stations, dist);
   //    stations = 0, finished = false, route = {};
   // })
}