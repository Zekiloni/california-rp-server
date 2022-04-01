import { FactionConfig } from '@configs';
import { cmds, colors, itemNames, Lang } from '@constants';
import { distances, notifications } from '@enums';
import { Factions } from 'src/vehicles';
import { shared_Data } from '@shared';
import { Commands } from '../commandHandler';


Commands[cmds.names.VEHICLE_CALLSIGN] = {
   description: cmds.descriptions.VEHICLE_CALLSIGN,
   vehicle: true,
   faction: { 
      required: true, 
      type: [FactionConfig.type.LEO, FactionConfig.type.MEDIC]
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
      player.vehicle.setVariable(shared_Data.CALLSIGN, callsign ? null : sign);
   }
}


Commands[cmds.names.CUFF] = {
   description: cmds.descriptions.CUFF,
   faction: {
      required: true,
      type: [ FactionConfig.type.LEO ]
   },
   item: itemNames.HANDCUFFS,
   async call (player: PlayerMp, targetSearch: string) {
      const target = mp.players.find(targetSearch);

      if (!target) {
         player.notification(Lang.userNotFound, notifications.type.ERROR, notifications.time.MED);
         return;
      }

      const cuffed = player.getVariable(shared_Data.CUFFED);

      target.character.setCuffs(target, !cuffed);
      player.proximityMessage(distances.ROLEPLAY, '* ' + player.name + (!cuffed ? Lang.putCuffs : Lang.removeCuffs) + target.name, colors.hex.Purple);
   }
};


Commands[cmds.names.FACTION_EQUIPMENT] = {
   description: cmds.descriptions.FACTION_EQUIPMENT,
   faction: { 
      required: true, 
      type: [
         FactionConfig.type.LEO,
         FactionConfig.type.MEDIC
      ] 
   },
   call (player: PlayerMp) {
      Factions.findOne({ where: { id: player.character.faction } } ).then(faction => {
         if (!faction) {
            return;
         }

         if (player.dist(faction.equipment_point) > 2.5) {
            player.notification(Lang.notOnPosition, notifications.type.ERROR, notifications.time.MED);
            return;
         }

         faction.equipment(player);
      });
   }
};


Commands[cmds.names.FACTION_GARAGE] = {
   description: cmds.descriptions.FACTION_GARAGE,
   faction: {
      required: true,
      type: [
         FactionConfig.type.LEO,
         FactionConfig.type.MEDIC
      ] 
   },
   params: [ 
      cmds.params.FACTION_GARAGE
   ],
   call (player: PlayerMp, action: string) {
      Factions.findOne({ where: { id: player.character.faction } } ).then(faction => {
         if (!faction) {
            return;
         }

         faction.garage(player, action);
      });
   }
}


Commands[cmds.names.FACTION_GOV_REPAIR] = {
   description: cmds.descriptions.FACTION_GOV_REPAIR,
   faction: {
      required: true,
      type: [
         FactionConfig.type.LEO,
         FactionConfig.type.MEDIC
      ] 
   },
   vehicle: true,
   call (player: PlayerMp) {
      Factions.findOne( { where: { id: player.character.id } } ).then(faction => {
         if (!faction) {
            return;
         }

         faction.repairVehicle(player);
      });
   }
}


Commands[cmds.names.FACTION_LIVERY] = {
   description: cmds.descriptions.FACTION_LIVERY,
   faction: {
      required: true,
      type: [
         FactionConfig.type.LEO,
         FactionConfig.type.MEDIC
      ] 
   },
   vehicle: true,
   call (player: PlayerMp, livery: string) {
      Factions.findOne( { where: { id: player.character.id } } ).then(faction => {
         if (!faction) {
            return;
         }

         faction.livery(player, Number(livery));
      });
   }
}