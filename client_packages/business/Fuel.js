


const Player = mp.players.local;
let browser = null, opened = false;

const Pumps = [ 1339433404, 1694452750, 1933174915, 2287735495 ];


mp.events.add({
   'client:business.gas:menu': (info) => { 

   }
})


mp.events.addProc({
   'client:business.gas:nearpump': async () => { 
      return new Promise((resolve) => { 
         for (const Pump of Pumps) { 
            let object = mp.game.object.getClosestObjectOfType(position.x, position.y, position.z, 3.0, Pump, false, true, true);
            if (object) {
               resolve(true)
               break;
            }
         }
      });
   }
});
