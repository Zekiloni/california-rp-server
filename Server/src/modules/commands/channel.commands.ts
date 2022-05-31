import { cmds, colors, itemNames } from '@constants';
import { Items } from '@models';
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


      // Items.hasEquiped(player, itemNames.HANDHELD_RADIO).then(radio => { 
      //    if (!radio) {
      //       return;
      //    }

      //    mp.players.forEach(async target => {
      //       const equiped = await Items.hasEquiped(target, itemNames.HANDHELD_RADIO);
      //       if (equiped && equiped.data.frequency == radio.data.frequency) {
      //          target.message('[CH ' + radio?.data.frequency + '] ' + player.name + ' : ' + text, colors.hex.RADIO);
      //       }
      //    })
      // })
   }
}