import { factionConfig } from '@configs';
import { cmds, colors, itemNames, lang } from '@constants';
import { distances, notifications } from '@enums';
import { shared_Data } from '@shared';
import { Commands } from '../commands';


Commands[cmds.names.VEHICLE_CALLSIGN] = {
   description: cmds.descriptions.VEHICLE_CALLSIGN,
   vehicle: true,
   faction: { 
      required: true, 
      type: [factionConfig.type.LEO, factionConfig.type.FIRE_DEPT, factionConfig.type.MEDIC]
   },
   params: [
      cmds.params.TEXT
   ],
   call (player: PlayerMp, ...text) {
      const sign = [...text].join(' ');
      
      if (!sign.trim()) {
         return;
      }

      const callsign = player.vehicle.getVariable(shared_Data.CALLSIGN);

      if (callsign) {
         player.vehicle.setVariable(shared_Data.CALLSIGN, null);
      } else { 
         player.vehicle.setVariable(shared_Data.CALLSIGN, sign);
      }
   }
}


Commands[cmds.names.CUFF] = {
   description: cmds.descriptions.CUFF,
   faction: {
      required: true,
      type: [ factionConfig.type.LEO ]
   },
   item: itemNames.HANDCUFFS,
   async call (player: PlayerMp, targetSearch: string) {
      const target = mp.players.find(targetSearch);

      if (!target) {
         player.notification(lang.userNotFound, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      const cuffed = player.getVariable(shared_Data.CUFFED);

      target.character.setCuffs(target, !cuffed);
      player.proximityMessage(distances.ROLEPLAY, '* ' + player.name + (!cuffed ? lang.putCuffs : lang.removeCuffs) + target.name, colors.hex.Purple);
   }
}