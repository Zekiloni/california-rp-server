const GLOBALS = {
   Color: [253, 201, 41, 185],

   Colors: {
      white: ['F8F8F8', 'DEDEDE', 'BDBDBD', 'A3A2A2', '909090'],
      low: ['BDBDBD', 'DEDEDE', 'A3A2A2', '909090', '909090'],
      purple: ['cf9ae1', 'b380c4', '9565a5', '7f508f', '673e74'],
      ooc: ['b0c4c3', '9cb2b1', '8da1a0', '819493', '778a89'],
      faction: '59DC90',
      radio: 'FFFF99',
      pm: { from: 'FCBD00', to: 'FFD500' },
      grey: 'E8E8E8',
      tomato: 'FF6347',
      megaphone: ['F4D31C', 'F4D31C', 'F4D31C', 'F4D31C', 'F4D31C'],
      admin: 'F82234',
      broadcast: 'F71326',
      info: 'E48857',
      success: '6BD56B',
      error: 'FF6347',
      help: 'DACA5D',
      server: '0792E5',
      property: '1ABC4F',
      whitesmoke: 'CECECE',
   },

   distances: {
      ooc: 8.0,
      ic: 10.5,
      low: 4.5,
      shout: 18.5,
      do: 8.5,
      me: 8.5,
   },

   Notification: {
      Succes: 0,
      Error: 1,
      Info: 2
   },

   Business: { 
      Types: { 
         Market: 0, GasStation: 1, Electronic: 2, 
         Rent: 3, Dealership: 4, Clothing: 5,
         Restaurant: 6, Cafe: 7, NightClub: 8, GunShop: 9,
         Furniture: 10, Pawn: 11, Tatto: 12
      }
   },

   Buy: {
      Options: { 
         Business: 'business', House: 'house'
      }
   },

   FAQ: { 
      List: [
         'Gde se mogu zaposliti ? Poslovi su označeni na mapi.', 
         'Gde mogu podići / ostaviti pare u banku ? Svi bankomati na mapi i banke su funkcionalne.'
      ]
   },

   MarkerColors: { 
      Business: [253, 201, 41, 185],
      Faction: [69, 222, 105, 113],
      Job: [254, 213, 46, 70],
      Houses: [199, 0, 0, 70],
      Garages : [255, 255, 255, 70] // IZABRATI BOJU
   },

   Jobs: { 
      Multiplier: 5.75,
      Unemployed: 0,
      Food_Delivery: 6,
   },
   
   messages: {
      WELCOME: 'Dobrodošli na Focus Roleplay ! Uživajte u igri.',
      NOT_ALLOWED: 'Niste ovlašteni za korišćenje ove komande.',
      USER_NOT_FOUND: 'Korisnik nije pronadjen.',
      ITEM_DOESNT_EXIST: 'Taj predmet ne postoji.',
      COMMAND_USAGE: 'Komanda: ',
      NOT_IN_VEHICLE: 'Niste se u vozilu.',
      NOT_IN_SPEC_FACTION: 'Niste član odredjene fakcije.',
      DMV_INSTRUCTOR_GO_VEHICLE: 'Instruktor Vožnje: Okej, dobro ste prošli usmeni test, sada sledi vožnja, pratite me do vozila.',
      USER_DOESNT_EXIST: 'Korisničko ime nije pronadjeno.',
      INCCORRECT_PASSWORD: 'Korisnička šifra nije tačna.',
      SUCCESFULLY_JOB: 'Uspešno ste se zaposlili kao ',
      ALREADY_EMPLOYED: 'Već ste zaposleni.',
      UNEMPLOYED: 'Niste zaposleni.',
      QUITJOB: 'Dali ste otkaz.',
      NOT_SPECIFIC_JOB: 'Nemate odredjeni posao.',
      ORDER_NOT_COMPLETED: 'Niste dostavili kompletnu porudžbinu',
      ORDER_ALREADY_PROCESSING: 'Dostava je već završena ili je u toku.',
      ORDER_SUCCESS: 'Uspešno ste završili dostavu, zaradili ste ',
      NOT_ENOUGH_MONEY: 'Nemate dovoljno novca.',
      NOT_ENOUGH_PRODUCTS: 'Nema dovoljno produkata.',
      NOT_ENOUGH_FOR_TRANSACTION: 'Nedovoljno novca za uspešnu transakciju.',
      ALREADY_OWNED: 'Neko već poseduje ovaj objekat.',
      ERROR: 'Došlo je do greške.',
      ENGINE_ON: 'Upalili ste motor vozila.',
      DMV_USAGE: 'Department of Motor Vehicles <br>Korišćenje: /dmv',
      DMV_NOT_WORKING: 'Department of Motor Vehicles, radno vreme od 6 - 20h',
      ENGINE_OFF: 'Ugasili ste motor vozila.',
      ANIM_DOESNT_EXIST: 'Animacija nije pronadjena',
      CMD_SYNTAX: '<b>[KOMANDA]</b> ',
      NOT_ON_POSITION: 'Ne nalazite se na odredjenoj lokaciji.',
      DOORS_LOCKED: 'Zaključali ste vrata',
      DOORS_UNLOCKED: 'Otključali ste vrata',
      IS_LOCKED: 'Zaključano je',
      NOT_ON_DUTY: 'Niste na dužnosti.',
      NOT_NEAR_JOB: 'Ne nalazite se u blizini posla',
      ALREADY_WORKING: 'Već radite.',
      INVALID_BUSSINES_TYPE: 'Nepoznat tip biznisa',
      HOUSE_SOLD_SUCCSESSFULY: 'Uspešno ste prodali kuću',
      HOUSE_ITEM_LEFT: 'Uspešno ste ostavili predmet u svoju kuću',
      HOUSE_ITEM_TAKEN: 'Uzeli ste predmet iz svoje kuće',
      CMD_DOESNT_EXIST: 'Komanda ne postoji.',
      WELCOME_ON_REGISTER: 'Dobrodošli na Focus Roleplay, uživajte u igri.',
      MAX_BUSSINES_TYPE: 'Maksimalni tip biznisa je',
      NO_FURNITURE_OWNED: `Nemate ništa od nameštaja`,
      NOT_NEAR_GAS_PUMP: 'Ne nalazite se u blizini aparata za točenje goriva.',
      NOT_NEAR_GAS_STATION: 'Ne nalazite se na benziskoj pumpi',
      LIVE_PHOTO_FROM_SERVER: 'Uzivo slika sa servera',
      ALREADY_IN_CHANNEL: 'Već ste u nekoj frekvenciji !',
      CHANNEL_SUCCESFULLY_CREATED: 'Uspešno ste kreirali frekvenciju.',
      CHANNEL_SUCCESFULLY_DELETED: 'Uspešno ste izbrisali frekvenciju.',
      CHANNEL_SUCCESFULLY_EDITED: 'Uredili ste frekvenciju.',
      CHANNEL_SUCCESFULLY_LEAVED: 'Napustili ste frekvenciju',
      NOT_IN_CHANNEL: 'Niste ni u jednoj frekvenciji.',
      SUCCESSFULY_JOINED_CHANNEL: 'Uspešno ste se pridružilii frekvenciji.',
      YOU_DONT_HAVE: 'Ne posedujete ',
      CHANNEL_NOT_FOUND: 'Frekvencija ne postoji !',
      CHANNEL_WRONG_PASSWORD: 'Šifra frekvencije nije tačna !',
      CHANNEL_ALREADY_EXISTS: 'Frekvencija već postoji !',
      CAR_SOLD: 'Vozilo uspešno prodato',
      NOT_CAR_OWNER: 'Ne posedujete ovo vozilo',
      CAR_BOUGHT: 'Uspešno ste kupili vozilo',
      CAR_ALREADY_OWNED: 'Ovo vozilo je već u nečijem vlasništvu',
      CAR_PARKED: 'Uspešno ste parkirali vozilo'
   }
};

frp.Globals = GLOBALS;
