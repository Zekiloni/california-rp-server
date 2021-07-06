



const Player = mp.players.local;
let browser = null, opened = false;

let Direction = null;

mp.events.add({

   'client:job:offer': (info) => {
      mp.gui.chat.push(JSON.stringify(info))
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://jobs/jobs-interfaces/job.html');
         browser.execute('offer.Job = ' + JSON.stringify(info));
         Player.BrowserControls(true, true);
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
      }
   },

   'client:job:accept': (job) => { 
      mp.events.call('client:job:offer')
      mp.events.callRemote('server:job:accept', job);
   },

   'client:job:direction': (position) => { // data = position ( i možda ime posla )
      Direction.Checkpoint != null ? RemoveDirections () : Direction.Checkpoint = mp.checkpoints.new(1, position, 3, {
            color: [ 255, 255, 255, 255 ],
            visible: true,
            dimension: player.dimension
      });
      Direction.Blip != null ? RemoveDirections () : Direction.Blip = mp.blips.new(1, new mp.Vector3(position.x, position.y, 0), {
          name: "Job",
          color: 84,
          alpha: 255,
          shortRange: true,
          dimension: player.dimension
      });
   },

   'client:job:waypoint': (position) => {
      mp.game.ui.setNewWaypoint(position.x, position.y);
   }
   
});

function RemoveDirections () {
   if (Direction == null) return;

   if (Direction.Blip != null) {
      Direction.Blip.destroy();
      Direction.Blip = null;
   }
   if (Direction.Checkpoint != null) {
      Direction.Checkpoint.destroy();
      Direction.Checkpoint = null;
   }
}

/* 
         mp.checkpoints.new(1, new mp.Vector3(position.x, position.y, position.z), 4,
            { 
                color: [ 255, 255, 255, 255 ],
                visible: true,
                dimension: player.dimension
            });
            jobCp[index].jobName = jobName;
            mp.events.call('client:set.waypoint', position);
        }
        else {
            jobBlip[index] = mp.blips.new(1, new mp.Vector3(position.x, position.y, 0),
            {
                name: jobName,
                color: 84,
                alpha: 255,
                shortRange: false,
                dimension: player.dimension
            });

*/
