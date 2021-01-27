

module.exports = class VehicleModel { 
   constructor(id, model, locked, owner, price, pos, fuel, rgb, rgb2, mods, engine, brakes, transmission, suspension) {
       this.id = id;
       this.model = model;
       this.locked = locked || true;
       this.owner = owner || -1;
       this.price = price;
       this.position = pos;
       this.fuel = fuel;
       this.color = [rgb, rgb2];
       this.mods = mods;
       this.engine = engine || -1;
       this.brakes = brakes || -1;
       this.transmission = transmission || -1;
       this.suspension = suspension || -1;
       allVehicles.push(this);
   }
   
   // get id() { return this.id; } 
   // set id(x) { this.id = x; }

   // get model() { return this.locked; } 
   // set model(x) { this.model = x; }

   // get locked() { return this.locked; } 
   // set locked(x) { this.locked = x; }

   // get owner() { return this.owner; }
   // set owner(x) { this.owner = x; }

   // get price() { return this.price; }
   // set price(x) { this.price = x; }

   // get position() { return this.position; }
   // set position(x) { this.position = x; }

   // get fuel() { return this.fuel; }
   // set fuel(x) { this.fuel = x; }

   // get color() { return this.color; };
   // set color(x) { this.color = [x.rgb, x.rgb2]; }

   // get mods() { return this.mods; }
   // set mods(x) { this.mods = x; }

   // get transmission() { return this.transmission; }
   // set transmission(x) { this.transmission = x; }

   // get engine() { return this.engine; }
   // set engine(x) { this.engine = x; }

   // get brakes() { return this.brakes; }
   // set brakes(x) { this.brakes = x; }

   info () { return this; }
}

