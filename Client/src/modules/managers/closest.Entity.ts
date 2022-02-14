import { distanceBetweenVectors } from "../../utils";



export default function getClosestEntity (distance: number) {

   const { position, dimension } = mp.players.local;

   let nearby: EntityMp[] = [];

   if (distanceBetweenVectors(mp.objects.getClosest(position).position, position) < distance) {
      nearby.push(mp.objects.getClosest(position))
   }

   if (distanceBetweenVectors(mp.vehicles.getClosest(position).position, position) < distance) {
      nearby.push(mp.vehicles.getClosest(position))
   }
   if (distanceBetweenVectors(mp.players.getClosest(position).position, position) < distance) {
      nearby.push(mp.players.getClosest(position))
   }

   return nearby.reduce(
      (firstEntity: EntityMp, secondEntity: EntityMp) => 
         distanceBetweenVectors(position, secondEntity.position) < distanceBetweenVectors(position, firstEntity.position) ? secondEntity : firstEntity
   )
}