


export let objects: InteriorObject[] = [];


interface InteriorObject { 
   databaseID?: number
   name?: string
   model?: string
   gameObject?: ObjectMp
   temporary?: boolean
}


const loadObjects = (loadObjects: { name: string, id: number, model: string, position: Vector3Mp, rotation: Vector3Mp }[], dimension: number) => {
   for (const object of loadObjects) {

      const gameObject = mp.objects.new(mp.game.joaat(object.model), object.position!, { 
         rotation: object.rotation,
         alpha: 255,
         dimension: dimension
      });

      objects.push(
         {
            databaseID: object.id, name: object.name, model: object.model, gameObject: gameObject
         }
      )
   }   
}


const unloadObjects = () => {

   objects.forEach(object => {
      if (object.gameObject) {
         object.gameObject.destroy();
      }
   })

   objects = [];
}


mp.events.add('CLIENT::INTERIOR:OBJECTS_LOAD', loadObjects);
mp.events.add('CLIENT::INTERIOR:OBJECTS_UNLOAD', unloadObjects);