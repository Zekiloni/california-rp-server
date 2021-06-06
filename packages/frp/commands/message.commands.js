
module.exports = {
   commands: [
      {
         name: 'me',
         desc: 'Opis situacije, stanja',
         params: ['radnja'],
         call: (player, args) => {
            let Text = args.splice(0).join(' ');
            if (!Text.trim()) return;
            player.ProximityMessage(frp.Globals.distances.me, '** ' + player.name + ' ' + Text, frp.Globals.Colors.purple);
         }
      },

      {
         name: 'do',
         desc: 'Opis radnje koju radite',
         params: ['opis / stanje'],
         call: (player, args) => {
            let Text = args.splice(0).join(' ');
            if (!Text.trim()) return;
            player.ProximityMessage(frp.Globals.distances.do, '** ' + Text + ' (( ' + player.name + ' ))', frp.Globals.Colors.purple);
         }
      },

      {
         name: 'try',
         desc: 'Pokušaj',
         params: ['radnja'],
         call: (player, args) => {
            let message = args.splice(0).join(' ');
            if (!message.trim()) return;
            let End = ['uspeva', 'ne uspeva'];
            
            let Random = End[Math.floor(Math.random() * End.length)];
            player.ProximityMessage(frp.Globals.distances.me, '* ' + player.name + ' pokušava da ' + message + ' i ' + Random, frp.Globals.Colors.purple);
         }
      },

      {
         name: 'l',
         desc: 'Izgovoriti nesto tiho',
         params: '[tekst]',
         call: (player, args) => {
            let message = args.splice(0).join(' ');
            if (!message.trim()) return;
            player.ProximityMessage(frp.Globals.distances.low, player.name + ' tiho: ' + message, frp.Globals.Colors.low);
         }
      },

      {
         name: 's',
         desc: 'Izgovoriti nesto glasnije',
         params: '[tekst]',
         call: (player, args) => {
            let message = args.splice(0).join(' ');
            if (!message.trim()) return;
            player.ProximityMessage(frp.Globals.distances.shout, player.name + ' se dere: ' + message, frp.Globals.Colors.white);
         }
      },

      {
         name: 'w',
         desc: 'Sapnuti nekome nesto',
         params: '[id / ime] [tekst]',
         call: (player, args) => {
               if (args.length < 2 || !args[0].length || !args[1].length)
                  return false;
               let target = mp.players.find(args[0]);
               if (target) {
                  if (!player.isNear(target))
                     return false;
                  let message = args.slice(1).join(' ');
                  target.sendMessage(`${player.name} vam sapuće: ${message}`, mp.colors.white[2]);
                  player.sendMessage(`${player.name} šapnuli ste ${target.name}: ${message}`, mp.colors.white[2]);
               }
               else
                  return false;
         }
      },

      {
         name: 'b',
         desc: 'Lokana OOC komunikacija',
         params: '[tekst]',
         call: (player, args) => {
               let message = args.splice(0).join(" ");
               player.ProximityMessage(distances.ooc, `(( ${player.name} [${player.id}]: ${message} ))`, mp.colors.white);
         }
      },

      {
         name: 'ame',
         desc: 'Lokana OOC komunikacija',
         params: '[tekst]',
         call: (player, args) => {
               let message = args.splice(0).join(" ");
               player.call('client:player.chat.bubble', [15, message, true]);
         }
      },
      
      {
         name: 'pm',
         desc: 'Privatna poruka',
         params: '[id / ime] [tekst]',
         call: (player, args) => {
               if (args.length < 2 || !args[0].length || !args[1].length)
                  return false;
               let target = mp.players.find(args[0]);
               if (target) {
                  let message = args.slice(1).join(' ');
                  target.sendMessage(`(( PM od ${player.name} [${player.id}]: ${message} ))`, mp.colors.pm.from);
                  player.sendMessage(`(( PM za ${target.name} [${target.id}]: ${message} ))`, mp.colors.pm.to);
               }
               else
                  return false;
         }
      }
   ]
};
