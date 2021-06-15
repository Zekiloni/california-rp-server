

let Character = require('../models/Character');

mp.events.addProc({
   'server:player.character:create': async (player, character) => {
      character = JSON.parse(character);
      const Name = character.First_Name + ' ' + character.Last_Name;

      let Exist = await frp.Characters.findOne({ where: { Name: Name }});
      if (Exist) { 
         return false;
      } else { 
         const Created = await frp.Characters.New(player, character);
         return Created.id;
      }
   }
});
