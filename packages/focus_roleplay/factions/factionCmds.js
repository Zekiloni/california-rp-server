mp.events.addCommand({
  
   'duty': (player, fullText) => {

      if (player.faction == 0) return player.outputChatBox(`Niste ni u jednoj fakciji !`);
      let faction = fac.getFaction(player.faction);
      if (!faction.TYPE == FACTIONS_TYPES.LAW) return player.outputChatBox(`Vasa fakcija nije odgovarajuceg tipa !`);
      let dPos = faction.EQUIP_POINT;
      let dutyPos = new mp.Vector3(dPos.x, dPos.y, dPos.z)
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

   'cuff': (player, fullText, taget) => { 
      if(!fac.isPlayerFactionType(player, FACTIONS_TYPES.LAW)) return player.outputChatBox(`Vasa fakcija nije odgovarajuceg tipa !`);
      let recipient = account.findPlayer(target);

      if(!recipient) { 
         player.outputChatBox('Korisnik nije pronadjen'); 
         return false; 
      } 

      recipient.removeAllWeapons();
      recipient.outputChatBox(`${player.name} vam je oduzeo vasa oruzija.`);
      player.outputChatBox(`Oduzeli ste sva oruzija ${recipient.name}.`);
   },

   'drag': (player, fullText, target) => { 
      if(!fac.isPlayerFactionType(player, FACTIONS_TYPES.LAW)) return player.outputChatBox(`Vasa fakcija nije odgovarajuceg tipa !`);
      let recipient = account.findPlayer(target);

      if(!recipient) { 
         player.outputChatBox('Korisnik nije pronadjen'); 
         return false; 
      } 

      recipient.call('client:policeDragPlayer', [player, true])
   }

});