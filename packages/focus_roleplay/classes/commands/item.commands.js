

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
         name: 'find',
         admin: 2,
         call: (player, args) => { 
            mp.item.find();
         }
      }
   ]
}