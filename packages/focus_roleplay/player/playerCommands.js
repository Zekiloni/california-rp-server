
mp.events.addCommand({
  
   'pm': (player, fullText) => {
      if(fullText) { 
         let args = fullText.split(" ");
         if (args.length < 2 || !args[0].length || !args[1].length) {
            player.outputChatBox('Koriscenje /pm [igrac] [poruka]');
            return false;
          }
          let recipient = account.findPlayer(args[0]);
      
         if(!recipient) { 
            player.outputChatBox('Korisnik nije pronadjen'); 
            return false; 
         } 
   
         let message = args.slice(1).join(' '); 
         let to = `!{FCBD00}(( PM za ${recipient.name} [${recipient.id}]: ${message} ))`;
         let from = `!{FFD500}(( PM od ${player.name} [${player.id}]: ${message} ))`;
         recipient.outputChatBox(from);
         player.outputChatBox(to);
      } else return player.outputChatBox('Koriscenje /pm [igrac] [poruka]');
   },

   'me': (player, fullText) => {
      if (!player.loggedIn) return;
      account.sendProxMessage(player, CHAT_RADIUS.ME, `** ${player.name} ${fullText}`, 'F9B7FF', 'E6A9EC', 'C38EC7', 'D2B9D3');
   },

   'do': (player, fullText) => {
      if (!player.loggedIn) return;
      account.sendProxMessage(player, CHAT_RADIUS.DO, `** ${fullText} (( ${player.name} ))`, 'F9B7FF', 'E6A9EC', 'C38EC7', 'D2B9D3');
   },

   // shout
   's': (player, fullText) => {
      if (!player.loggedIn) return;
      account.sendProxMessage(player, CHAT_RADIUS.SHOUT, `${player.name} vice: ${fullText}`, 'FFFFFF', 'E6E6E6', 'C8C8C8', 'AAAAAA', '6E6E6E');
   },

   // low
   'l': (player, fullText) => {
      if (!player.loggedIn) return;
      account.sendProxMessage(player, CHAT_RADIUS.LOW, `${player.name} tiho: ${fullText}`, 'E6E6E6', 'C8C8C8', 'AAAAAA', '6E6E6E', '6E6E6E');
   },

   'ame': (player, fullText) => {
      account.sendChatBuble(player, 4.0, fullText);
   },

   // whisper
   'w': (player, fullText) => { 
      if(fullText) { 
         let args = fullText.split(" ");
         if (args.length < 2 || !args[0].length || !args[1].length) {
            player.outputChatBox('Koriscenje /w [igrac] [tekst]');
            return false;
          }
          let recipient = account.findPlayer(args[0]);
      
         if(!recipient) { 
            player.outputChatBox('Korisnik nije pronadjen'); 
            return false; 
         } 

         if(!playerNearTarget(player, recipient)) return player.outputChatBox('Taj igrac nije u vasoj blizini.');
   
         let message = args.slice(1).join(' '); 
         let to = `!{6E6E6E}${player.name} sapuce: ${message}`;
         let from = `!{6E6E6E}${player.name} vam sapuce: ${message}`;
         recipient.outputChatBox(from);
         player.outputChatBox(to);
      } else return player.outputChatBox('Koriscenje /w [igrac] [poruka]');
   },

    // ooc chat
   'b': (player, fullText) => { 
      if (!player.loggedIn) return;
      account.sendProxMessage(player, CHAT_RADIUS.OOC, `(( ${player.name} [${player.id}]: ${fullText} ))`, 'A6BFBF', 'A0B8B8', '97ADAD', '95ABAB', '90A6A6');
   },

   'invite': async (player, fullText, target) => { 
      if (!player.loggedIn) return;
      if (!target) return player.outputChatBox('Koriscenje /invite [igrac]'); 
      fac.invite(player, target);
   },

   'uninvite': async (player, fullText, target) => { 
      if (!player.loggedIn) return;
      if (!target) return player.outputChatBox('Koriscenje /uninvite [igrac]'); 
      fac.uninvite(player, target);
   },

   'giverank': async (player, fullText) => { 
      if(fullText) { 
         let args = fullText.split(" ");
         if (args.length < 2 || !args[0].length || !args[1].length) {
            player.outputChatBox('Koriscenje /giverank [igrac] [rank]');
            return false;
         }

         let recipient = account.findPlayer(args[0]);
      
         if(!recipient) { 
            player.outputChatBox('Korisnik nije pronadjen'); 
            return false; 
         } 
         let newRank = args.slice(1).join(' '); 
         fac.setRank(player, recipient, newRank);
      } else return player.outputChatBox('Koriscenje /giverank [igrac] [rank]');
   },

   'f': (player, fullText) => { 
      if (!player.loggedIn) return;
      account.sendFactionMessage(player, fullText);
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
               player.outputChatBox(`Komanda nema argumente /accept (invite, ...) !`);
            }
      }
      else {  player.outputChatBox(`Komanda nema argumente /accept (invite, ...) !`); }
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
               player.outputChatBox(`Komanda nema argumente /frequency (set, ...) !`);
         }
      }
      else {  player.outputChatBox(`Komanda nema argumente /frequency (set, ...) !`); }
   },

   'r': (player, fullText) => { 
      if (!player.loggedIn) return;
      radio.send(player, player.radioFreq, fullText);
   },

});