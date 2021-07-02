



const Player = mp.players.local;
let browser = null, opened = false;

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

   'client:job:accept': async (job) => { 
      mp.events.call('client:job:offer')
      mp.events.callRemote('server:job:accept', job);
   }
});

