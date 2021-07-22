"use strict";
var _a;
const DeliveryType = {
    Box: 0, Cargo: 1, Container: 2
};
const DeliveryStatus = {
    Ordered: 0,
    Accepted: 1,
    Delivered: 2
};
frp.Deliveries = (_a = class Deliveries {
        constructor(business, PersonName, Contat, Items) {
            this.Business = {
                id: business.id,
                Name: business.name
            };
            this.Items = Items;
            this.Character = PersonName;
            this.Contact = Contact;
            this.Status = DeliveryStatus.Ordered;
            Deliveries.Delivery.push(this);
        }
        static Init() {
            for (const i in Deliveries.Warehouses) {
                const Warehouse = Deliveries.Warehouses[i];
                console.log(Warehouse);
            }
        }
        ;
        static New() {
        }
    },
    _a.Delivery = [],
    _a.Warehouses = {},
    _a);
frp.Deliveries.prototype.Delete = function () {
    delete frp.Deliveries.Delivery[this.id];
};
frp.Deliveries.prototype.Deliver = function (player, place) {
    if (place instanceof frp.Business) {
    }
}(async () => {
    frp.Deliveries.Init();
})();
