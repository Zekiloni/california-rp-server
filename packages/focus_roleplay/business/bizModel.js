

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
        // var typesArray = business.type();
        // var r = typesArray.find( ({ type }) => type === this.type );
        let blipNumber = 33;

        this.label = mp.labels.new(labelText, new mp.Vector3(this.entrance.x, this.entrance.y, this.entrance.z), { los: true, font: 0, drawDistance: 4, });
        this.blip = mp.blips.new(blipNumber, new mp.Vector3(this.entrance.x, this.entrance.y, 0), { name: this.name, color: 4, shortRange: true, });
        this.marker = mp.markers.new(1, new mp.Vector3(this.entrance.x, this.entrance.y - 0.99), 1.1,
        { direction: new mp.Vector3(90, 0, 0), rotation: new mp.Vector3(0, 0, 90), color: [SERVER_COLOR.R, SERVER_COLOR.G, SERVER_COLOR.B, 150], visible: true, dimension: this.dimension });

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


mp.business = [];

const BUSINESS_TYPES = [ 
    BIZ_TYPE_MARKET = { type: 0, interior: 11, blip: 52, name: "24/7 Market" },
    BIZ_TYPE_CLOTHING = { type: 1, interior: 22, blip: 366, name: "Clothing Store" },
    BIZ_TYPE_CAFE =  { type: 2, interior: 33, blip: 93, name: "Cafe Bar" },
    BIZ_TYPE_GAS = { type: 3, interior: 44, blip: 361, name: "Gas Station" },
]

function Business (data) { 
    this.id = data.id;
    this.name = data.name || BUSINESS_TYPES[this.type].name;
    this.type = data.type || 0;
    this.owner = data.owner || -1;
    this.price = data.price || 18000;
    this.entrance = data.entrance;
    this.interior = data.interior;
    this.interiorDimension = data.interiorDimension;
    this.dimension = data.dimension || 0; 
    this.products = data.products || 60;
    this.locked = data.locked || false;

    this.label = mp.labels.new(``, new mp.Vector3(this.entrance.x, this.entrance.y, this.entrance.z), { los: true, font: 0, drawDistance: 4, });
    this.blip = mp.blips.new(BUSINESS_TYPES[this.type].blip, new mp.Vector3(this.entrance.x, this.entrance.y, 0), { name: this.name, color: 4, shortRange: true, });
    this.marker = mp.markers.new(1, new mp.Vector3(this.entrance.x, this.entrance.y - 0.99), 1.1,
    { direction: new mp.Vector3(90, 0, 0), rotation: new mp.Vector3(0, 0, 90), color: [SERVER_COLOR.R, SERVER_COLOR.G, SERVER_COLOR.B, 150], visible: true, dimension: this.dimension });

    mp.business.push(this)

    this.info = () => { return this; }

    this.typeInfo = () => { return BUSINESS_TYPES[this.type]; }

    this.delete = () => { 
        this.label.destroy();
        this.blip.destroy();
        this.marker.destroy();
        let x = mp.business.indexOf(this);
        mp.business.splice(x, 1)
    }

    this.refresh = () => { 
        this.owner == -1 ? 
            ( this.label.text = `~r~Biznis na Prodaju !~n~~s~${this.name}~n~ ~g~${this.price} $`, this.blip.color = 52 ) : ( this.label.text = `${this.name}`, this.blip.color = 49 );
    }

    this.lock = () => { 
        this.lock = !this.lock;
    }
}

var business = { 
    load: async () => { 

    },

    create: (player, data) => { 
        let biz = new Business(data)
    },

    delete: (player, business) => { 
        business.delete();
    },

    update: (player, business) => { 
        business.refresh();
    },

    near: (player) => { 
        let result = null;
        mp.business.forEach(biz => {
            player.dist(biz.marker.position) < 2.5 ? ( result = biz ) : ( result = false )
        });
        return result;
    },

    buy: (player, business) => { 

    }
}

