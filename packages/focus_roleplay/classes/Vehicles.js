


class Vehicle { 
	constructor(temporary, params) {
		this.temporary = temporary || false;
		this.id = params.id;
		this.model = params.model;
		this.position = params.position;
		this.rotation = params.rotation || 0;
		this.price = params.price;
		this.owner = params.owner || -1;
        this.business = params.business || 0;
		this.plate = params.plate || '';
		this.color = params.color || [[0, 0, 0], [0, 0, 0]];
		this.alpha = params.alpha || 255;
		this.fuel = params.fuel || 100;
		this.locked = params.locked || false;
		this.engine = params.engine || false;
		this.dimension = params.dimension || 0;
		this.spawned = params.spawned || false;
		this.km = params.km || 0;
		this.dirt = params.dirt || 0; 
        this.impounded = params.impounded || 0;
        this.tuning = params.tuning || 0;
        this.upgrades = { 
            engine: params.upgrades.engine || 0,
            brakes: params.upgrades.brakes || 0,
            transmission: params.upgrades.transmission || 0,
            suspension: params.upgrades.suspension || 0,
            turbo: params.upgrades.turbo || 0,
            armour: params.upgrades.armour || 0,
            xenon: params.upgrades.xenon || 0,
            window_tint: params.upgrades.window_tint || 0,
            horn: params.upgrades.horn || 0
        }

		this.windows = params.windows || [false, false, false, false];
        this.alarm = false;

		
		if (this.temporary) { 
            this.id = 'temporary vehicle';
            this.job = params.job || 0;
			this.faction = params.faction || 0;
            if (this.faction > 0) { 
                this.callsign = params.callsign || null;
            }
		}
	}

    paint (vehicle, color) {
        this.color = color;
        vehicle.setColorRGB(parseInt(color[0][0]), parseInt(color[0][1]), parseInt(color[0][2]), parseInt(color[1][0]), parseInt(color[1][1]), parseInt(color[1][2]));
    }

	window (vehicle, index) { 
		this.windows[index] != this.windows[index];
		vehicle.setVariable('windows', this.windows)
	}

	setDirt (vehicle, dirt) { 
		this.dirt = dirt;
		vehicle.setVariable('dirt', this.dirt)
	}

    tune (vehicle, components) { 
        components.forEach(component => { vehicle.setMod(component.index, component.value) })
    }

    delete = (id) => { 
        db.query("DELETE * FROM `vehicles` WHERE `id` = ?", [id], function (error, results, fields) {
              if (error) return core.terminal(1, 'Vehicle deleting ' + error);
              delete mp.vehicles[id];
        });
    }

    update (vehicle) { 
        let values = { 
            position: JSON.stringify(vehicle.position),
            rotation: JSON.stringify(vehicle.rotation),
            model: this.model,
            owner: this.owner,
            tuning: JSON.stringify(this.tuning),
            upgrades: JSON.stringify(this.upgrades),
            impounded: this.impounded,
            km: this.km,
            dimension: this.dimension,
            locked: this.locked,
            fuel: this.fuel,
            color: JSON.stringify(this.color),
            plate: this.plate,
        }

        db.query("UPDATE `vehicles` SET ? WHERE id = ?", [values, player.databaseID], function (error, results, fields) {
            if (error) return core.terminal(1, `Saving Vehicle ${error}`);
        });
    }
}


