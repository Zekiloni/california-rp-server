
import { getBestTorso, getStreetZone } from '../utils';
import { updatePlayerMoney } from './game.UI';



export const screenResolution = mp.game.graphics.getScreenActiveResolution(100, 100);



mp.events.addDataHandler(
   {
      'MONEY': (entity: EntityMp, value: number, oldValue: number) => { 
         if (entity.type == RageEnums.EntityType.PLAYER && entity.remoteId == mp.players.local.remoteId) {
            updatePlayerMoney(value);
         }
      }
   }
);



mp.events.addProc({
   'CLIENT::GET:STREET_ZONE': getStreetZone,
   'CLIENT::GET:BEST_TORSO': getBestTorso,
})

