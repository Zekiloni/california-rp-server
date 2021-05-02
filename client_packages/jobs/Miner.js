const player = mp.players.local;

let clicks = 0,
    random = Math.floor(7,11);

mp.events.add({
   'client:player.job.mining' : (stage) => {
      switch (stage) 
      {
         case 1:

            break;
         case 2:
            break;
      }
   }
});

mp.keys.bind(0x01, true, function() {
   if (player.getVariable('job') == 3) {
      clicks++;
      if (clicks == random) {
         clicks = 0;
         random = Math.floor(7,11);
         mp.events.callRemote('server:player.job.mining')
      }
   }
});