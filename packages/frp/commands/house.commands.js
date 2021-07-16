

module.exports = {
   commands: [

      {
         name: 'createhouse',
         desc: 'Kreiranje kuće.',
         admin: 4,
         params: ['tip', 'cena'],
         call: (Player, args) => {
            const [Type, Price] = args;
            frp.Houses.Create(Player, Type, Price);
         }
      },

      {
         name: 'deletehouse',
         desc: 'Brisanje najbliže kuće.',
         admin: 4,
         call: (Player) => {
         
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
