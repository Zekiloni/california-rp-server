


const callsigns = () => {
   mp.vehicles.forEachInRange(mp.players.local.position, 20, vehicle => {
      if (vehicle.getVariable('CALLSIGN')) {
         const callsign = vehicle.getVariable('CALLSIGN');

         mp.game.graphics.drawText(callsign, [vehicle.position.x, vehicle.position.y, vehicle.position.z + 0.3],
            {
               font: 4,
               color: [255, 255, 255, 255],
               scale: [0.37, 0.37],
               outline: true,
               centre: true
            }
         );
      }
   });
};


mp.events.add(RageEnums.EventKey.RENDER, callsigns);