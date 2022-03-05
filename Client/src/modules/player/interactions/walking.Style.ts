import { loadMovementClipset } from '../../../utils';



const walkingStyleHandler = async (entity: EntityMp, style: string, oldStyle: string) => {

   if (entity.type != RageEnums.EntityType.PLAYER) {
      return;
   }

   const _player = <PlayerMp>entity;

   if (style == 'normal') {
      const clipsetLoaded = await loadMovementClipset(style);

      if (!clipsetLoaded) {
         return;
      }

      _player.setMovementClipset(style, 0.25);
   } else {
      _player.resetMovementClipset(0.25);
   }
   
}


mp.events.addDataHandler('WALKING_STYLE', walkingStyleHandler);