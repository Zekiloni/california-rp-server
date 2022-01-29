import { Colors, Messages } from '../../globals/constants';
import { CommandEnums, Distances, entityData } from '../../globals/enums';
import { Commands } from '../../modules/commands';


Commands[cmds.names.ROLEPLAY_ME] = {
   description: cmds.descriptions.ROLEPLAY_ME,
   params: [
      cmds.params.TEXT
   ],
   call (player: PlayerMp, ...content) {
      const text = [...content].join(' ');

      if (!text.trim()) {
         return;
      };

      player.sendProximityMessage(Distances.ROLEPLAY, '** ' + player.name + ' ' + text, Colors.Purple);
   }
};


Commands[cmds.names.ROLEPLAY_DO] = {
   description: cmds.descriptions.ROLEPLAY_DO,
   params: [
      cmds.params.TEXT
   ],
   call (player: PlayerMp, ...content) {
      const text = [...content].join(' ');

      if (!text.trim()) {
         return;
      };

      player.sendProximityMessage(Distances.ROLEPLAY, '** ' + text + ' (( ' + player.name + ' ))', Colors.Purple);
   }
};


Commands[cmds.names.ROLEPLAY_TRY] = {
   description: cmds.descriptions.ROLEPLAY_TRY,
   params: [
      cmds.params.TEXT
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


Commands[cmds.names.LOW_CHAT] = {
   description: cmds.descriptions.LOW_CHAT,
   params: [
      cmds.params.TEXT
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


Commands[cmds.names.SHOUT_CHAT] = {
   description: cmds.descriptions.SHOUT_CHAT,
   params: [
      cmds.params.TEXT
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


Commands[cmds.names.WHISPER] = {
   description: cmds.descriptions.WHISPER,
   params: [
      cmds.params.PLAYER,
      cmds.params.TEXT
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


Commands[cmds.names.ROLEPLAY_AME] = {
   description: cmds.descriptions.ROLEPLAY_AME,
   params: [
      cmds.params.TEXT
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


Commands[cmds.names.OOC_CHAT] = {
   description: cmds.descriptions.OOC_CHAT,
   params: [
      cmds.params.TEXT
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


Commands[cmds.names.PM] = {
   description: cmds.descriptions.PM_CHAT,
   params: [
      cmds.params.PLAYER, 
      cmds.params.TEXT
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


Commands[cmds.names.COIN] = {
   description: '',
   call (player: PlayerMp) {
      if (player.character.money < 1) {
         // PORUKA: Nemate novca
         return;
      }

      if (player.character.wounded) {
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