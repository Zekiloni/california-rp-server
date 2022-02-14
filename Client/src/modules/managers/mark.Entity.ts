import { entityType } from '../../enums/entity';
import { markedEntity } from '../../interfaces/mark.Entity';


let marked:  markedEntity | null = null;


export default function markEntity (entity: EntityMp, marker: number, color: RGBA, blip?: number) {

   if (!marked) {
      return;
   }

   const { position, type } = entity;

   let markPosition: Vector3Mp | null = null;

   switch (type) {
      case entityType.PLAYER: {
         const boneIndex = (<PlayerMp>entity).getBoneIndex(12844);
         markPosition = entity.getWorldPositionOfBone(boneIndex);
         break;
      }

      case entityType.VEHICLE: {
         break;
      }
   }


   marked = {
      colshape: mp.colshapes.newCircle(position.x, position.y, 3.5, entity.dimension),
      marker: mp.markers.new(marker, new mp.Vector3(markPosition?.x, markPosition?.y, markPosition!.z + 0.2), 0.4, { color: color })
   }

   if (blip) {
      marked.blip;
   }
   
   mp.events.add(RageEnums.EventKey.PLAYER_ENTER_COLSHAPE, enterNearbyEntity);

   function enterNearbyEntity (colshape: ColshapeMp) {
      if (colshape == marked?.colshape) {

         marked.colshape.destroy();
         marked.marker.destroy();

         if (marked.blip) {
            marked.blip.destroy();
         }
         
         marked = null;
         
         mp.events.remove(RageEnums.EventKey.PLAYER_ENTER_COLSHAPE, enterNearbyEntity);
      }
   }
}