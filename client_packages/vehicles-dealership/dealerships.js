

const player = mp.players.local;
var dealershipCEF, dealerCam, lastPos, testVeh;

mp.events.add({

   'client:showVehicleDealership': (vehicles) => {
      var vehicleMenu = JSON.stringify(vehicles)
      lastPos = player.pisition;
      dealershipCEF = mp.browsers.new('package://vehicles-dealership/veh-dealer-interface/vehicle.html');
      dealershipCEF.execute(`vehicleList(${vehicleMenu});`); 
      setTimeout(() => { mp.gui.cursor.show(true, true); }, 300);
      mp.events.call('client:enableDealerCam', vehicles[0].model);
   },

   'client:closeVehicleDealership': () => {
      dealershipCEF.destroy();
      setTimeout(() => { mp.gui.cursor.show(false, false); }, 300);
      mp.events.call('client:disableDealerCam');
   },

   'client:vehicleColorPreview': (index, color) => { 
      let curColor = vehicle.color;
      if (index)
   },

   'client:vehiclePreview': (model) => { 
      let veh = mp.game.joaat(model);
      testVeh.model = veh;
   },

   'client:enableDealerCam': (model) => {
      dealerCam = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
      let vehPos = new mp.Vector3(228.49, -991.12, -98.93);
      let veh = mp.game.joaat(model);
      player.position = new mp.Vector3(vehPos.x + 4.1, vehPos.y, vehPos.z);
      testVeh = mp.vehicles.new(veh, vehPos, { numberPlate: 'Test', alpha: 255, engine: false, dimension: player.dimension });
      player.setIntoVehicle(testVeh.handle, 0)
      mp.players.local.freezePosition(true);
      dealerCam.setActive(true);
      dealerCam.setCoord(228.43, -978, -97.84);
      dealerCam.pointAtCoord(228.49, -991.12, -98.93);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);
    },
  
    'client:disableDealerCam': () => {
      dealerCam.destroy();
      player.position = lastPos;
      mp.game.cam.renderScriptCams(false, false, 0, false, false);
      mp.players.local.freezePosition(false);
      mp.game.graphics.transitionFromBlurred(1000);
    }


});
