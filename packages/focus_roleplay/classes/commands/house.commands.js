
module.exports = { 
   commands: [ 
      {
         name: 'createhouse',
         admin: 3,
         call: (player, args) => { 
            console.log(args)
            console.log('type ' + args[0]);
            console.log('price ' + args[1])
            mp.house.new(player, args[0], args[1])
         }
      },
   ]
}