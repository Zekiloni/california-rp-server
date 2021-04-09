

module.exports = { 
   commands: [ 
      {
         name: 'engine',
         call: (player, args) => { 
            if (!player.vehicle) return;
            player.vehicle.engine = !player.vehicle.engine;
         }
      },
   ]
}