



// igrac odabere dostavu, status dostave je in progress,,
// model dostave se sastoji od lokacije, sta je poruceno, kontakta (N/A ukoliko je server, broj telefona ukoliko je igrac)

import  House  from "../../models/house.model";
import { Items } from "../Items/Items";
import { Main } from "../Server/Main";
import { Globals } from "../Global/Globals";
import { Messages } from "../Global/Messages";
import { Vehicles } from "../../models/vehicle.model";
import Database from "../Server/Database";

const { ItemEntities } = require("../../classes/Items.Registry");

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

enum FoodDeliveryStatus {
   Ordered, Delivered, InProgress
}

export default class Food { 
   
   Position: Vector3Mp;
   Items: Items[];
   Contact: string;
   Status: FoodDeliveryStatus;
   Deleting: any;

   static Orders: Food[] = [];

   constructor (Position: Vector3Mp, Items: Items[], Contact: string) { 
      this.Position = Position;
      this.Items = Items;
      this.Contact = Contact || 'N / A';
      this.Status = FoodDeliveryStatus.Ordered;

      Food.Orders.push(this);
   }

   static NewOrder (Position: Vector3Mp, Items: Items[], Contact: string) {
      new Food(Position, Items, Contact); 
   }

   static GetOrders () { 
      let List = [];
      for (const Order of Food.Orders) { 
         List.push({ Position: Order.Position, Items: Order.Items, Contact: Order.Contact, Status: Order.Status });
      }
   }

   static async Check () { 
      if (Food.Orders.length == 5) return; 

      const Missing = 5 - Food.Orders.length;

      for (let i = 0; i < Missing; i ++) { 
         const HouseInstance = await House.findOne({ order: Database.random() });
         if (HouseInstance) { 
            const Position = new mp.Vector3(HouseInstance.Position.x, HouseInstance.Position.y, HouseInstance.Position.z);
        
            const ItemsNumber = Main.Between(1, 4);
            // let Order = [];
            // for (let item = 0; item < ItemsNumber; item ++) {
            //     Order.push(Items.GetRandomByType(6).name);
            // }
         
            // Food.NewOrder(Position, Order, 'N / A');
         }
      }
   }

   async Deliver (Player: PlayerMp) { 
      const Character = Player.Character;
      let Counter = 0;
   
      for (const OrderedItem of this.Items) { 
        //  const Item = await Items.HasItem(player.CHARACTER_ID, OrderedItem);
        //  if (Item) { 
        //     Item.destroy();
        //     Counter ++;
        //  }
      }
   
      this.Status = FoodDeliveryStatus.Delivered;
      this.Deleting = setTimeout(() => {
         const Index = Food.Orders.indexOf(this);
         Food.Orders.splice(Index, 1);
      }, Configuration.DeleteInterval);
   
      if (Counter == this.Items.length) { 
         const Earned = Globals.Jobs.Multiplier * Main.Between(4, 8);
         Character.GiveMoney(Player, Earned);
         Player.Notification(Messages.ORDER_SUCCESS + Main.Dollars(Earned) + '.', NotifyType.SUCCESS, 5);
         
      } else { 
        Player.Notification(Messages.ORDER_NOT_COMPLETED, NotifyType.ERROR, 5);
      }
   };
};





mp.events.addProc({
   'server:job.food.order:accept': async (player, index) => { 
      let Order = Food.Orders[index];
      const Character = await player.Character();

      if (Order && Order.Status == FoodDeliveryStatus.Ordered) { 

         Order.Status = FoodDeliveryStatus.InProgress;
            
         if (player.getVariable('Job_Vehicle') == null) { 
            let AvailablePosition = null;

            for (const Position of Configuration.Vehicle.Positions) { 
               if (Main.IsAnyVehAtPos(Position, 1.5).length == 0) {
                  AvailablePosition = Position;
                  break;
               }
            }

            if (AvailablePosition) {
               let Vehicle = Vehicles.CreateTemporary(
                  Configuration.Vehicle.Model, 
                  AvailablePosition, Configuration.Vehicle.Rotation, 
                  Configuration.Vehicle.Color, 'FO0' + Main.GenerateNumber(111, 9999)
               );
   
               (await Vehicle).setVariable('Job', Globals.Jobs.Food_Delivery);
     
               player.setVariable('Job_Vehicle', (await Vehicle).id);
            }
            
         }

         for (const Item of Order.Items) { 
            //Items.New(Item, 1, ItemEntities.Player, player.character);
         }

         Character.GiveMoney(player, -(Order.Items.length * 4));

         return Order;
      } else { 
         player.Notification(Messages.ORDER_ALREADY_PROCESSING, NotifyType.ERROR, 5);
         return false;
      }
   }
});


mp.events.add({
   'SERVER::JOB:FOOD:ORDER:DELIVER': (player, index) => { 
      const Order = Food.Orders[index];
      Order.Deliver(player);
   }
});


(async () => { 
   setInterval(() => { Food.Check(); }, Configuration.CheckInterval);
})();