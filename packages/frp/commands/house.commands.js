module.exports = {
   commands: [
      {
         name: 'createhouse',
         admin: 4,
         call: (player, args) => {
            const [type, price] = args;
            console.log(type, price);
            frp.Houses.Create(player, type, price);
         }
      },
      {
         name: 'deletehouse',
         admin: 3,
         params: ['tip kuce', 'cena'],
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
