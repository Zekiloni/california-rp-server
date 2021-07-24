'use strict';

import { Items } from "../Items/Items";
import Business from "../Models/Business";

export class Deliveries { 

   Business: Business;
   Items: Items[];
   Character: string;
   Contact: string;
   Status: Deliveries.DeliveryStatus


   static Delivery: Deliveries[] = [];

   static Warehouses: any = {

   };

   constructor (Business: Business, PersonName: string, Contact: string, Items: Items[]) { 
      this.Business = Business;
      this.Items = Items;
      this.Character = PersonName;
      this.Contact = Contact;
      this.Status = Deliveries.DeliveryStatus.Ordered;

      Deliveries.Delivery.push(this);
   }


   static Init () { 
      for (const i in Deliveries.Warehouses) { 
         const Warehouse = Deliveries.Warehouses[i];

         console.log(Warehouse);
      }
   };


   New () { 

   }

   static Delete (orderId: number) {
      delete Deliveries.Delivery[orderId];
   }

};

export namespace Deliveries {
   export enum DeliveryStatus { 
      Ordered,
      Accepted,
      Delivered,
   }
}

/*
frp.Deliveries.prototype.Deliver = function (player, place) { 
   if (place instanceof frp.Business) { 
      
   }
}*/

(async () => {
   Deliveries.Init();
})();
 