module.exports = {
   commands: [
      {
         name: 'createvehicle',
         desc: 'Kontrola motora vozila',
         admin: 2,
         call: (player, args) => {
            if (player.vehicle) return;
            const [model, owner, color, color2] = args;
         }
      },    

      {
         name: 'engine',
         desc: 'Kontrola motora vozila',
         call: (player, args) => {
            if (!player.vehicle) return; // PORUKA: Niste u vozilu
            let vehicle = player.vehicle, character = player.Character();
            vehicle.engine = !vehicle.engine;
         }
      },

      {
         name: 'seatbelt',
         desc: 'Vezanje pojasa',
         call: (player, args) => {
            if (!player.vehicle) return; // PORUKA: Niste u vozilu
            player.data.Seatbelt = !player.data.Seatbelt;

            let message = player.data.Seatbelt ? ' stavlja pojas.' : ' skida pojas.';
            player.ProximityMessage(frp.Globals.distances.me, '* ' + player.name + message, frp.Globals.Colors.purple);
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
