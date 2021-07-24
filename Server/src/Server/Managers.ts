import { Settings } from '../Server/Settings';


export let GameObjectts = {
   Vehicles: {},
   tVehicles: {},
   Houses: {},
   Businesses: {},
   Items: {}
}


mp.events.add(
   {
      'playerEnterColshape': (Player: PlayerMp, Colshape: ColshapeMp) => { 
         if (Player.vehicle) return;
         if (Colshape.OnPlayerEnter) Colshape.OnPlayerEnter(Player); 
         
      },

      'playerExitColshape': (Player: PlayerMp, Colshape: ColshapeMp) => { 
         if (Player.vehicle) return;
         if (Colshape.OnPlayerLeave) Colshape.OnPlayerLeave(Player); 
      }
   }
);









