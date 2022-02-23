


export let interiorObjects = new Map<number, ObjectMp>();


interface InteriorObject { 
   model: string,
   position: Vector3Mp,
   rotation: Vector3Mp
}


const loadObjects = (loadObjects: InteriorObject[], dimension: number) => {
   for (const i of loadObjects) {
      const object = mp.objects.new(mp.game.joaat(i.model), i.position, { 
            rotation: i.rotation,
            alpha: 255,
            dimension: dimension
         }
      );

      if (!object.doesExist()) {
         interiorObjects.set(object.id, object);
      }
   }   
}


const unloadObjects = () => {
   interiorObjects.forEach(object => {
      const { id } = object;
      object.destroy();
      interiorObjects.delete(id);
   });
}


mp.events.add('CLIENT::INTERIOR:OBJECTS_LOAD', loadObjects);
mp.events.add('CLIENT::INTERIOR:OBJECTS_UNLOAD', unloadObjects);