


export let objects = new Map<number, ObjectMp>();


interface InteriorObject { 
   model: string,
   position: Vector3Mp,
   rotation: Vector3Mp
}


const load = (loadObjects: InteriorObject[], dimension: number) => {
   for (const i of loadObjects) {
      const object = mp.objects.new(mp.game.joaat(i.model), i.position, { 
            rotation: i.rotation,
            alpha: 255,
            dimension: dimension
         }
      );

      if (!object.doesExist()) {
         objects.set(object.id, object);
      }
   }   
}


const unload = () => {
   objects.forEach(object => {
      const { id } = object;
      object.destroy();
      objects.delete(id);
   });
}


mp.events.add('CLIENT::INTERIOR:LOAD', load);
mp.events.add('CLIENT::INTERIOR:UNLOAD', unload);