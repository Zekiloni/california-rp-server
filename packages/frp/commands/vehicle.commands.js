module.exports = {
    commands: [
      {
         name: 'createvehicle',
         desc: 'Kontrola motora vozila',
         admin: 2,
         call: (player, args) => {
            if (player.vehicle) return;
            let model = args[0], colors1 = args[1], colors2 = args[2];
            let c1 = colors1.split(','), c2 = colors2.split(',');
            mp.vehicles.create(model, false, {
               numberplate: 'focus rp beta', position: player.position, dimension: player.dimension, locked: false, price: 0, id: 'temporary',
               color: [[c1[0], c1[1], c1[2]], [c2[0], c2[1], c2[2]]]
            });
         }
      },
      {
         name: 'engine',
         desc: 'Kontrola motora vozila',
         call: (player, args) => {
            if (!player.vehicle) return;
            let vehicle = player.vehicle, character = player.Character();
            vehicle.engine = !vehicle.engine;
         }
      },
      {
         name: 'windows',
         desc: 'Kontrola motora vozila',
         call: (player, args) => {
            
         }
      },
   ]
};
