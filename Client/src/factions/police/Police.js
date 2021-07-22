
const Player = mp.players.local;

let browser = null, opened = false;


let PatrolsMap = false;


mp.events.add({
   'entityStreamIn': (entity) => {

   },

   'render': () => { 
      // if (PatrolsMap) { 
      //    mp.players.forEach((player) => { 
      //       if (player.getVariable('Faction') == police) { 
      //          browser.execute() // push ime igraca i x i y;
      //       }
      //    })
      // }
   }
})



// function Patrol (callsign, x, y) { 

//    const { x, y } = Player.position;
   
//    let N = 0, M = 0;
   
//    // 400 / 500 = N / x;


// };



mp.events.addDataHandler({
   'callsign': (entity, newValue, oldValue) => {

   }
});




