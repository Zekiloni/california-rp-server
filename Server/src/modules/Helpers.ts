



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

mp.events.addProc(
   {
      'SERVER::PLAYER:LOBY': (Player: PlayerMp) => { 
         Player.dimension = Player.id;
         console.log('stepbro')
         return frp.Settings.Lobby;
      }
      
   }
);







