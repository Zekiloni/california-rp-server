

export namespace JobConfig { 
   export const markerType = 27;

   export const markerColor: RGBA = [255, 204, 69, 200];
   
   export enum job {
      UNEMPLOYED, BUS_DRIVER, POSTAL, TAXI
   }

   export const sprites = {
      BUS_DRIVER: 513,
      POSTAL: 745,
   }

   export const colors = {
      BUS_DRIVER: 5,
      POSTAL: 79
   }

   export const positions = {
      BUS_DRIVER: new mp.Vector3(434.9161, -645.7756, 28.7343),
      POSTAL: new mp.Vector3(0, 0, 0)
   }

   export const names = {
      BUS_DRIVER: 'Bus Driver',
      POSTAL: 'Postal'
   }

   export const descriptions = {
      BUS_DRIVER: 'Vozite autobus kroz Los Santos sve vam po spisku jebem pičke jedne.',
      POSTAL: 'Raznosite poštu pušite mi kurac.'
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

