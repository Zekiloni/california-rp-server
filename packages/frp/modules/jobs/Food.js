



// uzme posao
// prikaze mu dostave, pushati dostave igraca, ukoliko ima manje od pet dstava ukupno,
// server automatski proverava i pusha toliko dostava koliko fali do pet
// igrac odabere dostavu, status dostave je in progress,,
// model dostave se sastoji od lokacije, sta je poruceno, kontakta (N/A ukoliko je server, broj telefona ukoliko je igrac)


const OrderStatus = { 
   Ordered: 0,
   InProgress: 1,
   Delivered: 2
};

const Configuration = { 
   Vehicle: { 
      Model: 'faggio',
      Colors: { Primary: 44, Secondary: 42 },
      Rotation: new mp.Vector3(1.4121, -11.5783, 140.718),
      Positions: [
         new mp.Vector3(151.3404, -1520.4874, 28.618),
         new mp.Vector3(148.7998, -1517.9329, 28.623),
         new mp.Vector3(146.1401, -1516.2443, 28.622),
         new mp.Vector3(143.5799, -1513.7885, 28.621)
      ]
   }
}


frp.Food = class Food { 

   static Orders = [];

   constructor (position, items, contact) { 
      this.Position = position;
      this.Items = items;
      this.Contact = contact || 'N / A';
      this.Status = OrderStatus.Ordered;

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
        
            const ItemsNumber = frp.Main.Between(1, 3);
            let Order = [];
            for (let item = 0; item < ItemsNumber; item ++) {
               Order.push(frp.Items.GetRandomByType(6).name);
            }
         
            Food.NewOrder(Position, Order, 'N / A');
         }
      }
   }
};


frp.Food.prototype.Deliver = function (player) { 
   // give some money bitch
   this.Remove();
};


frp.Food.prototype.Remove = function () {
   const Index = frp.Food.Orders.indexOf(this);
   frp.Food.Orders.splice(Index, 1);
};


mp.events.addProc({
   'server:job.food.order:accept': (player, orderid, haveVehicle = false) => { 
      const Order = frp.Food.Orders[orderid];
      if (Order.Status != OrderStatus.Ordered) {
         // PORUKA: Porudzbina je zavrsena ili je u toku isporuka...
         return false;
      } else { 
         Order.Status = OrderStatus.InProgress;
         let Vehicle = null;

         if (haveVehicle == false) { 
            let AvailablePosition = null;

            for (const Position of Configuration.Vehicle.Positions) { 
               if (frp.Main.IsAnyVehAtPos(Position, 1.5) == false) {
                  AvailablePosition = Position;
                  break;
               }
            }

            Vehicle = frp.Vehicles.CreateTemporary(
               mp.joaat(Configuration.Vehicle.Model), 
               AvailablePosition, Configuration.Vehicle.Rotation, 
               color, 'FO0' + frp.Main.GenerateNumber(3)
            );
         }

         // DAJ PREDMETE PORUDZBINE
         // PORUKA: Uzima sa stola pourdzbinu...

         return [Vehicle.id, Order.Position];
      }
   }
});


(async () => { 
   setInterval(() => { frp.Food.Check(); }, 30000);
})();