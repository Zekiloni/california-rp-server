

let Character = require('../models/Character');

mp.events.add({
   'server:player.character.create': async (player, info) => { 
      info = JSON.parse(info);

      //let NewCharacter = frp.Characters.New()
      console.log(info);
   }
})