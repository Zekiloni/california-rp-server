


mp.items = {};

class Item { 
   constructor (id, data) { 
      this.id = id;
      this.item = data.item;
      this.info = mp.itemList[this.item];
      this.entity = data.entity || -1;
      this.owner = data.owner || -1;
      this.quantity = data.quantity;
      this.position = data.position;
      this.dimension = data.dimension || 0;
      this.object = data.object || null;
      this.extra = data.extra || null;

      if (this.entity == -1) { 
         let pos = JSON.parse(this.position);
         this.object = mp.objects.new(this.info.hash, new mp.Vector3(pos.x, pos.y, pos.z - 0.93),
         {
            rotation: new mp.Vector3(-90, 0, 0),
            alpha: 255,
            dimension: this.dimension
         });
         
      }

      mp.items[this.id] = this;
   }

   delete () { 
      this.object.destroy();
      this.object = null;
      delete mp.items[this.id];
   }
}

module.exports = Item;