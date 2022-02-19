

let active: boolean = false;


mp.events.add('CLIENT::TATTO:MENU', openTattoShop);


function openTattoShop (info: string) {
   active = !active;
   
}