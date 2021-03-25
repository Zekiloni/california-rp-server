
let DOORS = require('./../configs/Doors.json')

mp.doors = {};

class Door { 
   constructor (id, name, position, model, status) { 
      this.id = id;
      this.name = name;
      this.position = position;
      this.model = model;
      this.status = status;

      this.colshape = mp.colshapes.newRectangle(position[0], position[1], 3, 2, 0);
      this.colshape.doors = this.id;

      mp.doors[this.id] = this;
   }

   status () { 
      this.status = !this.status;
   }

}

class Doors { 
   constructor () { 
      mp.events.add({
         'playerEnterColshape': (player, colshape) => { 
            if (colshape.doors) { 
               let door = colshape.doors;
               let status = mp.doors[door].status, position = mp.doors[door].position, model = mp.doors[door].model;
               player.call('client:doors.sync', [model, position, status]);
            }
         }
      });
   }

   init () { 
      let counter = 0;
      for (let door of DOORS) { 
         new Door(door.id, door.name, door.position, door.model, door.locked);
         counter ++;
      }
      core.terminal(3, counter + ' Doors loaded')
   }

   lock () {

   }

   unlock () { 

   }
}

let doors = new Doors();
doors.init()

