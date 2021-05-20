

mp.animals = {};

class Animal {
   constructor (id, x, y, z) { 
      this.id = id;
      let position = new mp.Vector3(x + Math.floor(Math.random() * 20), y + Math.floor(Math.random() * 20), z);
      this.animal = mp.peds.new(mp.joaat('a_c_deer'), position, 2 + Math.floor(Math.random() * 5), 0);
      //this.animal.taskPlayAnim("random@shop_gunstore","_greeting", 1.0, -1.0, 4000, 0, 1, true, true, true);
   }
}

class Animals { 
   constructor () { 
      mp.events.add({
         'server:animals.spawn': (player, q) => {

          }
      })
   }

   init = (amount) => { 
      for (let i = 0; i < amount; i ++) {
         let animal = new Animal(i, -1800.14, -794.12, 8.6)
      }
   }
}

mp.animals = new Animals();

mp.animals.init(20);