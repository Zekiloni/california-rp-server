
module.exports = { 
   commands: [ 
      {
         name: 'enter',
         call: (player, args) => { 
            if (player.near != null) {
               let type = player.near.type;
               switch (type) { 
                  case 'house':
                     let house = mp.houses[player.near.id];
                     if (house.locked == 1) return false;

                     player.dimension = house.intDimenison;
                     player.position = new mp.Vector3(house.interior.x, house.interior.y, house.interior.z)
                     player.inside = { type: 'house', id: house.id }
                     if (house.ipl) { player.call('client:interior.request.ipl', [house.ipl]); }

                     break;

                  case 'business':
                     // to be continued

                     break;
               }
            }
         }
      },

      {
         name: 'exit',
         call: (player, args) => { 
            if (player.inside != null) { 
               let type = player.inside.type; 
               switch (type) { 
                  case 'house': 
                     let house = mp.houses[player.inside.id], interior = new mp.Vector3(house.interior.x, house.interior.y, house.interior.z),
                        entrance = new mp.Vector3(house.entrance.x, house.entrance.y, house.entrance.z);
                     if (player.dist(interior) < 3.5) { 
                        player.position = entrance;
                        player.dimension = house.dimension;
                        player.inside = null;
                     }
                     break;

                  case 'business':
                     // to be continued
                     break;
               }
            }
         }
      },
   ]
}