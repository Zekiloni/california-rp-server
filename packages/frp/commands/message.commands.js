
module.exports = {
   commands: [
      {
         name: 'me',
         desc: 'Opis situacije, stanja',
         params: ['radnja'],
         call: (Player, args) => {
            const Text = args.splice(0).join(' ');
            if (!Text.trim()) return;
            Player.ProximityMessage(frp.Globals.distances.me, '** ' + Player.name + ' ' + Text, frp.Globals.Colors.purple);
         }
      },

      {
         name: 'do',
         desc: 'Opis radnje koju radite',
         params: ['opis / stanje'],
         call: (Player, args) => {
            const Text = args.splice(0).join(' ');
            if (!Text.trim()) return;
            Player.ProximityMessage(frp.Globals.distances.do, '** ' + Text + ' (( ' + Player.name + ' ))', frp.Globals.Colors.purple);
         }
      },

      {
         name: 'try',
         desc: 'Pokušaj',
         params: ['radnja'],
         call: (Player, args) => {
            const Message = args.splice(0).join(' ');
            if (!Message.trim()) return;

            let End = ['uspeva', 'ne uspeva']; 
            let Random = End[Math.floor(Math.random() * End.length)];
            
            Player.ProximityMessage(frp.Globals.distances.me, '* ' + Player.name + ' pokušava da ' + Message + ' i ' + Random, frp.Globals.Colors.purple);
         }
      },

      {
         name: 'l',
         desc: 'Izgovoriti nesto tiho',
         params: ['tekst'],
         call: (Player, args) => {
            const Message = args.splice(0).join(' ');
            if (!Message.trim()) return;
            Player.ProximityMessage(frp.Globals.distances.low, player.name + ' tiho: ' + Message, frp.Globals.Colors.low);
         }
      },

      {
         name: 's',
         desc: 'Izgovoriti nesto glasnije',
         params: ['tekst'],
         call: (Player, args) => {
            const Message = args.splice(0).join(' ');
            if (!Message.trim()) return;
            Player.ProximityMessage(frp.Globals.distances.shout, Player.name + ' se dere: ' + Message, frp.Globals.Colors.white);
         }
      },

      {
         name: 'b',
         desc: 'Lokana OOC komunikacija',
         params: ['tekst'],
         call: (Player, args) => {
            const Message = args.splice(0).join(' ');
            if (!Message.trim()) return;
            Player.ProximityMessage(frp.Globals.distances.ooc, '(( ' + Player.name + '[' + Player.id + ']: ' + Message + ' ))', frp.Globals.Colors.ooc);
         }
      },

      {
         name: 'w',
         desc: 'Sapnuti nekome nesto',
         params: ['igrac', 'tekst'],
         call: (Player, args) => {
              
            const Target = mp.players.find(args[0]);

            if (Target) { 
               if (Player.id == Target.id) return;
               const Message = args.splice(1).join(' ');
               if (!Message.trim()) return;
               if (Player.dist(Target.position) > frp.Globals.distances.whisper) return Player.Notification(frp.Globals.messages.PLAYER_NOT_NEAR, frp.Globals.Notification.Error, 5);

               Target.SendMessage(Player.name + ' vam šapuće: ' + Message + '.', frp.Globals.Colors.white[3]);
               Player.SendMessage('Šapnuli ste ' + Target.name + ': ' + Message + '.', frp.Globals.Colors.white[3]);
            }

         }
      },

      {
         name: 'pm',
         desc: 'Privatna poruka',
         params: ['igrac', 'poruka'],
         call: (Player, args) => {
            const Target = mp.players.find(args[0]);
            if (Target) { 
               if (Player.id == Target.id) return;
               let Message = args.splice(1).join(' ');
               if (!Message.trim()) return;
               Target.SendMessage('(( PM od ' + Player.name + ' [' + Player.id + ']: ' + Message + ' ))', frp.Globals.Colors.pm.from);
               Player.SendMessage('(( PM za ' + Target.name + ' [' + Target.id + ']: ' + Message + ' ))', frp.Globals.Colors.pm.to);
            }
         }
      },

      {
         name: 'ame',
         desc: 'Radnja / Akcija',
         params: ['akcija'],
         call: (Player, args) => {
          
         }
      }
   ]
};
