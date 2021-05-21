



const GLOBALS = { 

   Color: [3, 105, 163, 150],

   Colors: { 
      white: ['F8F8F8', 'DEDEDE', 'BDBDBD', 'A3A2A2', '909090'], 
      low: ['E6E6E6', 'BDBDBD', 'DEDEDE', 'A3A2A2', '909090'], 
      purple: ['cf9ae1', 'b380c4', '9565a5', '7f508f', '673e74'],
      ooc: ['7B8A89', 'A3B8B7', '9AADAC', '8D9E9D', '7B8A89'],
      faction: '5DD7B8',
      radio: 'FFFF99',
      pm: { from: 'FCBD00', to: 'FFD500' },
      grey: 'E8E8E8',
      tomato: 'FF6347',
      megaphone: ['F4D31C', 'F4D31C', 'F4D31C', 'F4D31C', 'F4D31C'],
      admin: 'D9534F',
      info: 'E48857',
      success: '6BD56B',
      error: 'FF6347',
      help: 'DACA5D',
      broadcast: 'FF2624',
      server: '0792E5',
   },
   
   distances: { 
      ooc: 8.0, 
      ic: 10.5,
      low: 4.5,
      shout: 18.5,  
      do: 8.5,
      me: 8.5,
   },

   NOTIFY: { 
      SUCCES:'success',
      ERROR: 'error',
      INFO: 'info'
   },

   messages: { 
      NOT_ALLOWED: 'Niste ovlašteni za korišćenje ove komande.',
      USER_NOT_FOUND: 'Korisnik nije pronadjen.',
      ITEM_DOESNT_EXIST: 'Taj predmet ne postoji.',
      NOT_IN_VEHICLE: 'Ne nalazite se u vozilu.',
      NOT_IN_SPEC_FACTION: 'Niste član odredjene fakcije.',
      ALREADY_EMPLOYED: 'Već ste zaposleni.',
      UNEMPLOYED: 'Niste zaposleni.',
      QUITJOB: 'Dali ste otkaz.',
      NOT_IN_FREQ: 'Niste ni u jednoj frekvenciji.',
      NOT_ENOUGH_MONEY: 'Nemate dovoljno novca.',
      NOT_ENOUGH_FOR_TRANSACTION: 'Nedovoljno novca za uspešnu transakciju.',
      ALREADY_OWNED: 'Neko već poseduje ovaj objekat.',
      ERROR: 'Došlo je do greške.',
      ENGINE_ON: 'Upalili ste motor vozila.',
      ENGINE_OFF: 'Ugasili ste motor vozila.',
      CMD_SYNTAX: '<b>[KOMANDA]</b> ',
      DOORS_LOCKED: 'Zaključali ste vrata',
      DOORS_UNLOCKED: 'Otključali ste vrata',
      NOT_ON_DUTY: 'Niste na dužnosti.',
      ALREADY_WORKING: 'Već radite.',
      INVALID_BUSSINES_TYPE: 'Nepoznat tip biznisa',
      HOUSE_SOLD_SUCCSESSFULY: 'Uspešno ste prodali kuću',
      HOUSE_ITEM_LEFT: 'Uspešno ste ostavili predmet u svoju kuću',
      HOUSE_ITEM_TAKEN: 'Uzeli ste predmet iz svoje kuće',
      CMD_DOESNT_EXIST: 'Komanda ne poostoji.',
      WELCOME_ON_REGISTER: 'Dobrodošli na Focus Roleplay, uživajte u igri.',
      MAX_BUSSINES_TYPE: 'Maksimalni tip biznisa je', // Maximum bussiness type is
      NO_FURNITURE_OWNED: `Nemate ništa od nameštaja`,
      LIVE_PHOTO_FROM_SERVER: 'Uzivo slika sa servera',
      ALREADY_IN_CHANNEL: 'Već ste u nekoj frekvenciji',
      SUCCESSFULY_JOINED_CHANNEL: 'Uspešno ste se pridružilii frekvenciji ',
      FREQUENCY_NOT_FOUND: 'Frekvencija ne postoji !',
      CHANNEL_WRONG_PASSWORD: 'Šifra frekvencije nije tačna !',
      FREQUENCY_ALREADY_EXISTS: 'Frekvencija već postoji !',
      ALREADY_IN_SOME_CHANNEL: 'Već ste u nekoj frekvenciji !',
      CAR_SOLD: 'Vozilo uspešno prodato',
      NOT_CAR_OWNER: 'Ne posedujete ovo vozilo',
      CAR_BOUGHT: 'Uspešno ste kupili vozilo',
      CAR_ALREADY_OWNED: 'Ovo vozilo je već u nečijem vlasništvu',
      CAR_PARKED: 'Uspešno ste parkirali vozilo'
   }
}

frp.Globals = GLOBALS;