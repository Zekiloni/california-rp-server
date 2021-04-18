
module.exports = { 
   commands: [ 
      {
         name: 'r',
         desc: 'Radio komunikacija',
         call: (player, args) => { 
            let character = player.getCharacter();
            if (character.frequency == 0) return player.sendMessage('Niste ni u jednoj frekvenciji !', mp.colors.tomato);
            if (!mp.item.hasItem(character.id, 'Radio Prijemnik')) return player.sendMessage('Ne posedujete radio prijemnik !', mp.colors.tomato);
            let message = args.splice(0).join(" ");
            if (message) { 
               mp.channels.send(character.frequency, `[CH: ${character.frequency}] ${character.first_name} ${character.last_name}: ${message}`)
            }
         }
      },

      {
         name: 'freq',
         desc: 'Podešavanje frekvencije',
         call: (player, args) => { 
            if (!args[0]) return player.sendMessage('Komanda /freq set - create - leave - delete - password !', mp.colors.help);
            switch (args[0]) { 
               case 'set': { 
                  console.log('set')
                  break;
               }

               case 'create': { 
                  console.log('create')

                  break;
               }

               case 'leave': { 
                  console.log('leave')

                  break;
               }

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