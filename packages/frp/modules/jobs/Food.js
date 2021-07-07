



// uzme posao
// prikaze mu dostave, pushati dostave igraca, ukoliko ima manje od pet dstava ukupno,
// server automatski proverava i pusha toliko dostava koliko fali do pet
// igrac odabere dostavu, status dostave je in progress,,
// model dostave se sastoji od lokacije, sta je poruceno, kontakta (N/A ukoliko je server, broj telefona ukoliko je igrac)


const Status = { 
   Ordered: 0,
   InProgress: 1,
   Delivered: 2
};

frp.Food = class Food { 

   static Deliveries = [];

   constructor (position, items, contact) { 
      this.position = position;
      this.items = items;
      this.contact = contact || 'N / A';
      this.status = Status.Ordered;

      Food.Deliveries.push(this);
   }

   static NewDelivery (position, items, contact) {
      new Food(position, items, contact); 
   }

   static GetDeliveries () { 
      return Food.Deliveries;
   }

   static async Check () { 
      if (Food.Deliveries.length == 5) return;

      const Missing = 5 - frp.Food.Deliveries.length;
      
      console.info('Nedostaje ' + Missing + ' porudzbina.');
      for (let i = 0; i < Missing; i ++) { 
         const House = await frp.Houses.findOne({ order: frp.Database.random() });
         if (House) { 
            const Position = new mp.Vector3(House.Position.x, House.Position.y, House.Position.z);
        
            const ItemsNumber = frp.Main.Between(1, 3);
            let Order = [];
            for (let item = 0; item < ItemsNumber; item ++) {
               Order.push(frp.Items.GetRandomByType(6).name);
            }
         
            Food.NewDelivery(Position, Order, 'N / A');
         }
      }

      console.log(frp.Food.Deliveries);
   }
};


frp.Food.prototype.Deliver = function (player) { 

};


frp.Food.prototype.Remove = function () {
   const Index = frp.Food.Deliveries.indexOf(this);
   frp.Food.Deliveries.splice(Index, 1);
};


(async () => { 
   setInterval(() => { frp.Food.Check(); }, 30000);
})();