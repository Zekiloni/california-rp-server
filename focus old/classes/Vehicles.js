

mp.vehs = {};

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
		this.mileage = params.mileage || 0;
		this.dirt = params.dirt || 0; 
        this.impounded = params.impounded || 0;
        this.tuning = params.tuning || 0;
        this.insurance = params.insurance || 0;
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

        this.vehicle = null;

        mp.vehs[this.id] = this;
	}

    Spawn () {
        let pos = new mp.Vector3(this.position.x, this.position.y, this.position.z);
        this.vehicle = mp.vehicles.new(mp.joaat(this.model), pos,
        {
            numberPlate: this.plate || '0000',
            engine: false,
            dimenson: this.dimenson,
            locked: this.locked,
            alpha: 255,
        });

        this.vehicle.uid = this.id;
        this.paint(this.vehicle, this.color);
    }

    paint (vehicle, color) {
        this.color = color;
        vehicle.setColorRGB(parseInt(color[0][0]), parseInt(color[0][1]), parseInt(color[0][2]), parseInt(color[1][0]), parseInt(color[1][1]), parseInt(color[1][2]));
    }

    Fuel (vehicle, value) { 
        this.fuel = value;
        vehicle.setVariable('Fuel', this.fuel);
    }

    Mileage (vehicle, value) { 
        this.mileage = value;
        vehicle.setVariable('Mileage', this.mileage);
    }

    Dirt (vehicle, value) { 
		this.dirt = value;
		vehicle.setVariable('Dirt', this.dirt)
	}

    Window (vehicle, index) { 
		this.windows[index] != this.windows[index];
		vehicle.setVariable('Windows', this.windows)
	}

   tune (vehicle, components) { 
        components.forEach(component => { vehicle.setMod(component.index, component.value) })
   }  

    update () { 
      let values = { 
         model: this.model, position: JSON.stringify(this.vehicle.position), rotation: JSON.stringify(this.vehicle.rotation),
         price: this.price, owner: this.owner, business: this.business, plate: this.plate, color: JSON.stringify(this.color),
         alpha: this.alpha, fuel: this.fuel, locked: this.locked, dimension: this.dimension, spawned: this.spawned,
         km: this.km, dirt: this.dirt, impounded: this.impounded, tuning: JSON.stringify(this.tuning),
         upgrades: JSON.stringify(this.upgrades)                          
      }

      db.query("UPDATE `vehicles` SET ? WHERE `id` = ?", [values, this.id], function (error, results, fields) {
         if (error) return core.terminal(1, `Saving Vehicle ${error}`);
      });
   }
}


class Vehicles { 
    constructor () { 
        mp.events.add({

            'playerEnterVehicle': (player, vehicle, seat) => { 
                let character = player.getCharacter(), veh = mp.vehs[vehicle.uid];
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
                        case 0: vehicle.setVariable('IndicatorRight', !vehicle.getVariable('IndicatorRight')); break;
                        case 1: vehicle.setVariable('IndicatorLeft', !vehicle.getVariable('IndicatorLeft')); break;
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
                player.vehicle.setVariable('Kilometer', kmS);
            }
        })
    }


    load () { 
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

    create (model, temporary = false, data) {       
        let veh = new Vehicle(temporary, { 
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

    delete (vehicle) {
        if (vehicle.temporary) {
            vehicle.destroy();
            delete mp.vehicles[vehicle.id];
        }  
        else {
            vehicle.destroy();
            db.query("DELETE * FROM `vehicles` WHERE `id` = ?", [vehicle.id], function (error, results, fields) {
                if (error) return core.terminal(1, 'Vehicle deleting ' + error);
                delete mp.vehicles[vehicle.id];
          });
        }  
    }

    buy (player, vehicle) { 
        let vehToBuy = mp.vehicles[vehicle.uid];
        let character = player.getCharacter();

        if (vehToBuy.owner == -1) {
            if (character.money >= vehToBuy.price) {
                character.giveMoney(player, -vehToBuy.price);
                vehToBuy.owner = character.id;
                this.update(vehToBuy);
                player.notification(MSG_CAR_BOUGHT, NOTIFY_SUCCESS, 4);
            }
            else  { player.notification(MSG_NOT_ENOUGH_MONEY, NOTIFY_ERROR, 4); }
        }
        else { player.notification(MSG_CAR_ALREADY_OWNED, NOTIFY_ERROR, 4); }
    }

    sell (player, veh, target = -1, price = 0) { 
        let vehToSell = mp.vehicles[veh.uid];
        let seller = player.getCharacter();
        if (target != -1) {
            let buyer = target.getCharacter();
            if (price > 0) {
                if (buyer.money >= price) {
                    vehToSell.owner = buyer.id;
                    this.update(vehToSell);
                } 
                else { target.notification(MSG_NOT_ENOUGH_MONEY, NOTIFY_ERROR, 4); }
            } 
            else { player.notification(MSG_INVALID_SELL_PRICE, NOTIFY_ERROR, 4); }        
        } 
        else {
            if (seller.id == vehToSell.owner) {
                seller.giveMoney(player, vehToSell.price/2);
                player.notification(MSG_CAR_SOLD, NOTIFY_SUCCESS, 4);
                this.delete(vehId);
            }
            else { player.notification(MSG_NOT_CAR_OWNER, NOTIFY_ERROR, 4); }
        }
    }

    // OVO JOŠ VIDETI
    park (player, veh, garageId = -1) {
        let vehToPark = mp.vehicles[veh.uid];
        let character = player.getCharacter();
        if (vehToPark.owner == character.id) {
            if (garageId == -1) {
                vehToPark.position = player.position;
                player.notification(MSG_CAR_PARKED, NOTIFY_SUCCESS, 4);
            }
        }
    }

}


mp.vehs = new Vehicles();
mp.vehs.load();

 mp.vehicles.sell = (player, vehId) => {
     let vehToSell = mp.vehicles[vehId];
     let character = player.getCharacter();
     if (character.id == vehToSell.owner) {
         character.giveMoney(player, vehToSell.price/2);
         player.notification(MSG_CAR_SOLD, NOTIFY_SUCCESS, 4);
         this.delete(vehId);
     }
     else { player.notification(MSG_NOT_CAR_OWNER, NOTIFY_ERROR, 4); }
 }


// mp.vehicles.sellTo = (player, target, price, vehId) => {
//     let vehToSell = mp.vehicles[vehId];
//     let seller = player.getCharacter();
//     let buyer = target.getCharacter();

//     if (character.id == vehToSell.owner) {
//         seller.giveMoney(player, price);
//         buyer.giveMoney(player, -price);
//         seller.notification(MSG_CAR_SOLD, NOTIFY_SUCCESS, 4);
//         buyer.notification(MSG_CAR_BOUGHT, NOTIFY_SUCCESS, 4);
//         this.delete(vehId);
//     }
//     else { seller.notification(MSG_NOT_CAR_OWNER, NOTIFY_ERROR, 4); }
// }

// mp.vehicles.park = (player, vehId, garageId = -1) => {
//     let vehToPark = mp.vehicles[vehId];
//     if (garageId == -1) {
//         vehToPark.position = player.position;
//     }
// }

// mp.vehicles.adminSell = (vehId) => {
//     this.delete(vehId);
// }



//setTimeout(() => { mp.vehicles.load(); }, 500);