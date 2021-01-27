

module.exports = class BussinesModel { 
    constructor(id, name, type, owner, price, pos, int, dimension, products) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.owner = owner;
        this.price = price;
        this.label = [];
        this.entrance = pos;
        this.interior = int;
        this.dimension = dimension || id;
        this.products = products || 60;
        allBussineses.push(this);
    }
    
    setLabel (label) {
        this.label = label;
    }

    info () {
        console.log(this)
        return this;
    }
}

