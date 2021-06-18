class Saving {
   
   constructor() {
      mp.events.add({
         'playerQuit': async (player, exit) => {
            switch (exit) {
               case 'disconnect': { frp.Main.Terminal(2, player.name + ' left the server.'); break; }
               case 'timeout': { frp.Main.Terminal(2, player.name + ' lost the connection to the server.'); break; }
               case 'kicked': { frp.Main.Terminal(2, player.name + ' has been kicked / banned from the server.'); break; }
            }

            if (player.getVariable('logged')) {
               const Position = player.position;
               const Account = await frp.Accounts.findOne({ where: { id: player.account } });
               const Character = await frp.Characters.findOne({ where: { id: player.character }});
               Account.Online = false;
               Character.Last_Position = Position;
               await Account.save();
               await Character.save();
            }
         }
      });
   }

   Save () {
      mp.players.forEach((player) => {
         if (player.data.logged) { mp.events.call('server:save.player', player); }
      });

      mp.vehicles.forEach((vehicle) => { 
         mp.events.call('server:save.vehicle', vehicle);
      });
   }
}
frp.Saving = new Saving();
