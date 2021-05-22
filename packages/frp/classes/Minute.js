const interval = 60 * 1000;


async function Update(player) {
   let character = await player.Character(), account = await player.Account();
   
   character.increment('Minutes', { by: frp.Settings.DoubleXP == true ? 2 : 1 }).then(async (Char) => {
      if (Char.Minutes >= 60) {
         await character.increment('Hours', { by: 1 });
         Char.update({ Minutes: 0 });
      }
   });

   if (character.Muted > 0) {
      await character.increment('Muted', { by: -1 });
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
