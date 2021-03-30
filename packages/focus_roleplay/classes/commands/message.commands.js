

const colors = { 
   white: ['FFFFFF', 'E6E6E6', 'C8C8C8', 'AAAAAA', '6E6E6E'], 
   purple: ['F9B7FF', 'E6A9EC', 'C38EC7', 'D2B9D3', 'D2B9D3'],
   faction: 'BDF38B',
   radio: 'FFFF99',
   pm: { from: 'FFD500', to: 'FCBD00' },
   tomato: 'FF6347',
   info: 'E2D051'
}

const distances = { 
   ooc: 4.0, 
   ic: 6.5,
   low: 2.8,
   shout: 12.2,  
   do: 6.8,
   me: 6.8,
}


module.exports = { 
   commands: [

      {
         name: 'do',
         desc: 'Opis situacije',
         call: (player, args) => { 
            console.log(args)
            let message = args.splice(0).join(" ");
            player.proximityMessage(distances.me, `* ${message} (( ${player.name} ))`, colors.purple)
         }
      },


      {
         name: 'me',
         desc: '',
         call: (player, args) => { 
            let message = args.splice(0).join(" ");
            console.log(args)
            player.proximityMessage(distances.me, `* ${player.name} ${message}`, colors.purple)
         }
      },

      {
         name: 'l',
         desc: '',
         call: (player) => { 
            player.kick('Debil')
         }
      },


   ]
}