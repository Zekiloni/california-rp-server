

mp.events.addCommand({
   'createbiz': (player, fullText, type, price) => {
      if(player.admin < 4) return;
      biz.create(player, type, price);
   },
   
   'destroybiz': (player, fullText) => {
      if(player.admin < 4) return;
      let bussines = biz.nearby(player);
      if (bussines) {
          player.outputChatBox(`Nearest biz ${bussines.id} !`);
          biz.delete(player, bussines);
      }
   },

   'editbiz': (player, fullText) => { 
      if(player.admin < 4) return;
      let bussines = biz.nearby(player);
      if(bussines) {

      }
   },

   'business': (player, fullText) => {
      if(fullText) { 
         let bussines = biz.nearby(player);
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
