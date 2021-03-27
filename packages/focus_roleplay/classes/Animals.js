


class Animals { 
   constructor () { 
      mp.events.add({
         'server:animals.spawn': (player, q) => {
            for (let i = 0; i < q; i ++) {
            //   let ped = mp.peds.new(mp.joaat('a_c_deer'), 
            //     new mp.Vector3(-1800.14 + Math.floor(Math.random() * 20), -794.12 + Math.floor(Math.random() * 20), 8.6),
            //     119.81 + Math.floor(Math.random() * 20), (Animal) => {
            //   }, 0);
            //   ped.id = i;
            //   ped.controller = player;
            //   player.call("client:syncAnimals", [ped]);
            }
          }
      })
   }
}

mp.animals = new Animals();