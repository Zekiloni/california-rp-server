

mp.events.addCommand({
   'createitem': (player, full, name, hash, quant) => {
      if(player.admin < 2) return;
      inv.createItem(name, 'gun', hash, 0.12, quant, -1, -1, player.dimension, player.position);
   },
   
   'destroyitem': (player, text) => {
      if(player.admin < 2) return;
      let item = inv.nearItem(player);
      if (item) {
          player.outputChatBox(`Nearest item ${item.id} !`);
          inv.destroyItem(player, item);
      }
   }
});

