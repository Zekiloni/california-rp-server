

interface FactionPoint {
   command: string
   marker: MarkerMp
   colshape: ColshapeMp
}


let factionPoints: FactionPoint[] = [];


const initializePoints = (points: [string, Vector3Mp][] | null) => {
   if (points) {
      for (const point of points) {
         let [command, position] = point;

         // position.z = - 0.8;
         const exit = factionPoints.find(ePoint => ePoint.command == command);

         if (exit) {
            exit.marker.position = position;
            exit.colshape.position = position;
         } else {
            const factionPoint: FactionPoint = {
               command: command,
               marker: mp.markers.new(1, new mp.Vector3(position.x, position.y, position.z - 0.85), 1, { 
                  color: [89, 220, 144, 200],
                  visible: true,
                  dimension: 0, 
               }),
               colshape: mp.colshapes.newSphere(position.x, position.y, position.z, 1.0, 0)
            }

            factionPoints.push(factionPoint);
         }
      }
   } else {
      if (factionPoints.length > 0) {
         for (const point of factionPoints) {
            if (point.marker) {
               point.marker.destroy();
            }

            if (point.colshape) {
               point.colshape.destroy();
            }
         }
      
         factionPoints = [];
      }
   }
};



const pointInfo = (colshape: ColshapeMp) => {
   const point = factionPoints.find(point => point.colshape.id == colshape.id);

   if (point) {
      mp.events.call('CLIENT::HELP', point.command, 5);
   }
}

mp.events.add('CLIENT::FACTION:POINTS', initializePoints);
mp.events.add(RageEnums.EventKey.PLAYER_ENTER_COLSHAPE, pointInfo);