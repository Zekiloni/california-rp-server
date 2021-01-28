

mp.events.addCommand({
   'createbiz': (player, fullText, type, price) => {
      if(player.admin < 4) return;
      biz.create(player, type, price);
   },
   
   'destroybiz': (player, text) => {
      if(player.admin < 4) return;
      var bussines = biz.nearby(player);
      if (bussines) {
          player.outputChatBox(`Nearest biz ${bussines.id} !`);
          biz.delete(player, bussines);
      }
   }
});
