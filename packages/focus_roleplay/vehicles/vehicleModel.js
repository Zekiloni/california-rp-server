

module.exports = class VehicleModel { 
   constructor(id, model, locked, owner, price, pos, fuel, rgb, rgb2, mods, ebts) {
       this.id = id;
       this.model = model;
       this.locked = locked || true;
       this.owner = owner || -1;
       this.price = price;
       this.position = pos;
       this.fuel = fuel;
       this.color = [rgb, rgb2];
       this.mods = mods;
       this.ebts = ebts;
       
       allVehicles.push(this);
   }

   info () { return this; }
}


