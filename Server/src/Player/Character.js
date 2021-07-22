



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
   },

   'server:character.attachment:remove': (Player) => {
      Player.setVariable('Attachment', null);
      Player.stopAnimation();
      return null;
   },

   'server:character.wounded': async (Player, Target) => { 
      const Character = await Target.Character();
      return Character.Wound(Target, true);
   },
});



mp.events.add({
   'server:interactions:lock': (Player) => { 
      frp.Commands[frp.Globals.Commands.Lock].call(Player);
   },
   
   'server:character.clothing:restart': async (Player) => { 
      const Character = await Player.Character();
      frp.Items.Equipment(Player, Character.Gender);
   },

   'server:character.animation': (player, dict, name, flag) => { 
      player.playAnimation(dict, name, 8, flag);
   },

   'server:character.attachment': async (player, model, bone) => { 
      const Character = await player.Character();
      Character.Attachment(player, model, bone);
   },

   'server:character.wounded:fall': (Player) => { 
      Player.setVariable('Ragdoll', { Time: 2000 });
      setTimeout(() => { if (Player) Player.setVariable('Ragdoll', false); }, 2000);
   },

   'server:character.injuries:add': async (Player, Injury) => { 
      Injury = JSON.parse(Injury);
      const Character = await Player.Character();
      await Character.Injury(Player, Injury);
      return true;
   },
   
   'playerDeath': (Player, Reason, Killer) => { 
      Player.Character().then((Character) => { 
         Character.Wound(Player, true);
      });
   }
})