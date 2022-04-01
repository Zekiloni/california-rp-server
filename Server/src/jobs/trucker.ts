import { Jobs } from 'src/vehicles';


enum LoadType {
   BASIC, FUEL,
}


class Trucker extends Jobs {

   static lPoints: Vector3Mp[] = [
      
   ]

   constructor (id: number, name: string, description: string, position: Vector3Mp, sprite: number, spriteColor: number) {
      super (id, name, description, position, sprite, spriteColor);
      
   }
   
   loadTruck (player: PlayerMp) {

   }

}