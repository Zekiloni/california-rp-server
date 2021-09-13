import { CreateInteractionSpot } from "../Utils";

const Player = mp.players.local;

let browser = null, opened = false;
let Delivering = false;

mp.events.add({

   'client:job.food:orders': (Orders: string) => {
      if (Delivering) return;
      opened = !opened;
      if (opened) {
         browser = mp.browsers.new('package://jobs/jobs-interfaces/food.html');
         browser.execute('food.Orders = ' + JSON.stringify(Orders));
      } else {
         // Else
      }
   },

   'client:job.food.order:accept': async (i: number) => {
      const response = await mp.events.callRemoteProc('server:job.food.order:accept', i);
      if (response) {

         mp.events.call('client:job.food:orders');

         Delivering = true;

         const Position = new mp.Vector3(response.Position.x, response.Position.y, response.Position.z - 0.9)
         const { Checkpoint, Blip } = CreateInteractionSpot('Food Order', Position);

         mp.events.add('playerEnterCheckpoint', ReachOrderPoint);

         function ReachOrderPoint(Point: CheckpointMp) {
            if (Point == Checkpoint) {
               if (Player.vehicle) return;
               Delivering = false;
               if (Checkpoint) Checkpoint.destroy();
               if (Blip) Blip.destroy();
               mp.events.callRemote('server:job.food.order:deliver', i);
               mp.events.remove('playerEnterCheckpoint', ReachOrderPoint);
            }
         }
      } else {
         mp.events.call('client:job.food:orders');
         Delivering = false;
      }
   }
});




