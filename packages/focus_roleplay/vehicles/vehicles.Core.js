

class Vehicle { 
    constructor (id, owner, price, fuel, mods ,ebts) { 
        this.id = id;
        this.owner = owner || -1;
        this.price = price || 3500;
        this.fuel = fuel || 100;
        this.mods = mods || 0;
        this.ebts = ebts || 0;
    }
}

mp.vehicles.load = () => { 
    db.query("SELECT * FROM `vehicles`", function(error, results, fields){
        if (error) return core.terminal(1, error);
        if (results.length != 0) {
            results.forEach(veh => {
                let color = JSON.parse(veh.color), position = JSON.parse(veh.position), stats = JSON.parse(veh.ebts)
                let vehicle = mp.vehicles.new();
                vehicle.data = new Vehicle(veh.ID, veh.owner, veh.price, veh.fuel, mods, stats);
            });
        }
        core.terminal(3, `${results.length} vehicles were loaded !`);
    })
}

mp.vehicles.create = (data) => { 
    let position = data.position;
    let values = { 
        model: data.model,
        locked: data.locked || 0,
        owner: data.owner || -1,
        price: data.price || 0,
        fuel: 100,
    }
    console.log(data.color)
    db.query("INSERT INTO `vehicles` ?", [values], function (error, result, fields) {
        if (error) return core.terminal(1, error);
        let vehicle = mp.vehicles.new(mp.jooat(data.model), new mp.Vector3(data.position.x, data.position.y, data.position,z), { 
            heading: data.rotation,
            numberPlate: ' ',

        })
        vehicle.data = new Vehicle(result.ID, data.owner, data.price, 100, 0, 0);
    });
}

mp.vehicles.save = () => { 
    mp.vehicles.forEach( (vehicle) => { 
        vehicle.save();
    })
}
mp.Vehicle.prototype.save = function () { 

}

mp.Vehicle.prototype.tune = function (data) { 
    data.length > 1 ? ( data.forEach(tune => { this.vehicle.setMod(tune.index, tune.value) } )) : ( this.vehicle.setMod(data.index, data.value) )
}

setTimeout(() => { mp.vehicles.load(); }, 500);
