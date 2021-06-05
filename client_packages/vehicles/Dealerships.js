

const Player = mp.players.local;
let browser = null, opened = false, Vehicle = null, camera = null;

const Position = new mp.Vector3(-1040.0471, -2734.6975, 20.066418);

mp.events.add({
   'client:vehicle.dealership': (vehicles) => { 
      opened = !opened;
      if (opened) { 
         Preview(vehicles[0].model)
         browser = mp.browsers.new('package://vehicles/dealership-interface/dealership.html');
         browser.execute('dealership.vehicles = ' + JSON.stringify(vehicles));
         Player.BrowserControls(true, true);
      } else { 
         if (browser) browser.destroy();
         Vehicle.destroy();
         Player.BrowserControls(false, false);
      }
   },

   'client:vehicle.dealership.preview': Preview,
})



function Preview (modelVeh) { 
   mp.gui.chat.push('Model is ' + modelVeh);

   let Hash = mp.game.joaat(modelVeh);

   if (mp.vehicles.exists(Vehicle)) { 
      Vehicle.model = Hash;
      mp.gui.chat.push('New model is ' + Vehicle.model);
      mp.gui.chat.push('Hash is ' + Hash);
   } else { 
      Player.position = new mp.Vector3(Position.x + 24.1, Position.y +5, Position.z)

      camera = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
      Vehicle = mp.vehicles.new(Hash, Position, { numberPlate: 'Dealership', alpha: 255, engine: false, heading: 90, dimension: Player.dimension });
      mp.players.local.freezePosition(true);
      camera.setActive(true);
      camera.setCoord(Position.x + 3, Position.y + 3, Position.z);
      camera.pointAtCoord(Position.x, Position.y, Position.z);
      mp.game.cam.renderScriptCams(true, false, 0, true, false);
   }
   mp.gui.chat.push(JSON.stringify(Vehicle))
   
}


