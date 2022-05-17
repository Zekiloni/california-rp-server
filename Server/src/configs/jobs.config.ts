

export namespace JobConfig { 
   export const markerType = 27;

   export const markerColor: RGBA = [255, 204, 69, 200];

   export const 
      PRICE_PER_BUS_STATION = 25; 
        
   export enum job {
      UNEMPLOYED, BUS_DRIVER, POSTAL, TAXI, ELECTRICIAN
   }

   export const sprites = {
      BUS_DRIVER: 513,
      POSTAL: 525,
      TAXI: 198,
      ELECTRICIAN: 767
   }

   export const colors = {
      BUS_DRIVER: 15,
      POSTAL: 31,
      TAXI: 66,
      ELECTRICIAN: 36
   }

   export const positions = {
      BUS_DRIVER: new mp.Vector3(434.9161, -645.7756, 28.7343),
      POSTAL: new mp.Vector3(133.0013, 96.0656, 83.5076),
      TAXI: new mp.Vector3(900.6175, -174.1521, 74.0188),
      ELECTRICIAN: new mp.Vector3(678.69140625, 73.58089447021484, 83.16932)
   }

   export const names = {
      BUS_DRIVER: 'Bus Driver',
      ELECTRICIAN: 'Los Santos Electricity',
      POSTAL: 'Postal',
      TAXI: 'Downtown Taxi Co.'
   }

   export const descriptions = {
      BUS_DRIVER: 'Vozite autobus kroz Los Santos sve vam po spisku jebem pičke jedne.',
      POSTAL: 'Raznosite poštu pušite mi kurac.',
      TAXI: 'Napusi se kurca',
      ELECTRICIAN: 'Radiš kao debil sa strujom i budeš lepo plaćen.'
   }

   export const busRoutes = [
      {
         name: 'Gradska',
         points: [
            new mp.Vector3(400.37777, -673.43060, 29.1848),
            new mp.Vector3(61.089981, -655.46374, 31.5205),
            new mp.Vector3(136.40007, -880.95275, 30.3748),
            new mp.Vector3(260.45547, -1062.3489, 29.2055),
            new mp.Vector3(410.93643, -790.40698, 29.1767),
            new mp.Vector3(467.73193, -590.32403, 28.4959)
         ]
      }
   ]
}