mp.events.add({

    'playerEnterVehicle': (player, vehicle, seat) => { 
        let character = player.getCharacter();
        if (vehicle.info) { 
            if (vehicle.info.job && vehicle.info.job != character.job) return player.removeFromVehicle();
            if (vehicle.info.faction && vehicle.info.faction != character.faction) return player.removeFromVehicle();
        }
        if (seat == 0) { player.call('client:player.vehicle', [true, vehicle.engine]); }
    },
    
    'playerStartExitVehicle': (player) => {
        if (player.vehicle.engine) player.vehicle.engine = true;
    },

    'playerExitVehicle': (player, vehicle) => { 
        player.call('client:player.vehicle', [false, vehicle.engine])
    },

    'server:vehicle.indicators': (player, indicator) => {
        let vehicle = player.vehicle;
        if (vehicle && player.seat == 0) {
            switch (indicator) {
                case 0: vehicle.data.IndicatorRight = !vehicle.data.IndicatorRight; break;
                case 1: vehicle.data.IndicatorLeft = !vehicle.data.IndicatorLeft; break;
            }
        }
    },

    'server:vehicle.mileage': (player, vehicleData) => {
        let distance = 0;
        let speed = vehicleData;
        
        let trip = Math.floor(speed * ((Date.now() - timeNow) / 1000) * 100) / 100;
        distance += parseFloat(trip / 1000);
        timeNow = Date.now();
        let kmS = distance;
        kmS = kmS + player.vehicle.getVariable('Kilometer');
        let data = JSON.stringify({"playerID":player.id,"distance":distance,"state":true,"vehicle":player.vehicle});
        mp.events.call('tank', player, data);
        player.vehicle.setVariable('Kilometer',kmS);
    }
})

mp.vehicles.load = () => { 
   db.query("SELECT * FROM `vehicles`", function(error, results, fields){
       if (error) return core.terminal(1, error);
       if (results.length > 0) {
           results.forEach(veh => {
               let color = JSON.parse(veh.color), position = JSON.parse(veh.position), stats = JSON.parse(veh.ebts)
               let vehicle = mp.vehicles.new();
               vehicle.data = new Vehicle(veh.ID, veh.owner, veh.price, veh.fuel, mods, stats);
           });
       }
       core.terminal(3, `${results.length} vehicles were loaded !`);
   })
}

mp.vehicles.create = (model, temporary = false, data) => { 

    let vehicle = mp.vehicles.new(mp.joaat(model), data.position,
    {
        numberPlate: data.numberplate || 'none',
        engine: false,
        dimenson: data.dimenson,
        locked: data.locked,
        alpha: 255,
    });

    vehicle.info = new Vehicle(temporary, { 
        id: data.id, model: model, km: 0, fuel: 100, plate: vehicle.numberPlate, spawned: true, dimension: vehicle.dimension,
        position: data.position, locked: data.locked, owner: data.owner || 0, price: data.price, upgrades: { } 
    });

    if (data.color) { 
        vehicle.info.paint(vehicle, data.color)
    }

    if (!temporary) { 
        let locked = 0;
        data.locked == true ? locked = 1 : locked = 0;
        db.query("INSERT INTO `vehicles` (model, price, owner, plate, color, position, heading, locked, spawned, dimension, kilometers) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            [vehicle.model, data.price, data.owner || 0, data.numberplate, JSON.stringify(data.color), JSON.stringify(vehicle.position), vehicle.heading, locked, 1, data.dimension, 0], function (error, results, fields) {
            if (error) return core.terminal(1, 'Vehicle Creating Error ' + error);
        });
    }
}

mp.vehicles.delete = (vehId) => {
    this.delete(vehId);
}

mp.vehicles.save = (vehicle) => { 
    this.update(vehicle);
}

mp.vehicles.saveAll = () => { 
    mp.vehicles.forEach((vehicle) => { 
        vehicle.update(vehicle);
    })
}

mp.vehicles.buy = (player, vehId) => {
    let vehToBuy = mp.vehicles[vehId];
    let character = player.getCharacter();

    if (vehToBuy.owner == -1) {
        if (character.money >= vehToBuy.price) {
            character.giveMoney(player, -vehToBuy.price);
            vehToBuy.owner = character.id;
            this.update(vehToBuy);
        }
        else  { player.notification(MSG_NOT_ENOUGH_MONEY, NOTIFY_ERROR, 4); }
    }
    else { player.notification(MSG_CAR_ALREADY_OWNED, NOTIFY_ERROR, 4); }
}



//setTimeout(() => { mp.vehicles.load(); }, 500);