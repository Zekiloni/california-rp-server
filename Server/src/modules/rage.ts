


mp.events.add(
   {
      'playerEnterColshape': (player: PlayerMp, colshape: ColshapeMp) => { 
         if (colshape.onPlayerEnter) colshape.onPlayerEnter(player);  
      },

      'playerExitColshape': (player: PlayerMp, colshape: ColshapeMp) => { 
         if (colshape.onPlayerLeave) colshape.onPlayerLeave(player); 
      }
   }
);
