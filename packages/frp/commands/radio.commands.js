
let Channels = require('../classes/Channels');

module.exports = { 
   commands: [ 
      {
         name: 'r',
         desc: 'Radio komunikacija',
         call: async (player, args) => { 
            let Character = await player.Character();
            if (Character.Frequency == 0) return; // PORUKA: Niste ni u jednoj frekvenciji
            if (!mp.item.hasItem(character.id, 'Radio Prijemnik')) return player.sendMessage('Ne posedujete radio prijemnik !', mp.colors.tomato);
            let message = args.splice(0).join(' ');
            if (message) { 
               Channels.Send(Character.Frequency, player.name + ': ' + message);
            }
         }
      },

      {
         name: 'freq',
         desc: 'Podešavanje frekvencije',
         call: (player, args) => { 
            if (!mp.item.hasItem(player.character, 'Radio Prijemnik')) return player.sendMessage('Ne posedujete radio prijemnik !', mp.colors.tomato);
            if (!args[0]) return player.sendMessage('Komanda /freq set - create - leave - delete - password !', mp.colors.help);
            switch (args[0]) { 
               case 'set': { mp.channels.join(player, args[1], args[2]); break; }
               case 'create': { mp.channels.create(player, args[1], args[2] ? ( args[2] ) : ( 0 )); break; }
               case 'leave': { mp.channels.leave(player); break; }

               case 'delete': { 
                  console.log('delete')

                  break;
               }

               case 'password': { 
                  console.log('password')

                  break;
               }
            }
         }
      }
   ]
}