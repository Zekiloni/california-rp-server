


const DeliveryType = { 
   Box: 0, Cargo: 1, Container: 2
};

const DeliveryEntity =  {
   Player: 0, Vehicle: 1
}


let Start = 0;

frp.Deliveries = class Deliveries { 

   static Delivery = {};

   static Warehouses = [

   ]

   constructor (name, type, ) { 
      this.id = Start ++;

      Deliveries.Delivery[this.id] = this;
   }


   static New () { 

   }

};


frp.Deliveries.prototype.Delete = function () { 
   delete frp.Deliveries.Delivery[this.id];
};


frp.Deliveries.prototype.Deliver = function (player, place) { 
   if (place instanceof frp.Business) { 
      
   }
}
 