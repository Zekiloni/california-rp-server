import { Colors, Messages } from '../../globals/constants';
import { CommandEnums, Distances, entityData } from '../../globals/enums';
import { Commands } from '../commands';


Commands[CommandEnums.Names.ROLEPLAY_ME] = {
   description: CommandEnums.Descriptions.ROLEPLAY_ME,
   params: [
      CommandEnums.Params.TEXT
   ],
   call (player: PlayerMp, ...content) {
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
   call (player: PlayerMp, ...content) {
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
   call (player: PlayerMp, ...content) {
      const text = [...content].join(' ');

      if (!text.trim()) {
         return;
      };

      const tryResult = Messages.TRY_END[Math.floor(Math.random() * Messages.TRY_END.length)];      
      player.sendProximityMessage(
         Distances.ROLEPLAY, 
         '* ' + player.name + Messages.TRIES_TO + text + Messages.AND + tryResult + '.', 
         Colors.Purple
      );  
   }
};


Commands[CommandEnums.Names.LOW_CHAT] = {
   description: CommandEnums.Descriptions.LOW_CHAT,
   params: [
      CommandEnums.Params.TEXT
   ],
   call (player: PlayerMp, ...content: any) {
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
   call (player: PlayerMp, ...content: any) {
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


Commands[CommandEnums.Names.WHISPER] = {
   description: CommandEnums.Descriptions.WHISPER,
   params: [
      CommandEnums.Params.PLAYER,
      CommandEnums.Params.TEXT
   ],
   call (player: PlayerMp, targetSearch: string | number, ...content: any) {

      const text = [...content].join(' ');

      if (!text.trim()) {
         return;
      }

      const target = mp.players.find(targetSearch);

      if (!target) {
         // PORUKA: IGRAC NIJE PRONADJEN
         return;
      }

      if (target.id == player.id) {
         // PORUKA: NE MOZETE SAMI SEBI
         return;
      }

      if (player.dist(target.position) > Distances.WHISPER || player.dimension != target.dimension) {
         // PORUKA: IGRAC NIJE U VASOJ BLIZINI
         return;
      }

      target.sendMessage(player.name + ' ' + Messages.IS_WHISPERING_U + ': ' + text, Colors.White[3]);
      player.sendMessage(Messages.WHISPERING + ' ' + target.name + ': ' + text, Colors.White[3]);
   }
};


Commands[CommandEnums.Names.ROLEPLAY_AME] = {
   description: CommandEnums.Descriptions.ROLEPLAY_AME,
   params: [
      CommandEnums.Params.TEXT
   ],
   call (player: PlayerMp, ...content: any) {

      const text = [...content].join(' ');

      if (!text.trim()) {
         return;
      }

      if (text.length > 64) {
         // PORUKA: MAKS DUZINA AME JE 64
         return;
      }

      player.setVariable(entityData.BUBBLE, text);
      setTimeout(() => { 
         if (!player) {
            return;
         }

         player.setVariable(entityData.BUBBLE, null);
      }, 6000);
   }
}


Commands[CommandEnums.Names.OOC_CHAT] = {
   description: CommandEnums.Descriptions.OOC_CHAT,
   params: [
      CommandEnums.Params.TEXT
   ],
   call (player: PlayerMp, ...content: any) {
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
};


Commands[CommandEnums.Names.PM] = {
   description: CommandEnums.Descriptions.PM_CHAT,
   params: [
      CommandEnums.Params.PLAYER, 
      CommandEnums.Params.TEXT
   ],
   call (player: PlayerMp, targetSearch: string | number, ...content: any) {
      
      const text = [...content].join(' ');
      
      if (!text.trim()) {
         return;
      }

      const target = mp.players.find(targetSearch);

      if (!target) {
         // PORUKA: IGRAC NIJE PRONADJEN
         return;
      }

      if (target.id == player.id) {
         // PORUKA: NE MOZETE SAMI SEBI
         return;
      }

      target.sendMessage(
         '(( ' + Messages.PM_FROM + ' ' + player.name + ' [' + player.id + ']: ' + text + ' ))', 
         Colors.PM.From
      );

      player.sendMessage(
         '(( ' + Messages.PM_TO + ' ' + target.name + ' [' + target.id + ']: ' + text + ' ))', 
         Colors.PM.To
      );
   }
};


Commands[CommandEnums.Names.COIN] = {
   description: '',
   call (player: PlayerMp) {
      if (player.Character.money < 1) {
         // PORUKA: Nemate novca
         return;
      }

      if (player.Character.wounded) {
         // PORUKA: Nemate novca
         return;
      }


      const coinResult = Messages.COIN_RESULT[Math.floor(Math.random() * Messages.COIN_RESULT.length)];   

      player.sendProximityMessage(
         Distances.ROLEPLAY, 
         '* ' + player.name + Messages.DROPS_COIN + coinResult + '.', 
         Colors.Purple
      );  
   }
}