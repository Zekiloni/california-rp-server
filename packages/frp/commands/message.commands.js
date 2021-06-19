
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
         params: ['tekst'],
         call: (player, args) => {
            let message = args.splice(0).join(' ');
            if (!message.trim()) return;
            player.ProximityMessage(frp.Globals.distances.low, player.name + ' tiho: ' + message, frp.Globals.Colors.low);
         }
      },

      {
         name: 's',
         desc: 'Izgovoriti nesto glasnije',
         params: ['tekst'],
         call: (player, args) => {
            let message = args.splice(0).join(' ');
            if (!message.trim()) return;
            player.ProximityMessage(frp.Globals.distances.shout, player.name + ' se dere: ' + message, frp.Globals.Colors.white);
         }
      },

      {
         name: 'b',
         desc: 'Lokana OOC komunikacija',
         params: ['tekst'],
         call: (player, args) => {
            let message = args.splice(0).join(' ');
            if (!message.trim()) return;
            player.ProximityMessage(frp.Globals.distances.ooc, '(( ' + player.name + '[' + player.id + ']: ' + message + ' ))', frp.Globals.Colors.ooc);
         }
      },

      {
         name: 'w',
         desc: 'Sapnuti nekome nesto',
         params: ['igrac', 'tekst'],
         call: (player, args) => {
               if (args.length < 2 || !args[0].length || !args[1].length)
                  return false;
               let target = mp.players.find(args[0]);
               if (target) {
                  if (!player.IsNear(target))
                     return false;
                  let message = args.slice(1).join(' ');
                  target.SendMessage(`${player.name} vam sapuće: ${message}`, mp.colors.white[2]);
                  player.SendMessage(`${player.name} šapnuli ste ${target.name}: ${message}`, mp.colors.white[2]);
               }
               else
                  return false;
         }
      },

      {
         name: 'pm',
         desc: 'Privatna poruka',
         params: ['igrac', 'poruka'],
         call: (player, args) => {
            let target = mp.players.find(args[0]);
            if (target) { 
               if (player.id == target.id) return;
               let message = args.splice(1).join(' ');
               if (!message.trim()) return;
               target.SendMessage('(( PM od ' + player.name + ' [' + player.id + ']: ' + message + ' ))', frp.Globals.Colors.pm.from);
               player.SendMessage('(( PM za ' + target.name + ' [' + target.id + ']: ' + message + ' ))', frp.Globals.Colors.pm.to);
            }
         }
      },

      {
         name: 'ame',
         desc: 'Radnja-Akcija',
         params: ['tekst'],
         call: (player, args) => {
            let message = args.splice(0).join(" ");
            player.data.Bubble = message;
            console.log(message);
            setTimeout(() => {
               player.data.Bubble = null;
            }, 7000);
         }
      }
   ]
};
