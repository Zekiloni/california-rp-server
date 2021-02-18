

const player = mp.players.local;
var dealershipCEF, dealerCam, lastPos, testVeh, dealerCamFov = 40;
let vehicleDoors = [{0: false}, {1: false}, {2: false}, {3: false}, {4: false}, { 5: false }]

mp.events.add({

   'client:showVehicleDealership': (vehicles) => {
      var vehicleMenu = JSON.stringify(vehicles)
      lastPos = player.position;
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


// CAMERA ZOOM
mp.keys.bind(0x26, true, function() {
   if (dealershipCEF.active) { 
      dealerCamFov ++;
      if (dealerCamFov >= 50) { dealerCamFov = 20; }
      dealerCam.setFov(dealerCamFov);
   }
});

mp.keys.bind(0x28, true, function() {
   if (dealershipCEF.active) { 
      dealerCamFov --;
      if (dealerCamFov <= 20) { dealerCamFov = 40; }
      dealerCam.setFov(dealerCamFov);
   }
});


// VEHICLE ROTATION 
mp.keys.bind(0x27, true, function() {
   if (dealershipCEF.active) { 
      let heading = testVeh.getHeading();;
      testVeh.setHeading(heading - 15);
   }
});

mp.keys.bind(0x25, true, function() {
   if (dealershipCEF.active) { 
      let heading = testVeh.getHeading();;
      testVeh.setHeading(heading + 15);
   }
});


// vehicle controls // 0x60 = 0 // 0x61 = 1 // 0x62 = 2 // 0x63 = 3 // 0x64 = 4 // 0x65 = 5 // 0x66 = 6 // 0x67 = 7

mp.keys.bind(0x60, true, function() { 
   if (dealershipCEF.active) {  vehicleTestDoors(0) }
});

mp.keys.bind(0x61, true, function() { 
   if (dealershipCEF.active) {  vehicleTestDoors(1) }
});

mp.keys.bind(0x62, true, function() { 
   if (dealershipCEF.active) {  vehicleTestDoors(2) }
});

mp.keys.bind(0x63, true, function() { 
   if (dealershipCEF.active) { vehicleTestDoors(3) }
});

mp.keys.bind(0x64, true, function() { 
   if (dealershipCEF.active) { vehicleTestDoors(4) }
});

mp.keys.bind(0x65, true, function() { // trunk control
   if (dealershipCEF.active) {  vehicleTestDoors(5) }
});


vehicleTestDoors = (doorIndex) => { 
   vehicleDoors[doorIndex] = !vehicleDoors[doorIndex];
   vehicleDoors[doorIndex] ? testVeh.setDoorOpen(doorIndex, false, false) : testVeh.setDoorShut(doorIndex, false);
}

hexToRgb = (hex) => {
   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
   return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
   } : null;
}