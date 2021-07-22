

const Player = mp.players.local;
let Spots = [], current = null;
let browser = null;


mp.events.add({
   'client:player.miner.start': Start,
   
   'client:player.miner.next': Next,

   'playerEnterCheckpoint': (checkpoint) => {
      if (Player.Job == 2 && Spots.length > 0 && current != null) { 
         mp.gui.chat.push('Going to next')
         Mine();
      } 
   },

   'client:player.miner:mine': () => {
      mp.game.streaming.requestAnimDict('amb@world_human_const_drill@male@drill@base');
      Player.taskPlayAnim('amb@world_human_const_drill@male@drill@base', 'base', 8.0, -8, -1, 48, 0, false, false, false);

      let timer = setInterval(() => {
         if (Player.getAnimCurrentTime('amb@world_human_const_drill@male@drill@base', 'base') > 0.95) {
            Player.stopAnimTask('amb@world_human_const_drill@male@drill@base', 'base', 3.0);
            clearInterval(timer);
            timer = null;
            if (!timer) browser.execute('mining.clicked = false')
         }
      }, 50);
   }
})


function Start (places) { 

   places.forEach(place => {
      Spots.push({position: place});
   });

   current = 0;
   browser = mp.browsers.new('package://jobs/jobs-interfaces/mining.html');

   let spot = Spots[current];
   let position = new mp.Vector3(spot.position[0], spot.position[1], spot.position[2] - 2.15)
   spot.checkpoint = mp.checkpoints.new(47, position, 2.5, { color: [ 241, 224, 90, 250 ], visible: true, dimension: player.dimension });
}


function Mine () { 
   mp.gui.cursor.show(true, true);
   browser.execute('mining.toggle = true');

   Player.taskStartScenarioInPlace('WORLD_HUMAN_CONST_DRILL', 0, true);
}

function Next () {    

   Player.clearTasks();

   let spot = Spots[current];
   spot.checkpoint.destroy();

   mp.gui.cursor.show(false, false);
   browser.execute('mining.toggle = false');

   current ++;
   let next = Spots[current], position = new mp.Vector3(next.position[0], next.position[1], next.position[2] - 2.15);
   
   current >= Spots.length ? ( Finish() ) : (
      next.checkpoint = mp.checkpoints.new(47, position, 2.5, { color: [ 241, 224, 90, 250 ], visible: true, dimension: player.dimension })
   )
}


function Finish () { 
   current = null;
   Spots = null;

   if (mp.browsers.at(browser.id)) browser.destroy();

   mp.gui.chat.push('Finished !')
}