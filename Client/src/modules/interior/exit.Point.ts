

let exitPoints: MarkerMp[] = [];


const createExitPoint = (position: Vector3Mp, markerType: number, color: RGBA) => {
   const { x, y, z } = position;

   const pointExist = exitPoints.find(point => point.position.x == x && point.position.y == y && point.position.z == z);

   if (pointExist) {
      return;
   }

   const marker = mp.markers.new(markerType, new mp.Vector3(x, y, z - 0.35), 0.75, {
      color: color, 
      rotation: new mp.Vector3(0, 0, 0),
      visible: true,
      dimension: mp.players.local.dimension
   });

   exitPoints.push(marker);
}


const destroyExitPoint = (position: Vector3Mp) => { 
   const { x, y, z } = position;

   const point = exitPoints.find(point => point.position.x == x && point.position.y == y && point.position.z == z);

   if (!point) {
      return;
   }

   point.destroy();
   const index = exitPoints.indexOf(point);
   exitPoints.splice(index, 1);
}


mp.events.add('CLIENT::INTERIOR:CREATE_EXIT_POINT', createExitPoint);
mp.events.add('CLIENT::INTERIOR:DESTROY_EXIT_POINT', destroyExitPoint);