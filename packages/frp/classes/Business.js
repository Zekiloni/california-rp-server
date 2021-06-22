

require('../models/Business');

const { ItemEntities } = require('./Items.Registry');

mp.events.add({
   'server:bussines.market:buy': async (player, Total, Items, business) => { 
      Items = JSON.parse(Items);

      const Business = await frp.Business.findOne({ where: { id: business } });
      let Products = Business.Products;
      
      const Character = await player.Character();
      Character.GiveMoney(player, -Total);

      Items.forEach(Item => {
         frp.Items.New(Item.name, Item.quantity, ItemEntities.Player, player.character);
         Products[Item.name].supplies -= Item.quantity;
      });

      Business.increment('Budget', { by: Total });
      Business.Products = Products;
      await Business.save();
   }
})