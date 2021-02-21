

module.exports = class BussinesModel { 
    constructor(id, name, type, owner, price, pos, int, dimension, products) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.owner = owner;
        this.price = price;
        this.entrance = pos;
        this.interior = int;
        this.dimension = dimension || id; 
        this.products = products || 60;

        let labelText;
        if (owner == -1) { labelText = `~r~FOR SALE !~s~ ~n~ ${this.name} ~n~ Price ~g~${this.price} $`; }
        else { labelText = `${this.name} Opened !`; }
        var typesArray = business.type();
        var r = typesArray.find( ({ type }) => type === this.type );
        let blipNumber = r.blip;

        this.label = mp.labels.new(labelText, new mp.Vector3(this.entrance.x, this.entrance.y, this.entrance.z), { los: true, font: 0, drawDistance: 4, });
        this.blip = mp.blips.new(blipNumber, new mp.Vector3(this.entrance.x, this.entrance.y, 0), { name: this.name, color: 4, shortRange: true, });

        mp.business.push(this);
    }
    
    updateBiz () { 
        let string, blipC;
        if (this.owner == -1) { string = `~r~FOR SALE !~s~ ~n~ ${this.name} ~n~ Price ~g~${this.price} $`;  }  
        else { string = `${this.name} Opened !`; }
        this.label.text = string;
    }

    info () {
        console.log(this)
        return this;
    }
}

