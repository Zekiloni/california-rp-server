
mp.events.addCommand({
  


   'ame': (player, fullText) => {
      account.sendChatBuble(player, 4.0, fullText);
   },

   'invite': async (player, fullText, target) => { 
      if (!target) return player.outputChatBox('Koriscenje /invite [igrac]'); 
      factions.invite(player, target);
   },

   'uninvite': async (player, fullText, target) => { 
      if (!target) return player.outputChatBox('Koriscenje /uninvite [igrac]'); 
      factions.uninvite(player, target);
   },

   'lock': (player, fullText) => { 
      let veh = factions.nearFactionVehicle(player);
      if (veh) { 
         if(veh.locked) { 
            veh.locked = false;
            account.sendProxMessage(player, CHAT_RADIUS.ME, `* ${player.name} otkljucava vozilo.`, PURPLE_1, PURPLE_2, PURPLE_3, PURPLE_4, PURPLE_5);
         }
         else { 
            veh.locked = true;
            account.sendProxMessage(player, CHAT_RADIUS.ME, `* ${player.name} zakljucava vozilo.`, PURPLE_1, PURPLE_2, PURPLE_3, PURPLE_4, PURPLE_5);
         }
      } else { player.outputChatBox('U vasoj blizini se ne nalazi nista sto bi se moglo zakljucati.');  }
   },

   'dl': (player, fullText) => { 
      doors.controlNearDoor(player)
   },

   'windows': (player, fullText) => { 
      if (fullText) { 
         if (!player.vehicle) return player.outputChatBox('Ne nalazite se u vozilu.');
         let args = fullText.split(" ");
         let index = args[0], veh = player.vehicle;
         if (!index) return player.outputChatBox('Koriscenje /windows [broj prozora]'); 

         // napraviti event clientSide i foreach svih igraca i spustiti prozor vozilu
         // Vehicle.rollDownWindow(index)
         // Vehicle.rollUpWindow(index)
         // isWindowIntact(index) da li je slomljen ili nije 
      } 
   },

   'giverank': async (player, fullText) => { 
      if(fullText) { 
         let args = fullText.split(" ");
         if (args.length < 2 || !args[0].length || !args[1].length) {
            player.notification(MSG_CMD_SYNTAX + '/giverank [igrac] [rank]', NOTIFY_INFO, 6)
            return false;
         }

         let recipient = account.findPlayer(args[0]);
      
         if(!recipient) { 
            player.notification(MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4)
            return false; 
         } 
         let newRank = args.slice(1).join(' '); 
         factions.setRank(player, recipient, newRank);
      } else return player.notification(MSG_CMD_SYNTAX + '/giverank [igrac] [rank]', NOTIFY_INFO, 6)
   },

   'paycheck': (player, fullText) => { 
      let timeToPayCheck = 60 - player.xp;
      player.outputChatBox(`Jos ${timeToPayCheck} minuta do sledece plate.`);
   },

   'quitjob': (player, fullText) => { 
      if (player.job == 0) return player.notification(MSG_UNEMPLOYED, NOTIFY_ERROR, 4);
      if (player.duty) return player.notification('Morate prvo stopirati rad.', NOTIFY_ERROR, 4)

      player.job = 0;
      player.notification(MSG_QUITJOB, NOTIFY_SUCCESS, 4)
   },

   'accept': (player, fullText) => {
      if(fullText) { 
            let args = fullText.split(" ");
            switch(args[0]) {
            case 'invite':
               if (player.faction != 0) return player.outputChatBox(`Vec ste u nekoj fakciji !`);
               if (!player.inviteRequest) return player.outputChatBox(`Niko vam nije poslao zahtev za pridruzivanje fakciji !`);
               player.faction = player.inviteRequest;
               player.outputChatBox(`Uspesno ste se pridruzili fakciji !`);
               break;
            case 'info':
               player.outputChatBox(`accept INFO !`);
               break;
            default:
               player.notification(MSG_CMD_SYNTAX + '/accept (invite, ...)', NOTIFY_INFO, 6)
            }
      }
      else { player.notification(MSG_CMD_SYNTAX + '/accept (invite, ...)', NOTIFY_INFO, 6) }
      
   },


   'id': (player, fullText, target) => { 
      let recipient = account.findPlayer(target);
      if(recipient) {
         player.outputChatBox(`[${recipient.id}] ${recipient.name}`)
      }
      else {
         player.notification(MSG_USER_NOT_FOUND, NOTIFY_ERROR, 4);
      }
   },
});