mp.events.addCommand({
  
   'duty': (player, fullText) => {
      if (!factions.isPlayerFactionType(player, FACTIONS_TYPES.LAW)) return player.outputChatBox(`Vasa fakcija nije odgovarajuceg tipa !`);
      let faction = factions.getFaction(player.faction);
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
      account.sendProxMessage(player, CHAT_RADIUS.ME, `* ${player.name} ${meText}.`, PURPLE_1, PURPLE_2, PURPLE_3, PURPLE_4, PURPLE_5);
   },

   'callsign': (player, fullText) => {
      if (!factions.isPlayerFactionType(player, FACTIONS_TYPES.LAW)) return player.notification(MSG_NOT_IN_SPEC_FACTION, NOTIFY_ERROR, 4);
      if (player.vehicle) { 
         let vehicle = player.vehicle;
         if (vehicle.callsign == null) { 
            vehicle.callsign = mp.labels.new(`LSPD callsign`, new mp.Vector3(vehicle.position.x, vehicle.position.y, vehicle.position.z), { los: true, font: 0, drawDistance: 5 });
         }
      } else { 
         player.notification(MSG_NOT_IN_VEHICLE, NOTIFY_ERROR, 4);
      }
   },

   'cuff': (player, fullText, target) => { 
      if (!factions.isPlayerFactionType(player, FACTIONS_TYPES.LAW)) return player.outputChatBox(`Vasa fakcija nije odgovarajuceg tipa !`);
      if (!target) return player.outputChatBox(`Koriscenje /cuff [igrac] !`);
      let recipient = account.findPlayer(target);
      let meText;

      if(!recipient) { 
         player.notification(MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4)
         return false; 
      } 

      if (!recipient.cuffed) { 
         recipient.call('client:playerCuff');
         recipient.cuffed = true;
         meText = `uzima par lisica sa pojasa te ih stavlja ${recipient.name}`;
         recipient.playAnimation('mp_arresting', 'idle', 1, 49);
      }
      else { 
         recipient.call('client:playerUncuff');
         recipient.cuffed = false;
         meText = `je skinuo lisice ${recipient.name}`;
         recipient.stopAnimation();
      }

      account.sendProxMessage(player, CHAT_RADIUS.ME, `* ${player.name} ${meText}.`, PURPLE_1, PURPLE_2, PURPLE_3, PURPLE_4, PURPLE_5);
   },

   'drag': (player, fullText, target) => { 
      if (!factions.isPlayerFactionType(player, FACTIONS_TYPES.LAW)) return player.outputChatBox(`Vasa fakcija nije odgovarajuceg tipa !`);
      let recipient = account.findPlayer(target);

      if(!recipient) { 
         player.notification(MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4) 
         return false; 
      } 

      recipient.call('client:policeDragPlayer', [player, true])
   }

});