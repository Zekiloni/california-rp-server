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
         call: async (Player, args) => {
            const NearestStation = await frp.Business.NearestGasStation(Player);
            if (NearestStation) { 
               Player.callProc('client:business.gas:nearpump').then(Pump => { 
                  const Info = { 
                     Business: { id: NearestStation.id, Name: NearestStation.Name, Multiplier: NearestStation.Products.Fuel.multiplier }
                  };
                  Player.call('client:business.gas:menu', [Info]);
               }).catch(() => { 
                  Player.Notification(frp.Globals.messages.NOT_NEAR_GAS_PUMP, frp.Globals.Notification.Error, 5);
               });
            } else { 
               Player.Notification(frp.Globals.messages.NOT_NEAR_GAS_STATION, frp.Globals.Notification.Error, 5);
            }
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
