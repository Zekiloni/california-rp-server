import { Colors, Messages } from '../../globals/constants';
import { CommandEnums, Distances } from '../../globals/enums';
import { Commands } from '../commands';


Commands[CommandEnums.Names.ROLEPLAY_ME] = {
   description: CommandEnums.Descriptions.ROLEPLAY_ME,
   params: [
      CommandEnums.Params.TEXT
   ],
   call: (player: PlayerMp, ...content) => {
      const text = [...content].join(' ');

      if (!text.trim()) {
         return;
      };

      player.sendProximityMessage(Distances.ROLEPLAY, '** ' + player.name + ' ' + text, Colors.Purple);
   }
};


Commands[CommandEnums.Names.ROLEPLAY_DO] = {
   description: CommandEnums.Descriptions.ROLEPLAY_DO,
   params: [
      CommandEnums.Params.TEXT
   ],
   call: (player: PlayerMp, ...content) => {
      const text = [...content].join(' ');

      if (!text.trim()) {
         return;
      };

      player.sendProximityMessage(Distances.ROLEPLAY, '** ' + text + ' (( ' + player.name + ' ))', Colors.Purple);
   }
};


Commands[CommandEnums.Names.ROLEPLAY_TRY] = {
   description: CommandEnums.Descriptions.ROLEPLAY_TRY,
   params: [
      CommandEnums.Params.TEXT
   ],
   call: (player: PlayerMp, ...content) => {
      const text = [...content].join(' ');

      if (!text.trim()) {
         return;
      };

      const tryResult = Messages.TRY_END[Math.floor(Math.random() * Messages.TRY_END.length)];      
      player.sendProximityMessage(
         Distances.ROLEPLAY, 
         '* ' + player.name + Messages.TRIES_TO + text + Messages.AND + tryResult, 
         Colors.Purple
      );  
   }
};


Commands[CommandEnums.Names.LOW_CHAT] = {
   description: CommandEnums.Descriptions.LOW_CHAT,
   params: [
      CommandEnums.Params.TEXT
   ],
   call: (player: PlayerMp, ...content: any) => {
      const text = [...content].join(' ');

      if (!text.trim()) {
         return;
      };

      player.sendProximityMessage(
         Distances.LOW, 
         player.name + ' ' + Messages.QUETLY + ': ' + text, 
         Colors.Low
      );
   }
};


Commands[CommandEnums.Names.SHOUT_CHAT] = {
   description: CommandEnums.Descriptions.SHOUT_CHAT,
   params: [
      CommandEnums.Params.TEXT
   ],
   call: (player: PlayerMp, ...content: any) => {
      const text = [...content].join(' ');

      if (!text.trim()) {
         return;
      };

      player.sendProximityMessage(
         Distances.SHOUT, 
         player.name + ' ' + Messages.IS_SHOUTING + ': ' + text, 
         Colors.White
      );
   }
};


Commands[CommandEnums.Names.OOC_CHAT] = {
   description: CommandEnums.Descriptions.OOC_CHAT,
   params: [
      CommandEnums.Params.TEXT
   ],
   call: (player: PlayerMp, ...content: any) => {
      const text = [...content].join(' ');

      if (!text.trim()) {
         return;
      };

      player.sendProximityMessage(
         Distances.OOC, 
         '(( ' + player.name + '[' + player.id + ']: ' + text + ' ))',
         Colors.OOC
      );
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
