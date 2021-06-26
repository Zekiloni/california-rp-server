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
         vehicle: true,
         call: (player, args) => {
            let vehicle = player.vehicle, character = player.Character();
            vehicle.engine = !vehicle.engine;
         }
      },

      {
         name: 'seatbelt',
         desc: 'Vezanje pojasa',
         vehicle: true,
         call: (player, args) => {
            player.data.Seatbelt = !player.data.Seatbelt;

            let message = player.data.Seatbelt ? ' stavlja pojas.' : ' skida pojas.';
            player.ProximityMessage(frp.Globals.distances.me, '* ' + player.name + message, frp.Globals.Colors.purple);
         }
      },

      {
         name: 'fill',
         desc: 'Sipanje goriva',
         call: (player, args) => {

         }
      },

      {
         name: 'windows',
         desc: 'Kontrola motora vozila',
         vehicle: true,
         call: (player, args) => {
            
         }
      },
   ]
};
