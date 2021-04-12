

let Vehicle = require('./Vehicle')

mp.events.add({
    'server:vehicle.indicators': (player, indicator) => {
        let vehicle = player.vehicle;
        if (vehicle && player.seat == 0) {
            switch (indicator) {
                case 0: vehicle.data.IndicatorRight = !vehicle.data.IndicatorRight; break; // right
                case 1: vehicle.data.IndicatorLeft = !vehicle.data.IndicatorLeft; break; // left
            }
        }
    },

    'playerEnterVehicle': (player, vehicle, seat) => { 
        if (seat == 0) { player.call('client:vehicle.hud', [true]); }
        if (vehicle.job) { if (vehicle.job != player.job) return player.removeFromVehicle(); }
    },
    
    'playerExitVehicle': (player, vehicle) => { 
        player.call('client:vehicle.hud', [false])
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



//setTimeout(() => { mp.vehicles.load(); }, 500);