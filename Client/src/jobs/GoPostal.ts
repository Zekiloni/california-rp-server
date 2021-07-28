import { CreateInteractionSpot, DistanceBetweenVectors } from "../Utils";


const Player = mp.players.local, MAX = 25;
let DeliveredMails = 0;

mp.events.add({

   'client:job.postal:start': (deliverPos) => {
      HouseInteraction(deliverPos);
   },  
});

function HouseInteraction (Position: Vector3Mp) {
   const { Checkpoint, Blip } = CreateInteractionSpot(`Mail Deliver No${DeliveredMails}`, Position);

   mp.events.add('playerEnterCheckpoint', OnPlayerDeliverMail);

   function OnPlayerDeliverMail (Point: CheckpointMp) { 
      if (DeliveredMails == MAX) {
         //mp.events.callRemote('server:job:finish', 6); // jobId
      }
      if (Point == Checkpoint) { 
         DeliveredMails++;
         Checkpoint.destroy();
         Blip.destroy();
         mp.events.remove('playerEnterCheckpoint', OnPlayerDeliverMail);
         
      }
   }
}

function BehindTruckInteraction () {
   const Truck = player.getVariable('Job_Veh');
   if (Truck) {
      const PosBehind = Truck.getOffsetFromInWorldCoords(0.0, -3.8, 0.0);
      const { Checkpoint, Blip } = CreateInteractionSpot('GoPostal Van', PosBehind);

      mp.events.add('playerEnterCheckpoint', OnPlayerTakeMail);
      function OnPlayerTakeMail (Point: CheckpointMp) { 
         if (Point == Checkpoint) {
            if (DistanceBetweenVectors(Player.position, PosBehind) <= 0.5) {
               Player.heading = Truck.heading;
               Checkpoint.destroy();
               Blip.destroy();
               mp.events.remove('playerEnterCheckpoint', OnPlayerTakeMail);
               // Uzima postu iz kamiona
               // NACI ANIMACIJU
               // Dobija objekat paketa ili pisma u ruci ( random )
            }
         }
      }
   }
}








