

module.exports = class BussinesModel { 
    constructor(id, name, type, owner, price, pos) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.owner = owner;
        this.price = price;
        this.label = [];
        this.entrance = pos;
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
