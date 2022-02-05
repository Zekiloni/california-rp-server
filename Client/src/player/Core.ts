import { loadMovementClipset } from "../utils";


const Player = mp.players.local;


const screenRes = mp.game.graphics.getScreenActiveResolution(100, 100);

let AntiKeySpam = false;

// mp.events.addDataHandler(shared_Data.MONEY, (entity, value, oldValue) => { 
//    if (entity == mp.players.local && value != oldValue) { 
      
//    }
// });



mp.events.add({

   'CLIENT::FREEZE': freezeAtPosition,

   'client:player:rotate': (Value: number) => {
      Player.setHeading(Value);
   },

   'client:request:ipl': (Ipl: string) => { 
      mp.game.streaming.requestIpl(Ipl);
   }
});



function freezeAtPosition (toggle: boolean) {
   mp.players.local.freezePosition(toggle);

   if (mp.players.local.vehicle) {
      mp.players.local.vehicle.freezePosition(toggle);
   }
}




