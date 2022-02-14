import { distanceBetweenVectors } from "../../utils";



export default function getClosestEntity () {

   const { position, dimension } = mp.players.local;

   let nearby: EntityMp[] = [];

   nearby.push(mp.objects.getClosest(position));
   nearby.push(mp.vehicles.getClosest(position));
   nearby.push(mp.players.getClosest(position));

   return nearby.reduce(
      (firstEntity: EntityMp, secondEntity: EntityMp) => 
         distanceBetweenVectors(position, secondEntity.position) < distanceBetweenVectors(position, firstEntity.position) ? secondEntity : firstEntity
   )
}