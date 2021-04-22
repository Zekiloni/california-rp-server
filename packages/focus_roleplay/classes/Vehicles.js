


class Vehicle { 
	constructor(temporary, params) {
		this.temporary = temporary || false;
		this.id = params.id;
		this.model = params.model;
		this.position = params.position;
		this.rotation = params.rotation || 0;
		this.price = params.price;
		this.owner = params.owner || -1;
		this.plate = params.plate || '';
		this.color = params.color || [[0, 0, 0], [0, 0, 0]];
		this.alpha = params.alpha || 255;
		this.fuel = params.fuel || 100;
		this.locked = params.locked || false;
		this.engine = params.engine || false;
		this.dimension = params.dimension || 0;
		this.visible = params.visible || true;
		this.km = params.km || 0;
		this.windows = params.windows || [false, false, false, false];
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
}




mp.events.add({

    'playerEnterVehicle': (player, vehicle, seat) => { 
        let character = player.getCharacter();
        if (vehicle.job && vehicle.job != character.job) return player.removeFromVehicle();
        if (vehicle.faction && vehicle.faction != character.faction) return player.removeFromVehicle();
        if (seat == 0) { player.call('client:player.vehicle', [true, vehicle.engine]); }
        console.log(vehicle.engine);

    },
    
    'playerExitVehicle': (player, vehicle) => { 
        player.call('client:player.vehicle', [false, vehicle.engine])
        console.log(vehicle.engine);
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

mp.vehicles.create = (data) => { 
   let position = data.position;
   let values = { 
       model: data.model,
       locked: data.locked || 0,
       owner: data.owner || -1,
       price: data.price || 0,
       fuel: 100,
   }
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





//setTimeout(() => { mp.vehicles.load(); }, 500);