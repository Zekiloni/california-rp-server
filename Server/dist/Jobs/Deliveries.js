'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deliveries = void 0;
class Deliveries {
    constructor(Business, PersonName, Contact, Items) {
        this.Business = Business;
        this.Items = Items;
        this.Character = PersonName;
        this.Contact = Contact;
        this.Status = Deliveries.DeliveryStatus.Ordered;
        Deliveries.Delivery.push(this);
    }
    static Init() {
        for (const i in Deliveries.Warehouses) {
            const Warehouse = Deliveries.Warehouses[i];
            console.log(Warehouse);
        }
    }
    ;
    New() {
    }
    static Delete(orderId) {
        delete Deliveries.Delivery[orderId];
    }
}
exports.Deliveries = Deliveries;
Deliveries.Delivery = [];
Deliveries.Warehouses = {};
;
(function (Deliveries) {
    let DeliveryStatus;
    (function (DeliveryStatus) {
        DeliveryStatus[DeliveryStatus["Ordered"] = 0] = "Ordered";
        DeliveryStatus[DeliveryStatus["Accepted"] = 1] = "Accepted";
        DeliveryStatus[DeliveryStatus["Delivered"] = 2] = "Delivered";
    })(DeliveryStatus = Deliveries.DeliveryStatus || (Deliveries.DeliveryStatus = {}));
})(Deliveries = exports.Deliveries || (exports.Deliveries = {}));
/*
frp.Deliveries.prototype.Deliver = function (player, place) {
   if (place instanceof frp.Business) {
      
   }
}*/
(async () => {
    Deliveries.Init();
})();
