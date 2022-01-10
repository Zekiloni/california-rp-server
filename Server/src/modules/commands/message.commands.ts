import { Colors, Messages } from '../../globals/constants';
import { Distances, NotifyType } from '../../globals/enums';
import { Commands } from '../commands';


Commands['me'] = {
   description: 'Opis situacije, stanja',
   params: ['radnja'],
   call: (player: PlayerMp, ...content) => {
      const Text = [...content].join(' ');
      if (!Text.trim()) return;
      player.sendProximityMessage(Distances.ROLEPLAY, '** ' + player.name + ' ' + Text, Colors.Purple);
   }
}

Commands['do'] = {
   description: 'Opis radnje koju radite',
   params: ['opis / stanje'],
   call: (Player: PlayerMp, args: any) => {
      const Text = args.splice(0).join(' ');
      if (!Text.trim()) return;
      Player.sendProximityMessage(Distances.ROLEPLAY, '** ' + Text + ' (( ' + Player.name + ' ))', Colors.Purple);
   }
   
}

Commands['try'] = {
   description: 'Pokušaj',
   params: ['radnja'],
   call: (Player: PlayerMp, args: any) => {
      const Message = args.splice(0).join(' ');
      if (!Message.trim()) return;

      let End = ['uspeva', 'ne uspeva']; 
      let Random = End[Math.floor(Math.random() * End.length)];
               
      Player.sendProximityMessage(Distances.ROLEPLAY, '* ' + Player.name + ' pokušava da ' + Message + ' i ' + Random, Colors.Purple);  
   }
}

Commands['l'] = {
   description: 'Izgovoriti nesto tiho',
   params: ['tekst'],
   call: (player: PlayerMp, args: any) => {
      const Message = args.splice(0).join(' ');
      if (!Message.trim()) return;
      player.sendProximityMessage(Distances.LOW, player.name + ' tiho: ' + Message, Colors.Low);
   }
}

Commands['s'] = {
   description: 'Izgovoriti nesto glasnije',
   params: ['tekst'],
   call: (Player: PlayerMp, args: any) => {
      const Message = args.splice(0).join(' ');
      if (!Message.trim()) return;
      Player.sendProximityMessage(Distances.SHOUT, Player.name + ' se dere: ' + Message, Colors.White);
   }
}

Commands['b'] = {
   description: 'Lokana OOC komunikacija',
   params: ['tekst'],
   call: (Player: PlayerMp, args: any) => {
      const Message = args.splice(0).join(' ');
      if (!Message.trim()) return;
      Player.sendProximityMessage(Distances.OOC, '(( ' + Player.name + '[' + Player.id + ']: ' + Message + ' ))', Colors.OOC);
   }
}

Commands['w'] = {
   description: 'Sapnuti nekome nesto',
   params: ['igrac', 'tekst'],
   call: (Player: PlayerMp, args: any) => {
         // const Target = mp.players.find(args[0]);

         // if (Target) { 
         //    if (Player.id == Target.id) return;
         //    const Message = args.splice(1).join(' ');
         //    if (!Message.trim()) return;
         //    if (Player.dist(Target.position) > Distances.WHISPER) return Player.Notification(Messages.PLAYER_NOT_NEAR, NotifyType.ERROR, 5);

         //    Target.SendMessage(Player.name + ' vam šapuće: ' + Message + '.', Colors.White[3]);
         //    Player.SendMessage('Šapnuli ste ' + Target.name + ': ' + Message + '.', Colors.White[3]);
         // }
   }
}

Commands['pm'] = {
   description: 'Privatna poruka',
   params: ['igrac', 'tekst'],
   call: (Player: PlayerMp, args: any) => {
      // const Target = mp.players.find(args[0]);
      // if (Target) { 
      //    if (Player.id == Target.id) return;
      //    let Message = args.splice(1).join(' ');
      //    if (!Message.trim()) return;
      //    Target.SendMessage('(( PM od ' + Player.name + ' [' + Player.id + ']: ' + Message + ' ))', Colors.PM.From);
      //    Player.SendMessage('(( PM za ' + Target.name + ' [' + Target.id + ']: ' + Message + ' ))', Colors.PM.To);
      // }
   }
}

Commands['ame'] = {
   description: 'Radnja / Akcija',
   params: ['sadržaj'],
   call: (Player: PlayerMp, args: any) => {
      const Content = args.splice(0).join(' ');
      //Player.Bubble(Content, frp.Globals.Colors.Bubble);   
   }
}
