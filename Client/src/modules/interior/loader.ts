import loader from "ts-loader/dist";



export let objects: InteriorObject[] = [];


interface InteriorObject { 
   databaseID?: number
   name?: string
   model?: number | string
   gameObject?: ObjectMp
   temporary?: boolean
}


const loadObjects = (loadObjects: { name: string, id: number, model: number, position: Vector3Mp, rotation: Vector3Mp }[], dimension: number) => {
   for (const object of loadObjects) {
      mp.gui.chat.push(JSON.stringify(object.model))
      const gameObject = mp.objects.new(object.model, object.position!, { 
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