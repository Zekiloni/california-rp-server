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
         call: async (player, args) => {
            const Vehicle = player.vehicle, Character = await player.Character();
            Vehicle.engine = !Vehicle.engine;
         }
      },

      {
         name: 'seatbelt',
         desc: 'Vezanje pojasa',
         vehicle: true,
         call: (Player) => {
            Player.data.Seatbelt = !Player.data.Seatbelt;
            let message = Player.data.Seatbelt ? ' stavlja pojas.' : ' skida pojas.';
            Player.ProximityMessage(frp.Globals.distances.me, '* ' + Player.name + message, frp.Globals.Colors.purple);
         }
      },

      {
         name: 'trunk',
         desc: 'Opcije gepeka vozila.',
         call: (Player) => {
            const Vehicle = frp.Vehicles.Nearest(Player.position, 2);
            console.log(Vehicle);
            if (Vehicle && Vehicle.locked) return Player.Notification(frp.Globals.messages.VEHICLE_IS_LOCKED, frp.Globals.Notification.Error, 6);
            if (Vehicle) Vehicle.data.Trunk = !Vehicle.data.Trunk;
         }
      },

      {
         name: 'hood',
         desc: 'Opcije haube vozila.',
         call: (Player) => {
            const Vehicle = frp.Vehicles.Nearest(Player.position, 2);
            if (Vehicle && Vehicle.locked) return Player.Notification(frp.Globals.messages.VEHICLE_IS_LOCKED, frp.Globals.Notification.Error, 6);
            if (Vehicle) Vehicle.data.Hood = !Vehicle.data.Hood;
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
