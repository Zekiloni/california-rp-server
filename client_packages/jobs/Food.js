

const Player = mp.players.local;

let browser = null, opened = false;
let Vehicle = null;

mp.events.add({

   'client:job.food:orders': (orders) => { 
      opened = !opened;
      if (opened) { 
         browser = mp.browsers.new('package://jobs/jobs-interfaces/FoodDeliveries.html');
         browser.execute('food.Orders = ' + JSON.stringify(orders));
         Player.BrowserControls(true, true);
      } else { 
         if (browser) browser.destroy();
         Player.BrowserControls(false, false);
      }
   },

   'client:job.food.order:accept': async (delivery) => { 
      const response = await mp.events.callRemoteProc('');
      if (response) { 
         const {checkpoint, blip} = Player.CreateInteractionSpot('Food Order', new mp.Vector3(delivery.position.x, delivery.position.y, delivery.position.z));

         mp.events.add('playerEnterCheckpoint', ReachOrderPoint);
         
         function ReachOrderPoint (point) { 
            if (point == checkpoint) { 
               if (Player.vehicle) return;
               checkpoint.destroy();
               blip.destroy();
               mp.events.remove('playerEnterCheckpoint', ReachOrderPoint);
            }
         }
      }
   }

});




