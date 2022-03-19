

let atmActive: boolean = false;

function toggleATM (bankInfo: string) {

   atmActive = !atmActive;

   if (atmActive && bankInfo) {

   }
}


mp.events.add('CLIENT::ATM:TOGGLE', toggleATM);