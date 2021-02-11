

const player = mp.players.local;
var dealershipCEF, dealerCam;

mp.events.add({

   'client:showVehicleDealership': (vehicles) => {
      var vehicleMenu = JSON.stringify(vehicles)
      dealershipCEF = mp.browsers.new('package://vehicles-dealership/veh-dealer-interface/vehicle.html');
      dealershipCEF.execute(`vehicleList(${vehicleMenu});`); 
      setTimeout(() => { mp.gui.cursor.show(true, true); }, 300);

      mp.players.local.freezePosition(true);
      mp.events.call('client:enableDealer');
   },

   'client:closeVehicleDealership': () => {
      dealershipCEF.destroy();
      setTimeout(() => { mp.gui.cursor.show(false, false); }, 300);
   },

   'client:vehicleColorPreview': (index, color) => { 
      
   },

   'client:enableDealerCam': () => {
      dealerCam = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
      mp.players.local.position = new mp.Vector3(-2172.62, -1027.5, 20.66);
      dealerCam.setActive(true);
      dealerCam.setCoord(-2175.62, -1030.5, 20.66);
      dealerCam.pointAtCoord(-2134.11, -1024.2, 20.66);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);
    },
  
    'client:disableDealerCam': () => {
      dealerCam.destroy();
      mp.game.cam.renderScriptCams(false, false, 0, false, false);
      mp.players.local.freezePosition(false);
      mp.game.graphics.transitionFromBlurred(1000);
    }


});
