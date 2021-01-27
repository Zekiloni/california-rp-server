

module.exports = class VehicleModel { 
   constructor(id, model, locked, owner, price, pos, rgb, rgb2, mods) {
       this.id = id;
       this.model = model;
       this.locked = locked;
       this.owner = owner;
       this.price = price;
       this.position = pos;
       this.color = [rgb, rgb2];
       this.mods = mods;
       allVehicles.push(this);
   }
   
   get id() { return this.id; } 
   set id(x) { this.id = x }

   get model() { return this.locked; } 
   set model(x) { this.model = x }

   get locked() { return this.locked; } 
   set locked(x) { this.locked = x; }

   get owner() { return this.owner; }
   set owner(x) { this.owner = x; }

   get price() { return this.price; }
   set price(x) { this.price = x; }

   get position() { return this.position; }
   set position(x) { this.position = x; }

   get color() { return this.color; };
   set color(x) { this.color = [x.rgb, x.rgb2]; }

   get mods() { return this.mods; }
   set mods(x) { this.mods = x; }

   info () { return this; }
}

