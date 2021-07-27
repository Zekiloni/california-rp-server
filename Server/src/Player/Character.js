
/* Carry player */
//Start to carry a player on call
element.alpha = 0;
player.setVariable("carry", element.id);
Animations.apply(player, "missfinale_c2mcs_1", "fin_c2_mcs_1_camman", 49);
Animations.apply(element, "nm", "firemans_carry", 33);
Animations.disableControl(element);

//Stop carrying a player on call
element.alpha = 255;
player.setVariable("carry", undefined);
element.position = player.position;
Animations.clearTasks(element);
Animations.clearTasks(player);
Animations.enableControl(element);
/*                                  */

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