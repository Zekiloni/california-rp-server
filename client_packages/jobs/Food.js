

const Player = mp.players.local;

let browser = null, opened = false;
let Delivering = false;

mp.events.add({

   'client:job.food:orders': (orders) => { 
      if (Delivering) return;
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://jobs/jobs-interfaces/food.html');
         browser.execute('food.Orders = ' + JSON.stringify(orders));
         Player.BrowserControls(true, true);
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
      }
   },

   'client:job.food.order:accept': async (index) => { 
      const response = await mp.events.callRemoteProc('server:job.food.order:accept', index);
      if (response) { 
         
         mp.events.call('client:job.food:orders');

         Delivering = true;

         const {checkpoint, blip} = Player.CreateInteractionSpot('Food Order', response.Position);

         mp.events.add('playerEnterCheckpoint', ReachOrderPoint);
         
         function ReachOrderPoint (point) { 
            if (point == checkpoint) { 
               if (Player.vehicle) return;
               Delivering = false;
               checkpoint.destroy();
               blip.destroy();
               mp.events.callRemote('server:job.food.order:deliver', index);
               mp.events.remove('playerEnterCheckpoint', ReachOrderPoint);
            }
         }
      } else {
         mp.events.call('client:job.food:orders');
         Delivering = false;
      }
   }
});




