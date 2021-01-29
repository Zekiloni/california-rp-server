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
         let to = `(( PM za ${recipient.name} [${recipient.id}]: ${message} ))`;
         let from = `(( PM od ${player.name} [${player.id}]: ${message} ))`;
         recipient.outputChatBox(from);
         player.outputChatBox(to);
      } else return player.outputChatBox('Koriscenje /pm [igrac] [poruka]');
   },

   'me': (player, fullText) => {
   },

   'do': (player, fullText) => {
   },

});