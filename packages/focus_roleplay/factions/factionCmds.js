mp.events.addCommand({
  
   'duty': (player, fullText) => {
      if (!fac.isPlayerFactionType(player, FACTIONS_TYPES.LAW)) return player.outputChatBox(`Vasa fakcija nije odgovarajuceg tipa !`);
      let faction = fac.getFaction(player.faction);
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

   'cuff': (player, fullText, target) => { 
      if (!fac.isPlayerFactionType(player, FACTIONS_TYPES.LAW)) return player.outputChatBox(`Vasa fakcija nije odgovarajuceg tipa !`);
      if (!target) return player.outputChatBox(`Koriscenje /cuff [igrac] !`);
      let recipient = account.findPlayer(target);
      let meText;

      if(!recipient) { 
         account.notification(player, 'Korisnik nije pronadjen !', 'error', 4)
         return false; 
      } 

      if (!recipient.cuffed) { 
         recipient.call('client:playerCuff');
         recipient.cuffed = true;
         meText = `uzima par ZIP lisica sa pojasa te ih stavlja ${recipient.name}`;
         recipient.playAnimation('mp_arresting', 'idle', 1, 49);
      }
      else { 
         recipient.call('client:playerUncuff');
         recipient.cuffed = false;
         meText = `je skinuo lisice ${recipient.name}`;
         recipient.stopAnimation();
      }

      account.sendProxMessage(player, CHAT_RADIUS.ME, `* ${player.name} ${meText}.`, 'F9B7FF', 'E6A9EC', 'C38EC7', 'D2B9D3');
   },

   'drag': (player, fullText, target) => { 
      if(!fac.isPlayerFactionType(player, FACTIONS_TYPES.LAW)) return player.outputChatBox(`Vasa fakcija nije odgovarajuceg tipa !`);
      let recipient = account.findPlayer(target);

      if(!recipient) { 
         account.notification(player, 'Korisnik nije pronadjen !', 'error', 4) 
         return false; 
      } 

      recipient.call('client:policeDragPlayer', [player, true])
   }

});