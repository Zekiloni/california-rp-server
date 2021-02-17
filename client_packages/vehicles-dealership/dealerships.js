

const player = mp.players.local;
var dealershipCEF, dealerCam, lastPos, testVeh;

mp.events.add({

   'client:showVehicleDealership': (vehicles) => {
      var vehicleMenu = JSON.stringify(vehicles)
      lastPos = player.pisition;
      mp.gui.chat.activate(false);
      dealershipCEF = mp.browsers.new('package://vehicles-dealership/veh-dealer-interface/vehicle.html');
      dealershipCEF.execute(`vehicleList(${vehicleMenu});`); 
      setTimeout(() => { mp.gui.cursor.show(true, true); }, 300);
      mp.events.call('client:enableDealerCam', vehicles[0].model);
   },

   'client:closeVehicleDealership': () => {
      dealershipCEF.destroy();
      testVeh.destroy();
      mp.gui.chat.activate(true);
      setTimeout(() => { mp.gui.cursor.show(false, false); }, 300);
      mp.events.call('client:disableDealerCam');
   },

   'client:enableDealerCam': (model) => {
      dealerCam = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
      let vehPos = new mp.Vector3(228.49, -991.12, -98.93);
      let veh = mp.game.joaat(model);
      player.position = new mp.Vector3(vehPos.x + 4.1, vehPos.y, vehPos.z);
      testVeh = mp.vehicles.new(veh, vehPos, { numberPlate: 'Test', alpha: 255, engine: false, heading: 90, dimension: player.dimension });
      player.setIntoVehicle(testVeh.handle, 0)
      mp.players.local.freezePosition(true);
      dealerCam.setActive(true);
      dealerCam.setCoord(228.43, -978, -97.84);
      dealerCam.pointAtCoord(228.49, -991.12, -98.93);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);
    },

    'client:vehicleColorPreview': (index, color) => { 
      let colorRGB = hexToRgb(color);
      if (index == 1) { 
         testVeh.setCustomPrimaryColour(colorRGB.r, colorRGB.g, colorRGB.b);
      } else if (index == 2) { 
         testVeh.setCustomSecondaryColour(colorRGB.r, colorRGB.g, colorRGB.b);
      }
   },

   'client:vehiclePreview': (model) => { 
      let veh = mp.game.joaat(model);
      testVeh.model = veh;
   },
  
   'client:disableDealerCam': () => {
      dealerCam.destroy();
      player.position = lastPos;
      mp.game.cam.renderScriptCams(false, false, 0, false, false);
      mp.players.local.freezePosition(false);
      mp.game.graphics.transitionFromBlurred(1000);
    }

});


hexToRgb = (hex) => {
   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
   return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
   } : null;
}