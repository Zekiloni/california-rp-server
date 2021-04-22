

module.exports = { 
   commands: [ 

      {
         name: 'createvehicle',
         desc: 'Kontrola motora vozila',
         admin: 2,
         call: (player, args) => { 
            if (player.vehicle) return;
            let model = mp.joaat(args[0]), color_1 = args[1].split(','), color_2 = args[2].split(',');
            
         }
      },

      {
         name: 'engine',
         desc: 'Kontrola motora vozila',
         call: (player, args) => { 
            if (!player.vehicle) return;
            let vehicle = player.vehicle, character = player.getCharacter();
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
}