

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
}

