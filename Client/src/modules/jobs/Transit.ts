

// const Player = mp.players.local;
// let Route: any = []
// let Current: boolean = false;
// let Max: number = 0
// let Distance: number = 0;
// let Browser = null
// let Finishing = false
// let Wrong = false;

// let cancel = null;
// let garage = new mp.Vector3(447.428, -591.51739, 28.0754);


// class Station { 
//    ID: number;
//    Name: string;
//    Position: Vector3Mp;
//    Checkpoint: CheckpointMp;
//    Blip: BlipMp;

//    constructor (Id: number, Name: string, Pos: Vector3Mp) { 
//       this.ID = Id;
//       this.Name = Name;
//       this.Position = new mp.Vector3(Pos.x, Pos.y, Pos.z - 1.07);
//       this.Checkpoint = mp.checkpoints.new(47, this.Position, 5, { color: [ 241, 224, 90, 250 ], visible: true, dimension: player.dimension });
//       this.Checkpoint.Station = this.ID;
//       let number = this.ID + 1;
//       this.Blip = mp.blips.new(1, new mp.Vector3(this.Position.x, this.Position.y, 0), { name: number + '. ' + this.Name, color: 5, shortRange: false, alpha: 0 });
      
//       Route.push(this)
//    }

//    delete () { 
//       this.Checkpoint.destroy();
//       this.Blip.destroy();
//       let i = Route.indexOf(this);
//       Route.splice(i, 1)
//    }
   
//    visible () { 
//       this.Checkpoint.setAlpha(255);
//       this.Blip.setAlpha(255);
//    }
// }

// mp.events.add({
//    'client:player.transit.start': (checkpoints) => { 
//       let stations = {};
//       for (let i in checkpoints) { 
//          let station = checkpoints[i];
//          new Station(parseInt(i), station.name, station.position);
//          stations[i] = { name: station.name, active: true, wrong: false };
//       }

//       max = route.length - 1;
//       current = 0;
//       route[current].visible();
//       browser = mp.browsers.new('package://jobs/jobs-interfaces/transit.html');
//       browser.execute('transit.toggle = true, transit.stations = ' + JSON.stringify(stations) + ';');
//    },

//    'playerEnterCheckpoint': (checkpoint) => {
//       if (player.Job == 3 && route.length > 0) { 
//          mp.gui.chat.push('[DEBUG] playerEnterCheckpoint - 1')
//          let vehicle = player.vehicle;
//          if (vehicle && vehicle.getClass() == 17 && checkpoint.station >= 0) { 
//             player.stopped = true;
//             setTimeout(() => { 
//                player.stopped = false; 
//                checkpoint.station == max && current == max ? ( Finish(checkpoint.station, true) ) : ( Next(checkpoint.station) );
//             }, 10000)
//             mp.gui.chat.push('[DEBUG] playerEnterCheckpoint - 2, Station ' + checkpoint.station)
//          }
//       }

//       if (finishing && checkpoint.finish) { 
//          checkpoint.finish.destroy();
//          checkpoint.destroy();
//          mp.events.callRemote('server:player.transit.stop', true, max, distance);

//          distance = 0, route = [], max = 0;
//       }
//    },

//    'playerExitCheckpoint': (checkpoint) => {
//       if (player.Job == 3 && player.vehicle && player.vehicle.getClass() == 17 && checkpoint.station >= 0) { 
//          if (player.stopped) { 
//             wrong = true;
//             player.stopped = false;
//          }
//       }
//    }
// })


//    // 'playerLeaveVehicle': (vehicle, seat) => {
//    //    if (player.Job == 3 && checkpoint.station) { 
//    //       if (browser && station >= 0 && station != false && mp.browsers.at(browser.id)) { 
//    //          browser.execute('transit.toggle = false'); 
//    //          cancel = setTimeout(() => { end(false); }, (5 * 60) * 1000)
//    //       }
//    //    }
//    // },

//    // 'playerEnterVehicle': (vehicle, seat) => {
//    //    if (player.Job == 3 && checkpoint.station) { 
//    //       if (vehicle.getClass() == 17) { 
//    //          browser.execute('transit.toggle = true'); 
//    //          clearTimeout(cancel)
//    //       }
//    //    }
//    // }

// function Next (i) { 
//    if (i == current) { 
//       let station = route.find( ({ id }) => id === i );
//       current ++;
//       let next = route.find( ({ id }) => id === current );

//       next.visible();

//       Distance(station.position, next.position).then((dist) => { 
//          station.delete();
//          distance += dist;
//          mp.gui.chat.push('[DEBUG] Next Station ' + current + ', Distance now ' + distance);
//          if (wrong) { 
//             browser.execute(`transit.wrong(${i})`)
//          } else { 
//             browser.execute(`transit.disable(${i})`)
//          }
//          wrong = false;
//       })

//    } else { 
//       mp.gui.chat.push('[DEBUG] Wrong Station')
//    }
// }

// async function Distance (station, next) {
//    return new mp.Vector3(station.x, station.y, station.z).subtract(new mp.Vector3(next.x, next.y, next.z)).length();
// }

// function Finish (i) { 
//    let station = route.find( ({ id }) => id === i );
//    station.delete();
//    if (mp.browsers.at(browser.id)) browser.destroy();

//    let checkpoint = mp.checkpoints.new(47, garage, 5, { color: [ 241, 224, 90, 250 ], visible: true, dimension: player.dimension });
//    let blip = mp.blips.new(1, new mp.Vector3(garage.x, garage.y, 0), { name: 'Los Santos Transit Garaža', color: 5, shortRange: false });
//    checkpoint.finish = blip;

//    finishing = true;
// }
