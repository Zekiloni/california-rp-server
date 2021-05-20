


global.reqDeliveries = []
var deliveryID = 0;

const DELIVERY_STATUS = [ 
   REQUESTED = 0,
   ACCEPTED = 1,
   IN_PROGRESS = 2,
   EXPIRED = 3,
   FINISHED = 4
]

var Delivery = function (data) { 
      this.id = deliveryID ++;
      this.bussines = data.bussines || 0;
      this.type = data.type || 0;
      this.status = data.status || REQUESTED;
      this.price = data.price || 25;
      this.quantity = data.quantity || 1;
      this.object = data.object || false;
      reqDeliveries.push(this)
}


var deliveries = { 
   create: (data) => {
     let del = new Delivery(data)
     return del;
   },

   all: () => { 
      return reqDeliveries;
   },

   info: (delivery) => { return delivery; },

   delete: (delivery) => { 
      delete delivery;
      let x = objects.indexOf(delivery)
      objects.splice(x, 1);
   },

   accept: (player, delivery) => { 
      delivery.status = ACCEPTED;
      delivery.courier = player;
   },

   finish: (data) => { 
      delivery.status = FINISHED;
   },

   load: (delivery) => { 
      delivery.status = IN_PROGRESS;
   },

   unload: (delivery) => { 
      console.log('unloaded')
   }
}

// var delivery = (delivery) => { 
//    delivery.info = () => { 
//       return delivery;
//    }
// }


// let del = delivery.new({ bussines: 'Vucko' })
// del.unload();







