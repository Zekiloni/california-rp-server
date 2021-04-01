
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

   'f': (player, fullText) => { 
      account.sendFactionMessage(player, fullText);
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

   'frequency': (player, fullText) => {
      if(fullText) { 
         let args = fullText.split(" ");
         let freq = args[1];
         let pw = args[2];
         switch(args[0]) {
            case 'set':
               if (!freq) return player.outputChatBox(`Polje frekvencije je obavezno.`);
               if (player.radioFreq != 0) return player.outputChatBox(`Vec ste u nekoj frekvenciji (/frequency leave da izadjete) !`); 
               radio.join(player, freq, pw)
               break;

            case 'create':
               if (!freq) return player.outputChatBox(`Polje frekvencije je obavezno polje !`);
               radio.create(player, freq, pw)
               break;

            case 'leave':
               if (player.radioFreq == 0) return player.outputChatBox(`Niste ni u jednoj frekvenciji !`);
               player.radioFreq = 0;
               player.outputChatBox(`Uspesno ste napustili frekvenciju.`);
               break;

            case 'delete':
               if (player.radioFreq == 0) return player.outputChatBox(`Niste ni u jednoj frekvenciji !`);
               radio.delete(player, player.radioFreq);
               break;

            default:
               player.outputChatBox(`Komanda nema argumente /frequency (set, create, leave, delete) !`);
         }
      }
      else {  player.outputChatBox(`Komanda nema argumente /frequency (set, create, leave, delete) !`); }
   },

   'r': (player, fullText) => { 
      radio.send(player, player.radioFreq, fullText);
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

   'buy': (player, fullText, target) => { 
      let nearBiz = business.nearby(player),
         nearHouse = houses.near(player);
      if (nearBiz) { account.buyBiz(player, nearBiz); }
      if (nearHouse) { houses.buy(player, nearHouse); }
   },

   'business': (player, fullText) => {
      if(fullText) { 
         let bussines = business.nearby(player);
         if (bussines && bussines.owner == player.databaseID) { 
             let args = fullText.split(" ");
             switch(args[0]) {
               case 'help':
                  player.outputChatBox(`BIZ HELP !`);
                  break;
               case 'info':
                  player.outputChatBox(`BIZ INFO !`);
                  break;
               case 'sell':
                  player.outputChatBox(`BIZ sell !`);
                  break;
               case 'products':
                  player.outputChatBox(`BIZ sell !`);
                  break;
               default:
                  player.outputChatBox(`Komanda nema argumente /business (info, sell, products, list) !`);
             }
         }
         else { player.outputChatBox(`Niste u blizini niti jednog vaseg biznisa ! `); }
      }
      else {  player.outputChatBox(`Komanda nema argumente /business (info, sell, products, list) !`); }
   }

});