

require('../models/Business');

const { ItemEntities } = require('./Items.Registry');

mp.events.add({
   'server:bussines.market:buy': async (Player, Total, Items, Biz) => { 
      const Character = await Player.Character();
   
      if (Character.Money < Total) return Player.Notification(frp.Globals.messages.NOT_ENOUGH_MONEY, frp.Globals.Notification.Error, 5);

      Items = JSON.parse(Items);

      const Business = await frp.Business.findOne({ where: { id: Biz } });
      let Products = Business.Products;

      Items.forEach(Item => {
         if (Products[Item.name].supplies < Item.quantity) return Player.Notification(frp.Globals.messages.NOT_ENOUGH_PRODUCTS, frp.Globals.Notification.Error, 5);

         frp.Items.New(Item.name, Item.quantity, ItemEntities.Player, Player.character);
         Products[Item.name].supplies -= Item.quantity;
      });

      Character.GiveMoney(Player, -Total);

      Business.increment('Budget', { by: Total });
      Business.Products = Products;
      await Business.save();
   },
   
   'server:business.drinks:buy': async (Player, Total, Item, Biz) => { 
      const Character = await Player.Character();

      if (Character.Money < Total) return Player.Notification(frp.Globals.messages.NOT_ENOUGH_MONEY, frp.Globals.Notification.Error, 5);

      const Business = await frp.Business.findOne({ where: { id: Biz } });
      let Products = Business.Products;

      if (Products[Item].supplies < 1) return Player.Notification(frp.Globals.messages.NOT_ENOUGH_PRODUCTS, frp.Globals.Notification.Error, 5);
      
      Products[Item].supplies --;
      frp.Items.New(Item, 1, ItemEntities.Player, Player.character);
      
      Character.GiveMoney(Player, -Total);

      Business.Products = Products;
      Business.increment('Budget', { by: Total });
      await Business.save();
   },

   'server:business.clothing:buy': async (player, Total, Items, Biz) => { 
      const Character = await Player.Character();

      if (Character.Money < Total) return Player.Notification(frp.Globals.messages.NOT_ENOUGH_MONEY, frp.Globals.Notification.Error, 5);
      const Business = await frp.Business.findOne({ where: { id: Biz } });
      let Products = Business.Products;

      if (Products[Item].supplies < 1) return Player.Notification(frp.Globals.messages.NOT_ENOUGH_PRODUCTS, frp.Globals.Notification.Error, 5);

      Itemms.forEach((Item) => { 
         
         Products.supplies --;
      });

      Character.GiveMoney(Player, -Total);
      
      Business.Products = Products;
      Business.increment('Budget', { by: Total });
      await Business.save();
   }

})