


mp.inventory = {};

class Item { 
   constructor (data) { 
      this.id = data.id;
      this.name = data.name;
      this.hash = data.hash;
      this.type = data.type;
      this.entity = data.entity || -1;
      this.owner = data.owner || -1;
      this.quantity = data.quantity;
      this.position = data.position;
      this.dimension = data.dimension || 0;
      this.object = data.object || null;
      this.extra = data.extra;

      if (this.entity == -1) { 
         this.object = mp.objects.new(this.hash, new mp.Vector3(JSON.parse(this.position)),
         {
            rotation: new mp.Vector3(-90, 0, 0),
            alpha: 255,
            dimension: this.dimension
         });
      }

      mp.items[this.id] = this;
   }
}

module.exports = Item;