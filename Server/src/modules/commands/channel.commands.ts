import { cmds, colors, itemNames } from '@constants';
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

      const radio = player.character.equiped.find(item => item.name == itemNames.HANDHELD_RADIO);

      mp.players.forEach(target => {
         const equiped = target.character.equiped.find(item => item.name == itemNames.HANDHELD_RADIO);

         if (equiped?.data.frequency == radio?.data.frequency) {
            target.sendMessage('[CH ' + radio?.data.frequency + '] ' + player.name + ' : ' + text, colors.hex.RADIO);
         }
      });
   }
}