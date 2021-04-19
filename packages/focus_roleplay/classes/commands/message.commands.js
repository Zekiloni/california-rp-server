

mp.colors = { 
   white: ['FFFFFF', 'E6E6E6', 'C8C8C8', 'AAAAAA', '6E6E6E'], 
   purple: ['F9B7FF', 'E6A9EC', 'C38EC7', 'D2B9D3', 'D2B9D3'],
   ooc: ['7B8A89', 'A3B8B7', '9AADAC', '8D9E9D', '7B8A89'],
   faction: 'BDF38B',
   radio: 'FFFF99',
   pm: { from: 'FFD500', to: 'FCBD00' },
   tomato: 'FF6347',
   admin: 'D9534F',
   info: 'E2D051',
   success: '6BD56B',
   help: '11C4B3',
   server: '0792E5',
}

const distances = { 
   ooc: 5.0, 
   ic: 7.5,
   low: 3,
   shout: 12.5,  
   do: 7.5,
   me: 7.5,
}

module.exports = { 
   commands: [

      {
         name: 'me',
         desc: 'Opis situacije, stanja',
         params: '[tekst]',
         call: (player, args) => { 
            let message = args.splice(0).join(" ");
            player.proximityMessage(distances.me, `** ${player.name} ${message}`, mp.colors.purple)
         }
      },

      {
         name: 'do',
         desc: 'Opis radnje koju radite',
         params: '[tekst]',
         call: (player, args) => { 
            let message = args.splice(0).join(" ");
            player.proximityMessage(distances.me, `** ${message} (( ${player.name} ))`, mp.colors.purple)
         }
      },

      {
         name: 'try',
         desc: 'Pokušaj',
         params: '[akcija]',
         call: (player, args) => { 
            let message = args.splice(0).join(" "), msg = ['uspeva', 'ne uspeva'];
            let random = msg[Math.floor(Math.random()*msg.length)];
            player.proximityMessage(distances.me, `* ${player.name} pokušava da ${message} i ${random}.`, mp.colors.purple)
         }
      },

      {
         name: 'l',
         desc: 'Izgovoriti nesto tiho',
         params: '[tekst]',
         call: (player, args) => { 
            let message = args.splice(0).join(" ");
            player.proximityMessage(distances.low, `${player.name} tiho: ${message}`, mp.colors.white)
         }
      },

      {
         name: 's',
         desc: 'Izgovoriti nesto glasnije',
         params: '[tekst]',
         call: (player, args) => { 
            let message = args.splice(0).join(" ");
            player.proximityMessage(distances.shout, `${player.name} se dere: ${message}`, mp.colors.white)
         }
      },

      {
         name: 'w',
         desc: 'Sapnuti nekome nesto',
         params: '[id / ime] [tekst]',
         call: (player, args) => { 
            if (args.length < 2 || !args[0].length || !args[1].length) return false; 
            let target = mp.players.find(args[0])

            if (target) { 
               if (!player.isNear(target)) return false;
               let message = args.slice(1).join(' '); 
               target.sendMessage(`${player.name} vam sapuće: ${message}`, mp.colors.white[2]);
               player.sendMessage(`${player.name} šapnuli ste ${target.name}: ${message}`, mp.colors.white[2])
            } else return false;

         }
      },


      {
         name: 'b',
         desc: 'Lokana OOC komunikacija',
         params: '[tekst]',
         call: (player, args) => { 
            let message = args.splice(0).join(" ");
            player.proximityMessage(distances.ooc, `(( ${player.name} [${player.id}]: ${message} ))`, mp.colors.white)
         }
      },

      {
         name: 'pm',
         desc: 'Privatna poruka',
         params: '[id / ime] [tekst]',
         call: (player, args) => { 
            if (args.length < 2 || !args[0].length || !args[1].length) return false; 
            let target = mp.players.find(args[0]);
            
            if (target) { 
               let message = args.slice(1).join(' '); 
               target.sendMessage(`(( PM od ${player.name} [${player.id}]: ${message} ))`, mp.colors.pm.from);
               player.sendMessage(`(( PM za ${target.name} [${target.id}]: ${message} ))`, mp.colors.pm.to)
            } else return false;
         }
      },

   ]
}