



// igrac odabere dostavu, status dostave je in progress,,
// model dostave se sastoji od lokacije, sta je poruceno, kontakta (N/A ukoliko je server, broj telefona ukoliko je igrac)

const { ItemEntities } = require("../../classes/Items.Registry");


const Status = { 
   Ordered: 0,
   InProgress: 1,
   Delivered: 2
};

const Configuration = { 
   Vehicle: { 
      Model: 'faggio',
      Color: [44, 42],
      Rotation: new mp.Vector3(1.4121, -11.5783, 140.718),
      Positions: [
         new mp.Vector3(151.3404, -1520.4874, 28.618),
         new mp.Vector3(148.7998, -1517.9329, 28.623),
         new mp.Vector3(146.1401, -1516.2443, 28.622),
         new mp.Vector3(143.5799, -1513.7885, 28.621)
      ]
   },
   CheckInterval: 30000,
   DeleteInterval: 45000
}


frp.Food = class Food { 

   static Orders = [];

   constructor (position, items, contact) { 
      this.Position = position;
      this.Items = items;
      this.Contact = contact || 'N / A';
      this.Status = Status.Ordered;

      Food.Orders.push(this);
   }

   static NewOrder (position, items, contact) {
      new Food(position, items, contact); 
   }

   static GetOrders () { 
      return Food.Orders;
   }

   static async Check () { 
      if (Food.Orders.length == 5) return;

      const Missing = 5 - frp.Food.Orders.length;

      for (let i = 0; i < Missing; i ++) { 
         const House = await frp.Houses.findOne({ order: frp.Database.random() });
         if (House) { 
            const Position = new mp.Vector3(House.Position.x, House.Position.y, House.Position.z);
        
            const ItemsNumber = frp.Main.Between(1, 4);
            let Order = [];
            for (let item = 0; item < ItemsNumber; item ++) {
               Order.push(frp.Items.GetRandomByType(6).name);
            }
         
            Food.NewOrder(Position, Order, 'N / A');
         }
      }
   }
};


frp.Food.prototype.Deliver = async function (player) { 
   const Character = await player.Character();
   let Counter = false;

   for (const OrderedItem of this.Items) { 
      const Item = await frp.Items.HasItem(player.character, OrderedItem);
      if (Item) { 
         Item.destroy();
         Counter ++;
      }
   }

   this.Status = Status.Delivered;
   this.Deleting = setTimeout(() => {
      const Index = frp.Food.Orders.indexOf(this);
      frp.Food.Orders.splice(Index, 1);
   }, Configuration.DeleteInterval);

   if (Counter == this.Items.length) { 
      const Earned = frp.Globals.Jobs.Multiplier * frp.Main.Between(4, 8);
      Character.Payment(Earned);
      player.Notification(frp.Globals.messages.ORDER_SUCCESS + frp.Main.Dollars(Earned) + '.', frp.Globals.Notification.Succes, 5);
      
   } else { 
      player.Notification(frp.Globals.messages.ORDER_NOT_COMPLETED, frp.Globals.Notification.Error, 5);
   }
};


mp.events.addProc({
   'server:job.food.order:accept': async (player, index) => { 
      let Order = frp.Food.Orders[index];
      const Character = await player.Character();

      if (Order && Order.Status == Status.Ordered) { 

         Order.Status = Status.InProgress;
            
         if (player.getVariable('Job_Vehicle') == null) { 
            let AvailablePosition = null;

            for (const Position of Configuration.Vehicle.Positions) { 
               if (frp.Main.IsAnyVehAtPos(Position, 1.5).length == 0) {
                  AvailablePosition = Position;
                  break;
               }
            }

            let Vehicle = frp.Vehicles.CreateTemporary(
               Configuration.Vehicle.Model, 
               AvailablePosition, Configuration.Vehicle.Rotation, 
               Configuration.Vehicle.Color, 'FO0' + frp.Main.GenerateNumber(3)
            );
  
            player.setVariable('Job_Vehicle', Vehicle.id);
         }

         for (const Item of Order.Items) { 
            frp.Items.New(Item, 1, ItemEntities.Player, player.character);
         }

         Character.GiveMoney(player, -(Order.Items.length * 4));

         return Order;
      } else { 
         player.Notification(frp.Globals.messages.ORDER_ALREADY_PROCESSING, frp.Globals.Notification.Error, 5);
         return false;
      }
   }
});


mp.events.add({
   'server:job.food.order:deliver': (player, index) => { 
      const Order = frp.Food.Orders[index];
      Order.Deliver(player);
   }
});


(async () => { 
   setInterval(() => { frp.Food.Check(); }, Configuration.CheckInterval);
})();