import { Config } from '../config';



const interval = 60 * 1000;

async function Update (Player: PlayerMp) {
   const Character = Player.Character, account = Player.Account;
   
   Character.increment('Minutes', { by: Config.happyHours == true ? 2 : 1 });

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
   mp.players.forEach((player: PlayerMp) => {
      if (player.data.logged && player.data.spawned) {
         Update(player);
      }
   });
   setTimeout(() => { Minute(); }, interval);
}


Minute();

