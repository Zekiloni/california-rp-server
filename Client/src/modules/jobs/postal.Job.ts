import controls from "../../enums/controls";


const config = {
   sprite: 525,
   blipColor: 79,
}


let working: boolean = false;
let points: PostalPoint[] = [];
let currentPoint: number| null = null;


interface PostalPoint {
   position: Vector3Mp
   delivered: boolean
};


mp.keys.bind(controls.F2, true, function () {
   startPostal([
      new mp.Vector3(-1368.91003417968, -556.82287597656, 30.2354869), 
      new mp.Vector3(-1382.18603515625, -568.44696044921, 30.2278385), 
      new mp.Vector3(-1390.91760253906, -562.28271484375, 30.2288379)
   ])
})


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
