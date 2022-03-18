
import { cmds, colors, lang } from '@constants';
import { distances, notifications } from '@enums';
import { checkForDot, shared_Data } from '@shared';
import { Commands } from '../commands';


Commands[cmds.names.HELP] = {
   description: cmds.descriptions.HELP,
   call (player: PlayerMp) {
      for (const i in Commands) {
         const cmd = Commands[i];
         const params = cmd.params ? (' [' + cmd.params?.join('] [') + '] ').toString() : ' []';
         const help = ('/' + String(i)) + String(params) + ' - '  +  (cmd.description ? cmd.description : '/');
         player.outputChatBox(help);
      }
   }
}

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

      player.proximityMessage(distances.ROLEPLAY, '** ' + player.name + ' ' + text, colors.hex.Purple);
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

      player.proximityMessage(distances.ROLEPLAY, '** ' + text + ' (( ' + player.name + ' ))', colors.hex.Purple);
   }
};


Commands[cmds.names.PAY] = {
   description: cmds.descriptions.PAY,
   params: [
      cmds.params.PLAYER,
      cmds.params.NUMBER
   ],
   async call (player: PlayerMp, targetSearch: string, value: string) {
      const target = mp.players.find(targetSearch);

      if (!target) {
         player.notification(lang.userNotFound, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      player.character.pay(player, target, Number(value));
   }
}


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

      const tryResult = lang.tryEnd[Math.floor(Math.random() * lang.tryEnd.length)];     

      player.proximityMessage(
         distances.ROLEPLAY, 
         '* ' + player.name + lang.tiresTo + text + lang.and + tryResult + '.', 
         colors.hex.Purple
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

      player.proximityMessage(
         distances.LOW, 
         player.name + ' ' + lang.quetly + ': ' + text, 
         colors.hex.Low
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

      player.proximityMessage(
         distances.SHOUT, 
         player.name + ' ' + lang.isShouting + ': ' + text, 
         colors.hex.White
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

      if (player.dist(target.position) > distances.WHISPER || player.dimension != target.dimension) {
         // PORUKA: IGRAC NIJE U VASOJ BLIZINI
         return;
      }

      target.sendMessage(player.name + ' ' + lang.isWhisperingU + ': ' + text, colors.hex.White[3]);
      player.sendMessage(lang.whispering + ' ' + target.name + ': ' + text, colors.hex.White[3]);
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

      player.setVariable(shared_Data.BUBBLE, text);
      player.sendMessage('> ' + player.name + ' ' + checkForDot(text), colors.hex.Purple[1]);

      setTimeout(() => { 
         if (!player) {
            return;
         }

         player.setVariable(shared_Data.BUBBLE, null);
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

      player.proximityMessage(
         distances.OOC, 
         '(( ' + player.name + ' [' + player.id + ']: ' + text + ' ))',
         colors.hex.OOC
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
         '(( ' + lang.pmFrom + ' ' + player.name + ' [' + player.id + ']: ' + text + ' ))', 
         colors.hex.PM.From
      );

      player.sendMessage(
         '(( ' + lang.pmTo + ' ' + target.name + ' [' + target.id + ']: ' + text + ' ))', 
         colors.hex.PM.To
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


      const coinResult = lang.coinResult[Math.floor(Math.random() * lang.coinResult.length)];   

      player.proximityMessage(
         distances.ROLEPLAY, 
         '* ' + player.name + lang.dropsCoin + coinResult + '.', 
         colors.hex.Purple
      );  
   }
}