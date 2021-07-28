export {};

const Player = mp.players.local;
let BusinessGasMenu: boolean = false;

const Pumps = [1339433404, 1694452750, 1933174915, 2287735495];


mp.events.add({
   'client:business.gas:menu': (Info: any) => {
      BusinessGasMenu = !BusinessGasMenu;

   }
})


mp.events.addProc({
   'client:business.gas:nearpump': (): Promise<boolean> => {
      const Position = Player.position;
      return new Promise((resolve) => {
         for (const Pump of Pumps) {
            let object = mp.game.object.getClosestObjectOfType(Position.x, Position.y, Position.z, 3.0, Pump, false, true, true);
            if (object) {
               resolve(true)
               break;
            }
         }
      });
   }
});


