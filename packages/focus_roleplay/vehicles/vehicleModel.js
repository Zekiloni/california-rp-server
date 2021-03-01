const db = require("../core/database");

mp.vehiclez = [];

function Vehicle (data) {
    this.id = data.id;
    this.model = data.model || 'elegy';
    this.locked = data.locked || true;
    this.owner = data.owner || -1;
    this.price = data.price;
    this.position = data.position;
    this.rotation = data.rotation;
    this.dimension = data.dimension || 0;
    this.numberPlate = data.numberPlate || 'none';
    this.fuel = data.fuel || 100;
    this.color = [[data.color], [data.color2]];
    this.mods = data.mods;
    this.ebts = data.ebts;

    mp.vehiclez.push(this)

    this.info = () => { return this; }

    this.spawn = () => { 
        this.vehicle = mp.vehicles.new(this.model, new mp.Vector3(this.position.x, this.position.y, this.pozition.z),
        { 
            numberPlate: this.numberPlate, alpha: 255, color: [this.color[0], this.color[1]], 
            locked: this.locked, engine: false, dimension: this.dimension 
        });
    }

    this.delete = () => { 
        this.vehicle.destroy();
        let x = mp.vehiclez.indexOf(this);
        mp.vehiclez.splice(x, 1)
    }

    this.tune = (data) => { 
        data.length > 1 ? ( data.forEach(tune => { this.vehicle.setMod(tune.index, tune.value) } )) : ( this.vehicle.setMod(data.index, data.value) )
    }
}

var vehicles = {

    load: async () => { 
        db.query("SELECT * FROM `vehicles`", function(error, results, fields){
            if (error) return core.terminal(1, error);
            if (results.length != 0) {
                results.forEach(vehRes => {
                    let color = JSON.parse(vehRes.color);
                    let position = JSON.parse(vehRes.position)
                    let ebts = JSON.parse(vehRes.ebts)
                    let veh = new Vehicle(vehRes.ID, vehRes.model, vehRes.locked, vehRes.owner, vehRes.price, position, color.rgb, color.rgb2, vehRes.mods, ebts);
                });
            }
            core.terminal(3, `${results.length} vehicles were loaded !`);
         });
    },

    create: (player, data) => { 
        let veh = new Vehicle({
            id: results.id,
            model: data.model,
            locked: data.locked,
            price: data.price,
            position: data.position,
        })
    }
}

module.exports = vehicles;

vehicles.load()

