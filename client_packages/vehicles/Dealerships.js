

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
   }
})

function Preview (model, position) { 
   vehicle ? ( vehicle.model = mp.game.joaat(model) ) : (
      vehicle = mp.vehicles.new(mp.game.joaat(model), new mp.Vector3(position.x, position.y, position.z), {
         dimension: Player.dimension, numberPlate: 'Test Vehicle'
      })
   )
}





// "chimera": {
//    "name": "chimera",
//    "category": "motorcycles",
//    "stats": {
//        "max_speed": 127,
//        "max_occupants": 1,
//        "max_acceleration": 0.275,
//        "max_braking": 1
//    }
//  },

//  "carbon": {
//    "name": "carbon",
//    "category": "motorcycles",
//    "stats": {
//        "max_speed": 169,
//        "max_occupants": 2,
//        "max_acceleration": 0.3,
//        "max_braking": 1.3
//    }
//  },

//  "hermes": {
//    "name": "hermes",
//    "category": "muscle",
//    "stats": {
//        "max_speed": 148,
//        "max_occupants": 2,
//        "max_acceleration": 0.285,
//        "max_braking": 0.775
//    }
//  },