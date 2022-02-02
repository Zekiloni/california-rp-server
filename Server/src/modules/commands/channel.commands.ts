import { cmds, colors } from '@constants';
import { Commands } from '../commands';

Commands[cmds.names.RADIO] = {
   description: '',
   params: [
      cmds.params.TEXT
   ],
   call (player: PlayerMp, ...content) {
      const text = [...content].join(' ');

      if (!text.trim()) {
         return;
      };

      mp.players.forEach(player => {
         player.sendMessage('[CH: 911] ' + player.name + ' : ' + text, colors.hex.RADIO);
      });
   }
}