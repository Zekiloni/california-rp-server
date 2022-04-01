import { cmds, colors, itemNames } from '@constants';
import { inventories } from '@models';
import { Commands } from '../commandHandler';

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


      inventories.hasEquiped(player, itemNames.HANDHELD_RADIO).then(radio => { 
         if (!radio) {
            return;
         }

         mp.players.forEach(async target => {
            const equiped = await inventories.hasEquiped(target, itemNames.HANDHELD_RADIO);
            if (equiped && equiped.data.frequency == radio.data.frequency) {
               target.sendMessage('[CH ' + radio?.data.frequency + '] ' + player.name + ' : ' + text, colors.hex.RADIO);
            }
         })
      })
   }
}