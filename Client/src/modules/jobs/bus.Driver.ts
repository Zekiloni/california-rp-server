import { Browser } from '../../browser';

const config = {
   sprite: 103,
   blipColor: 5,
}


interface BusStation {
   position: Vector3Mp
   visited: boolean
}


let drivingBus: boolean = false;
let busStations: BusStation[] = [];
let currentStation: number | null = null;


const startRoute = (points: Vector3Mp[], id: number) => {
   if (points) {

      for (const position of points) {
         busStations.push(
            { position: position, visited: false }
         );
      }  

      drivingBus = true;

      const [first] = busStations;
      currentStation = busStations.indexOf(first);

      Browser.call('BROWSER::SHOW', 'busStations');
      Browser.call('BROWSER::BUS_STATIONS', points.length);
   
      station(first.position);
   }
}


const station = (stationPosition: Vector3Mp) => {
   if (currentStation == null || !drivingBus) {
      return;
   }

   const { x, y, z } = stationPosition;

   const checkpoint = mp.checkpoints.new(48, new mp.Vector3(x, y, z - 2), 2, {
      direction: new mp.Vector3(0, 0, 0),
      color: [ 230, 50, 50, 185 ],
      visible: true,
      dimension: mp.players.local.dimension
   });

   const blip = mp.blips.new(config.sprite, stationPosition, {
      color: config.blipColor, alpha: 250, shortRange: false
   })

   const onEnterPoint = (eCheckpoint: CheckpointMp) => {
      if (eCheckpoint == checkpoint && currentStation != null) {

         if (mp.players.local.vehicle) {
            return;
         }

         checkpoint.destroy();
         blip.destroy();
         mp.events.remove(RageEnums.EventKey.PLAYER_ENTER_CHECKPOINT, onEnterPoint);

         if (currentStation == points.length - 1) {
            stopRoute(true);
            return;
         }

         currentStation ++;
         const nextPoint = busStations[currentStation];
         station(nextPoint.position);
      } 
   }

   mp.events.add(RageEnums.EventKey.PLAYER_ENTER_CHECKPOINT, onEnterPoint);

}

const stopRoute = (finished: boolean) => {
   const visitedStations = busStations.filter(station => station.visited == true);

   mp.events.callRemote('SERVER::BUS_DRIVER:FINISH', finished, visitedStations);

   drivingBus = false;
   busStations = [];
   currentStation = null;

   Browser.call('BROWSER::HIDE', 'busStations');
}

mp.events.add('CLIENT::BUS_DRIVER:START', startRoute);
mp.events.add('CLIENT::BUS_DRIVER:STOP', stopRoute);

