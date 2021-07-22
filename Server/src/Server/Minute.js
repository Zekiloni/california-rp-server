

const interval = 60 * 1000;

async function Update (player) {
   const Character = await player.Character(), account = await player.Account();
   
   Character.increment('Minutes', { by: frp.Settings.HappyHours == true ? 2 : 1 });

   if (Character.Minutes >= 60) { 
      await Character.increment('Hours', { by: 1 });
      Character.update({ Minutes: 0 });
   }

   Character.increment('Hunger', { by: -0.35 });
   Character.increment('Thirst', { by: -0.70 });

   if (Character.Muted > 0) {
      await Character.increment('Muted', { by: -1 });
   }
}


function Minute() {
   mp.players.forEach((player) => {
      if (player.data.logged && player.data.spawned) {
         Update(player);
      }
   });
   setTimeout(() => { Minute(); }, interval);
}


Minute();
