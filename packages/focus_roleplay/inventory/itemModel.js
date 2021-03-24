

class itemModel { 
    constructor(itemID, itemName, itemType, itemHash, itemWeight, itemQuantity, itemEntity, itemOwner, itemDimension, itemPos, itemSpecs, itemObject, itemLabel) {
        this.id = itemID;
        this.name = itemName;
        this.type = itemType || 'Item';
        this.hash = itemHash;
        this.weight = itemWeight || 0.15;
        this.quantity = itemQuantity || 1;
        this.entity = itemEntity || -1;
        this.owner = itemOwner || -1;
        this.dimension = itemDimension || 0;
        this.position = itemPos || 0;
        this.specs = itemSpecs || 0;
        this.object = 0;
        this.label = itemLabel || 0;

        // Z = Z - 0.93 //
        if (itemEntity == -1) {
            let pos = new mp.Vector3(this.position.x, this.position.y, this.position.z);
            this.label = mp.labels.new(`${this.name}~n~~h~${this.quantity}`, pos,
            {
                los: false,
                font: 0,
                drawDistance: 3
            });

            this.object = mp.objects.new(this.hash, pos,
            {
                rotation: new mp.Vector3(-90, 0, 0),
                alpha: 255,
                dimension: this.dimension
            });
        }

       
        mp.items.push(this)
   }

    info () {
        return this;
    }
}

module.exports = itemModel;

