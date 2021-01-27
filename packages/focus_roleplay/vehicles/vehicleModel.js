

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

   info () { return this; }
}

