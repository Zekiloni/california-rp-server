

export namespace playerConfig {

   export const main = { 
      money: 3000,
      spawn: new mp.Vector3(-1355.6395, -519.5300, 23.4648),
      heading: 120,

      creator: { 
         position: new mp.Vector3(2.7733354, 525.318298, 170.617156),
         heading: 0
      },
   
      lobby: { 
         position: new mp.Vector3(-1765.12, -1111.37, 24.83),
         look_At: new mp.Vector3(-1690.09, -1081.34, 31.31),
      },

      healthRegeneration: 80
   }

   export const max = {
      INVENTORY_WEIGHT: 5,
      HOUSES: 3,
      BUSINESS: 2,
      VEHICLES: 5,
      EQUIPMENT: 4,
   }

   export const respawnTimer = 8 * 60 * 1000;

}