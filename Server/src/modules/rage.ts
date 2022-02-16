


mp.events.add(
   {
      'playerEnterColshape': (player: PlayerMp, colshape: ColshapeMp) => { 
         if (!player.character || !player.account) {
            return;
         }

         if (colshape.onPlayerEnter) { 
            colshape.onPlayerEnter(player); 
         }
      },

      'playerExitColshape': (player: PlayerMp, colshape: ColshapeMp) => { 
         if (!player.character || !player.account) {
            return;
         }
         
         if (colshape.onPlayerLeave) { 
            colshape.onPlayerLeave(player); 
         }
      }
   }
);
