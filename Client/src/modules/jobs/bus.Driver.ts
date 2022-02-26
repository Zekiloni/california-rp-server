import { Browser } from "../../browser";


let menuActive: boolean = false;
let isWorking: boolean = false;

let iPoint: number | null = null;


interface BusStation {
   position: Vector3Mp
   visited: boolean
}


interface BusRoute { 
   id: number
   name: string
   points: BusStation[]
}


let route: BusRoute | null = null;

const routesMenu = (routes: string) => {
   menuActive = !menuActive;

   Browser.call(menuActive ? 'BROWSER::SHOW' : 'BROWSER::HIDE', 'busRoutes');

   if (menuActive) {
      Browser.call('BROWSER::BUS_ROUTES', routes);
   }
}


const startRoute = (id: number) => {
   if (isWorking) {
      return;
   }

   isWorking = true;
   station()

}


const station = () => {
   if (!route) {
      return;
   }

   const [first] = route?.points;
   iPoint = route.points.indexOf(first);

   let checkpoint = mp.checkpoints.new(1, first.position, 1);
   let blip;

   const nextStation = (cCheckpoint: CheckpointMp) => {
      if (route && iPoint != null && cCheckpoint == checkpoint) {
         iPoint ++;
         
         if (iPoint == route?.points.length - 1) {
            
            
         }
      }
   }

   mp.events.add(RageEnums.EventKey.PLAYER_ENTER_CHECKPOINT, nextStation);

}

const stopRoute = (finished: boolean) => {

   if (!route) {
      return;
   }

   const visitedStations = route?.points.filter(station => station.visited == true);

   mp.events.callRemote('SERVER::BUS_DRIVER:FINISH', finished, visitedStations);

   isWorking = false;
   route = null;
   iPoint = null;

}

mp.events.add('CLIENT::BUS_DRIVER:START', startRoute);
mp.events.add('CLIENT::BUS_DRIVER:STOP', stopRoute);

export {};
