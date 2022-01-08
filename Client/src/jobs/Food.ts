import { CreateInteractionSpot } from "../utils";

const Player = mp.players.local;

let browser = null, opened = false;
let Delivering = false;

mp.events.add({

   'CLIENT::JOB:FOOD:ORDERS': (Orders: string) => {
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

         mp.events.call('CLIENT::JOB:FOOD:ORDERSs');

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
               mp.events.callRemote('SERVER::JOB:FOOD:ORDER:DELIVER', i);
               mp.events.remove('playerEnterCheckpoint', ReachOrderPoint);
            }
         }
      } else {
         mp.events.call('CLIENT::JOB:FOOD:ORDERS');
         Delivering = false;
      }
   }
});




