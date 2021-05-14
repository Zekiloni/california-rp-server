

const Player = mp.players.local;
let browser = null, opened = false, vehicle = null;

mp.events.add({
   'client:vehicle.dealership': (dealership, vehicles) => { 
      opened = !opened;
      opened ? (
         vehicles = JSON.stringify(vehicles), dealership = JSON.stringify(dealership),
         browser = mp.browsers.new('package://vehicles/dealership-interface/dealership.html'),
         browser.execute('dealership.business = ' + dealership),
         browser.execute('dealership.vehicles = ' + vehicles),
         setTimeout(() => { mp.gui.cursor.show(true, true); }, 300)
      ) : (
         browser.destroy(),
         setTimeout(() => { mp.gui.cursor.show(false, false); }, 300)
      )
   },

   'client:vehicle.dealership.preview': (model, position) => {       
      Preview(model, position);
   },
})

function Preview (model, position) { 
   vehicle ? ( vehicle.model = mp.game.joaat(model) ) : (
      vehicle = mp.vehicles.new(mp.game.joaat(model), new mp.Vector3(position.x, position.y, position.z), {
         dimension: Player.dimension, numberPlate: 'Test Vehicle'
      })
   )
}




