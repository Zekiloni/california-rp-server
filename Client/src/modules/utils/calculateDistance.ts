

let distance: number = 0.0;
let distanceTimer: number | null = null;

export const startCalculatingDistance = () => {
   distance = 0.0;
   distanceTimer = Date.now();

   mp.events.add(RageEnums.EventKey.RENDER, calculatingDistance);
}


export const calculatingDistance = () => {
   let speed: number;

   if (mp.players.local.vehicle) {
      speed = mp.players.local.vehicle.getSpeed() * 3.6;
   } else {
      speed = mp.players.local.getSpeed() * 3.6;
   }


   if (distanceTimer && Date.now() >= distanceTimer + 1 && speed > 1) { 
      const calulating = speed * ((Date.now() - distanceTimer) / 1000);
      
      const trip = calulating / 3600;

      distance += trip; 

      distanceTimer = Date.now();
   }   
}


export const getCalculatedDistance = () => {
   return distance;
}


export const stopCalculatingDistance = () => {
   mp.events.remove(RageEnums.EventKey.RENDER, calculatingDistance);
   
   let endDistance = distance;

   distance = 0.0;
   distanceTimer = null;

   return endDistance;
}

