

let interval = 1; // minute

class Minute { 
   spend = function ()  { 
      let counter = 0;
      mp.players.forEach((target) => {
         if (target.data.logged && target.data.spawned) { 
            let account = target.getAccount(), character = target.getCharacter();
            
            character.experience ++;

            if (character.experience >= 60) { 
               characters.hours ++;
               character.experience = 0;
               // payday .... paycheck ... plata ... salary .. daj pare kurcu
            }
            mp.events.call('server:save.player.character.urgent', target)
         }
      });
   }
}

let minute = new Minute();
setInterval(() => { minute.spend(); }, interval * 60000);
