



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
   'server:job.food.order:accept': (player, orderid) => { 
      const Order = frp.Food.Orders[orderid];
      if (Order.Status != OrderStatus.Ordered) {
         // PORUKA: Porudzbina
         return false;
      } else { 
         Order.Status = OrderStatus.InProgress;
         // PORUKA: Uzima sa stola pourdzbinu...
         return true;
      }
   }
});


(async () => { 
   setInterval(() => { frp.Food.Check(); }, 30000);
})();