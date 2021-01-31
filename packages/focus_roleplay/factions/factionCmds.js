mp.events.addCommand({
  
   'duty': (player, fullText) => {

      if (player.faction == 0) return player.outputChatBox(`Niste ni u jednoj fakciji !`);
      let faction = fac.getFaction(player.faction);
      if (!faction.TYPE == FACTIONS_TYPES.LAW) return player.outputChatBox(`Vasa fakcija nije odgovarajuceg tipa !`);
      let dutyPos = new mp.Vector3(faction.EQUIP_POINT_X, faction.EQUIP_POINT_Y, faction.EQUIP_POINT_Z)
      if (player.dist(dutyPos) > 2) return player.outputChatBox(`Ne nalazite se u blizini ormarica !`);

      let meText = ``;
      if(!player.duty) {
         player.duty = true
         meText = `oblaci svoju uniformu i uzima znacku iz ormarica`;
      }
      else { 
         player.duty = false;
         meText = `skida svoju uniformu i vraca znacku u ormaric`;
      }
      account.sendProxMessage(player, CHAT_RADIUS.ME, `* ${player.name} ${meText}.`, 'F9B7FF', 'E6A9EC', 'C38EC7', 'D2B9D3');
   },

   'callsign': (player, fullText) => {

      //radio.send(player, 911)
   },

});