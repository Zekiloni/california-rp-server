import { PropertyObjects } from "./s.Property.Object";


export class PropertyObjectManager extends PropertyObjects {
   static createObject (player: PlayerMp, propertyId: number, model: string) {

   }

   static destroyObject (player: PlayerMp, pObjectId: number) {
      PropertyObjects.findOne({ where: { id: pObjectId } }).then(object => {
         if (!object) {
            return;
         }

         // Todo: Object ID: pObjectID destroyed by player.name, Date.now()
         object.destroy();
      })
   }

   static updateObject (player: PlayerMp) {
   }
}