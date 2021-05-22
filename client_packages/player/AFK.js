



const Player = mp.players.local;
let Counter = 0;
let Last_Position = null;

setInterval(() => {
   if (Player.logged && Player.spawned) { 
      Last_Position = Player.position;

      mp.gui.chat.push('LAST ' + JSON.stringify(Last_Position));
      mp.gui.chat.push('POS ' + JSON.stringify(Player.position));


      if (utils.CompareVectors(Last_Position, Player.position)) { 
         Counter ++;
         mp.gui.chat.push('Equal');
      }

      mp.gui.chat.push('not equl is not')


      if (Counter == 10) { 
         // mp.eventsc
      }
   }
}, 60000);







