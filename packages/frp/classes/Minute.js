

const minute = 60 * 1000;

class Minute { 
   static Spend () { 
      mp.players.forEach((player) => { 
         if (player.data.logged && player.data.spawned) { 
            let character = player.Character(), account = player.Account();

            character.Minutes ++;

            if (character.Minutes >= 60) { 
               character.Hours ++;
               character.Minutes = 0;
               let bank = a;

            }
         }
      })
      setTimeout(() => { this.Spend(); }, minute);
   }
}

Minute.Spend();




