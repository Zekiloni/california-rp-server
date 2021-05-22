module.exports = {
   commands: [
      {
         name: 'createhouse',
         admin: 3,
         call: (player, args) => {
            frp.Houses.create
         }
      },
      {
         name: 'deletehouse',
         admin: 3,
         call: (player, args) => {
               if (player.near != null && player.near.type == 'house') {
                  let house = mp.houses[player.near.id];
                  if (house) {
                     mp.house.delete(house);
                  }
               }
         }
      },
      {
         name: 'house',
         desc: 'Kuća',
         call: (player, args) => {
               player.call('client:house.management');
         }
      },
   ]
};
