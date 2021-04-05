
module.exports = { 
   commands: [ 
      {
         name: 'createhouse',
         admin: 3,
         call: (player, args) => { 
            mp.house.new(player, args[0], args[1])
         }
      },

      {
         name: 'deletehouse',
         admin: 3,
         call: (player, args) => { 
            if (player.near != null && player.near.type == 'house') { 
               let house = mp.houses[player.near.id];
               mp.house.delete(house)
            }
         }
      },
   ]
}