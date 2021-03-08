var VehicleModel = require('./vehicleModel');

mp.vehiclesz = [];

module.exports = {

   create: function (player, id, model, locked, owner, price, pos, rgb, rgb2, mods, ebts) {
      //let spawnPos = new mp.Vector3(pos.x, pos.y, pos.z);
      if(owner == -1){
         let veh = new VehicleModel(id, model, locked, owner, price, pos, 100, rgb, rgb2, mods, ebts);
         console.log(veh.info());
         //let vehicleName = mp.game.vehicle.getDisplayNameFromVehicleModel(model);
         veh = mp.vehicles.new(model, pos,
         {
            numberPlate: 'NP-00-BG',
            alpha: 255,
            color: [[rgb.r, rgb.g, rgb.b], [rgb2.r, rgb2.g, rgb2.b]],
            locked: locked,
            engine: false,
            dimension: 0
         });
         player.outputChatBox(`Stvorili ste jednokratno vozilo. Model: ${veh.model}`);
         player.putIntoVehicle(veh, 0);  
      }
      else{
         if(locked < 0 || locked > 1) return;
         if(price < 0) return;
         let veh = new VehicleModel(id, model, locked, owner, price, pos, rgb, rgb2, mods)
         console.log(veh.info());
         db.query("INSERT INTO `vehicles` (model, locked, owner, price, pos, rgb, rgb2, mods) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [model, locked, owner, price, pos, rgb, rgb2, mods], function (error, results, fields) {
            if (error) return core.terminal(1, error);
            veh.id = results.insertedId;
            player.outputChatBox(`Kupili ste vozilo model ${model}. Cena: ${price}$`);
         });
      }
   },

   update: function (vehicleID, locked, owner, price, pos, rgb, rgb2, mods){
      db.query("UPDATE `vehicles` SET `locked` = ?, `owner` = ?, `price` = ?, `pos` = ?, `rgb` = ?, `rgb` = ?, `mods` = ? WHERE `ID` = ?", [locked, owner, price, pos, rgb, rgb2, mods, vehicleID], function(error, results, fields){
         if(error) return core.terminal(1, error);
      });
   },

   delete: function(vehicleID){
      db.query("DELETE FROM `vehicles` WHERE `ID` = ?", [vehicleID], function(error, results, fields) {
         if(error) return core.terminal(1, error);
      });
   },

   // load: function (vid) { 
   //    var vehRes = mp.vehiclez.find( ({ id }) => id === vid );
   //    let spawnPos = new mp.Vector3(vehRes.position.x, vehRes.position.y, vehRes.position.z)
   //    let vehicle = mp.vehicles.new(vehRes.model, spawnPos,
   //     {
   //         numberPlate: 'NP-00-BG',
   //         alpha: 255,
   //         color: color,
   //         locked: vehRes.locked,
   //         engine: false,
   //         dimension: 0
   //     });

   //     vehicle.id = vehRes.id;
   // },

   loadAll: function(){
      db.query("SELECT * FROM `vehicles`", function(error, results, fields) {
         if(error) return core.terminal(1, error);
         results.forEach(vehRes => {
            let color = JSON.parse(vehRes.color);
            let position = JSON.parse(vehRes.position)
            let ebts = JSON.parse(vehRes.ebts)
            let veh = new VehicleModel(vehRes.ID, vehRes.model, vehRes.locked, vehRes.owner, vehRes.price, position, color.rgb, color.rgb2, vehRes.mods, ebts);
         });
      });
   }
}

mp.events.add('server:onVehicleDamage', (player, vehicle, boneIndex, damage) => {
   console.log(`[server:onVehicleDamage] Vehicle: ${vehicle.id} Bone index: ${boneIndex} | Damage: ${damage}`)
 })