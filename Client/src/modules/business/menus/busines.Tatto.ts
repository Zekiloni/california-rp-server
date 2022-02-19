

let active: boolean = false;


const openTattoShop = (info: string) => {
   active = !active;  
}


mp.events.add('CLIENT::TATTO:MENU', openTattoShop);

export {};