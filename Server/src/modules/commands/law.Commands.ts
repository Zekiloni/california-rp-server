import { factionConfig } from '@configs';
import { cmds } from '@constants';
import { shared_Data } from '@shared/shared.enums';
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