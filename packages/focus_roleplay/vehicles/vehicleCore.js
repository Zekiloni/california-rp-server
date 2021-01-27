var VehicleModel = require('./vehicleModel');

global.allVehicles = [];

module.exports = {

   create: function (player, id, model, locked, owner, price, pos, rgb, rgb2, mods) {
      let veh = new VehicleModel(id, model, locked, owner, price, pos, rgb, rgb2, mods)
      console.log(veh.info());
   }

}