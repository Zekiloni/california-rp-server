

const Player = mp.players.local;
let OrderNumber = 0, CanDeliver = false;

mp.events.add({

   'client:job.food:start': (deliverPos) => {
      OrderNumber++;
      const { Checkpoint, Blip } = Player.CreateInteractionSpot(`Food Order No${OrderNumber}`, deliverPos);

      mp.events.add('playerEnterCheckpoint', OnPlayerDeliverFood);

      function OnPlayerDeliverFood (point) { 
         if (point == Checkpoint) { 
            Checkpoint.destroy();
            Blip.destroy();
            mp.events.remove('playerEnterCheckpoint', OnPlayerDeliverFood);
         }
      }
   },  
});




