mp.events.addCommand({
  
   'goto': (player, fullText) => {
      if(player.admin < 1) return;
   },

   'kick': (player, fullText) => {
      if(player.admin < 1) return;
   },

   'ban': (player, fullText) => {
      if(player.admin < 2) return;
   },

   'gethere': (player, fullText) => {
      if(player.admin < 2) return;
   },

   'setmoney': (player, fullText) => {
      if(player.admin < 4) return;
   },

   'givemoney': (player, fullText) => {
      if(player.admin < 4) return;
   },

   'givegun': (player, fullText, target, weapon, ammo) => {
      if(player.admin < 4) return;
      let weaponHash = mp.joaat(weapon);
      player.outputChatBox(`${target} / ${weapon} / ${ammo}`)
      let recipient = account.findPlayer(target);

      if(!recipient) { 
         player.outputChatBox('Korisnik nije pronadjen'); 
         return false; 
      } 

      recipient.giveWeapon(weaponHash, parseInt(ammo) || 500);
      recipient.outputChatBox(`${player.name} vam je dao oruzije ${weapon} sa ${ammo} metaka`);
      player.outputChatBox(`Dali ste igracu ${recipient.name} oruzije ${weapon} sa ${ammo} metaka`);
   },

   'disarm': (player, fullText) => {
      if(player.admin < 3) return;
   },

   'customization': (player, fullText) => {
      if(player.admin < 3) return;
      player.call("client:showCustomization");
   },

   'clothing': (player, fullText) => {
      if(player.admin < 3) return;
      player.call("client:showClothing");
   },

   'veh': (player, fullText, hash, rr, gg, bb, rr2, gg2, bb2) => {
      if(player.admin < 3) return;
      let model = mp.joaat(hash), 
         position = player.position, rgb = {r: rr, g: gg, b: bb}, rgb2 = {r: rr2, g: gg2, b: bb2}, locked = false;
      veh.create(player, 1, model, locked, -1, 1, position, rgb, rgb2, 0, 0);
   },

   'vehtune': (player, fullText, modType, modIndex) => {
      if(player.admin < 3) return;
      if (!player.vehicle) return player.outputChatBox("You need to be in a vehicle to use this command.");
      player.vehicle.setMod(parseInt(modType), parseInt(modIndex));
      player.outputChatBox(`Mod Type ${modType} with Mod Index ${modIndex} applied.`);
   },

});