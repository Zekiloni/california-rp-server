

const config = {
   sprite: 525,
   blipColor: 79,
}

// BOX OBJECT: bkr_prop_fakeid_boxpassport_01a

let working: boolean = false;
let points: PostalPoint[] = [];
let currentPoint: number| null = null;


interface PostalPoint {
   position: Vector3Mp
   delivered: boolean
};


const startPostal = (positions: Vector3Mp[]) => {
   if (positions) {
      working = true;

      for (const position of positions) {
         points.push(
            { position: position, delivered: false }
         );
      }  

      const [first] = points;
      currentPoint = points.indexOf(first);

      const position = new mp.Vector3(first.position.x, first.position.y, first.position.z);
      createPoint(position);
   }
} 


const stopPostal = () => {
   const succesPoints = points.map(point => point.delivered == true);
   mp.events.callRemote('SERVER::POSTAL:FINISH', succesPoints.length);

   points = [];
   currentPoint = null;
   working = false;
}


const createPoint = (position: Vector3Mp) => {
   if (currentPoint == null || !working) {
      return;
   }

   const { x, y, z } = position;

   const checkpoint = mp.checkpoints.new(48, new mp.Vector3(x, y, z - 2), 2, {
      direction: new mp.Vector3(0, 0, 0),
      color: [ 230, 50, 50, 185 ],
      visible: true,
      dimension: mp.players.local.dimension
   });

   const blip = mp.blips.new(config.sprite, position, {
      color: config.blipColor, alpha: 250, shortRange: false
   })
   
   const onEnterPoint = (eCheckpoint: CheckpointMp) => {
      if (eCheckpoint == checkpoint && currentPoint != null) {

         if (mp.players.local.vehicle) {
            return;
         }

         checkpoint.destroy();
         blip.destroy();
         mp.events.remove(RageEnums.EventKey.PLAYER_ENTER_CHECKPOINT, onEnterPoint);

         if (currentPoint == points.length - 1) {
            stopPostal();
            return;
         }

         currentPoint ++;
         const nextPoint = points[currentPoint];
         createPoint(nextPoint.position);
      } 
   }

   mp.events.add(RageEnums.EventKey.PLAYER_ENTER_CHECKPOINT, onEnterPoint);
}


mp.events.add('CLIENT::POSTAL:START', startPostal);
mp.events.add('CLIENT::POSTA:STOP', stopPostal);


export {};
