

module.exports = {
   commands: [ 
      {
         name: 'createitem',
         admin: 3,
         call: (player, args) => { 
            let quantity = args[0], name = args.slice(1).join(' ');
            mp.item.create(player, quantity, name, -1, -1);
         }
      },

      {
         name: 'deleteitem',
         admin: 3,
         call: (player, args) => { 
         }
      },

      {
         name: 'clearinventory',
         admin: 3,
         call: (player, args) => { 
            let target = mp.players.find(args[0]);
            if (target) { 
               mp.item.clear(target);
            }
         }
      }
   ]
}