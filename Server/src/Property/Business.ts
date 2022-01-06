

// // require('../models/Business');

// import { Globals } from "../Global/Globals";
// import { Messages } from "../Global/Messages";
// import Business from "../Models/Business";
// import Items from "../Models/Item";
// import { VehicleEntities, Vehicles } from "../Models/Vehicles";
// import { Main } from "../Server/Main";

// // const { VehicleEntities } = require('../models/Vehicle');
// // const { ItemEntities } = require('./Items.Registry');



// mp.events.add({
//    'server:bussines.market:buy': async (Player: PlayerMp, Total: number, ItemsList: string, Biz) => { // ItemsList:Items[] ? 
//       const Character = await Player.Character();
   
//       if (Character.Money < Total) return Player.Notification(Messages.NOT_ENOUGH_MONEY, NotifyType.ERROR, 5);

//       const ItemsObj = JSON.parse(ItemsList);

//       const InBusiness = await Business.findOne({ where: { id: Biz } });
//       if (!InBusiness) return Main.Terminal(3, '[ERROR][SERVER:BUSINESS.MARKET:BUY] Business not found in database. | ' + `Biz ID: ${Biz} CharId: ${Player.CHARACTER_ID}`);
      
//       let Products = InBusiness.Products;

//       InBusiness.increment('Budget', { by: Total });
//       InBusiness.Products = Products;
      
      

//       ItemsObj.forEach(Item => {
//          if (Products[Item.name].Supplies < Item.quantity) return Player.Notification(Messages.NOT_ENOUGH_PRODUCTS, NotifyType.ERROR, 5);

//          Item.New(Item.name, Item.quantity, ItemEntities.Player, Player.CHARACTER_ID);
//          Products[Item.name].Supplies -= Item.quantity;
//       });

//       Character.GiveMoney(Player, -Total);

      
//       await InBusiness.Save();
//    },
   
//    'server:business.drinks:buy': async (Player, Total, Item, Biz) => { 
//       const Character = await Player.Character();

//       if (Character.Money < Total) return Player.Notification(Messages.NOT_ENOUGH_MONEY, NotifyType.ERROR, 5);

//       const InBusiness = await Business.findOne({ where: { id: Biz } });
//       if (!InBusiness) return Main.Terminal(3, '[ERROR][SERVER:BUSINESS.DRINKS:BUY] Business not found in database. | ' + `ID: ${Biz} CharId: ${Player.CHARACTER_ID}`);
//       let Products = InBusiness.Products;

//       if (Products[Item].Supplies < 1) return Player.Notification(Messages.NOT_ENOUGH_PRODUCTS, NotifyType.ERROR, 5);
      
//       Products[Item].Supplies --;
//       // Items.New(Item, 1, ItemEntities.Player, Player.character);
      
//       Character.GiveMoney(Player, -Total);

//       InBusiness.Products = Products;
//       InBusiness.increment('Budget', { by: Total });
//       await InBusiness.save();
//    },

//    'server:business.clothing:buy': async (player, Total, Items, Biz) => { 
//       const Character = await player.Character();

//       if (Character.Money < Total) return player.Notification(Messages.NOT_ENOUGH_MONEY, NotifyType.ERROR, 5);
//       const InBusiness = await Business.findOne({ where: { id: Biz } });
//       if (!InBusiness) return Main.Terminal(3, '[ERROR][SERVER:BUSINESS.CLOTHING:BUY] Business not found in database. | ' + `ID: ${Biz} CharId: ${player.CHARACTER_ID}`);
//       let Products = InBusiness.Products;

//       if (Products['Clothing'].Supplies < 1) return player.Notification(Messages.NOT_ENOUGH_PRODUCTS, NotifyType.ERROR, 5);


//       Items = JSON.parse(Items);

//       Items.forEach(async (Item) => { 
//          const clothing = await Items.New(Item.component, 1, ItemEntities., player.character);
//          clothing.Extra = { Drawable: Item.drawable, Texture: Item.texture };
//          await clothing.save();
//          Products['Clothing'].supplies --;
//       });

//       Items.Equipment(player, Character.Gender);

//       Character.GiveMoney(player, -Total);
      
//       InBusiness.Products = Products;
//       InBusiness.increment('Budget', { by: Total });
//       await InBusiness.Save();
//    },

//    'server:business.dealership.vehicle:buy': async (Player, Total, Model, Color, Biz) => { 

//       Total = parseInt(Total);
//       Color = JSON.parse(Color);

//       const Character = await Player.Character();

//       if (Character.Money < Total) return Player.Notification(Messages.NOT_ENOUGH_MONEY, NotifyType.ERROR, 4);
//       const InBusiness = await Business.findOne({ where: { id: Biz } });
//       if (!InBusiness) return;

//       let Products = InBusiness.Products;
//       const VehiclePoint = InBusiness.Vehicle_Point;
//       if (Main.IsAnyVehAtPos(new mp.Vector3(VehiclePoint.x, VehiclePoint.y, VehiclePoint.z), 1.5).length > 0) return; Player.Notification(Messages.VEHICLE_POINT_IS_NOT_FREE, NotifyType.ERROR, 4);

      

//       console.log(Products[Model]);

//       if (Products[Model].Supplies < 1) return Player.Notification(Messages.NOT_ENOUGH_PRODUCTS, NotifyType.ERROR, 4);

//       Products[Model].Supplies --;

//       Character.GiveMoney(Player, -Total);

//       Player.Notification(Messages.SUCCESSFULLY_BUYED_VEHICLE, NotifyType.SUCCESS, 6);

//       Player.call('client:business.dealership:menu');

//       Player.Notification(Messages.NOT_ENOUGH_PRODUCTS, NotifyType.ERROR, 5);
   

//       Vehicles.New(
//          Model, 
//          VehicleEntities.Player,
//          Character.id, 
//          new mp.Vector3(VehiclePoint.x, VehiclePoint.y, VehiclePoint.z),
//          180
//       );
      
//       InBusiness.Products = Products;
//       InBusiness.increment('Budget', { by: Total });
//       await InBusiness.save();

//    }
// });

