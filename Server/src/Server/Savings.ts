import Accounts from "../Models/Account";
import Characters from "../Models/Character";
import { ExceptionType, Main } from "./Main";

export class Saving {
   constructor() {
      mp.events.add({
         'playerQuit': async (player, exit) => {
            
            switch (exit) {
               case 'disconnect': { 
                  Main.Terminal(2, player.name + ' left the server.'); break; 
               }
               case 'timeout': { 
                  Main.Terminal(2, player.name + ' lost the connection to the server.'); break; 
               }
               case 'kicked': { 
                  Main.Terminal(2, player.name + ' has been kicked / banned from the server.'); break; 
               }
            }

            if (player.getVariable('logged')) {


               if (player.getVariable('Job_Vehicle')) { 
                  const vehicle = player.getVariable('Job_Vehicle');
                  if (mp.vehicles.at(frp.GameObjects.TemporaryVehicles[vehicle].id)) {
                     frp.GameObjects.TemporaryVehicles[vehicle].destroy();
                  }
               }

               const Position = player.position;
               const Account = await Accounts.findOne({ where: { id: player.account } });
               const Character = await Characters.findOne({ where: { id: player.character }});
               if (Account == null || Character == null) return Main.Exception(ExceptionType.Null, 'Savings.ts', `${Account} | ${Character}`)
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


