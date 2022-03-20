

const atmObjects = [ 
   3424098598, 3168729781, 2930269768, 506770882
];

let atmActive: boolean = false;

function toggleATM (bankInfo: string) {

   atmActive = !atmActive;

   if (atmActive && bankInfo) {

   }
}


function nearbyATMS () {
   const { position } = mp.players.local;

   for (const atm of atmObjects) { 
      const nearby = mp.game.object.getClosestObjectOfType(position.x, position.y, position.z, 1.8, atm, false, true, true);
      if (nearby) {
         return true;
      }
   }
}

mp.events.add(RageEnums.EventKey.RENDER, nearbyATMS)
mp.events.add('CLIENT::ATM:TOGGLE', toggleATM);