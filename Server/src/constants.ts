


type MarkerColors = {
   [key: string]: RGBA
};

export const MarkerColors: MarkerColors = { 
   Business: [253, 201, 41, 185],
   Faction: [69, 222, 105, 113],
   Job: [254, 213, 46, 70],
   Houses: [199, 0, 0, 70],
   Garages : [255, 255, 255, 70]
};


export const Ranks:string[] = [
   'Player', 
   'Helper', 
   'Junior Admin', 
   'Admin',
   'Senior Admin', 
   'General Admin', 
   'Lead Admin', 
   'Community Owner'
];


export const Colors = {
   White: ['F8F8F8', 'DEDEDE', 'BDBDBD', 'A3A2A2', '909090'],
   Low: ['BDBDBD', 'DEDEDE', 'A3A2A2', '909090', '909090'],
   Vehicle: ['DEDEDE', 'BDBDBD', 'A3A2A2', '909090', '909090'],
   Purple: ['cf9ae1', 'b380c4', '9565a5', '7f508f', '673e74'],
   OOC: ['b0c4c3', '9cb2b1', '8da1a0', '819493', '778a89'],
   FACTION: '59DC90',
   RADIO: 'FFFF99',
   PM: { From: 'FCBD00', To: 'FFD500' },
   Grey: 'E8E8E8',
   Tomato: 'FF6347',
   Megaphone: ['F4D31C', 'F4D31C', 'F4D31C', 'F4D31C', 'F4D31C'],
   Admin: 'F82234',
   Broadcast: 'F71326',
   Info: 'E48857',
   Success: '6BD56B',
   Error: 'FF6347',
   Help: 'DACA5D',
   server: '0792E5',
   property: '1ABC4F',
   whitesmoke: 'CECECE',
   Business: [255, 255, 255, 1],
   Bubble: [179, 128, 196, 255],
   Injured: [255, 99, 71, 255],
};


export const Messages = {
   WELCOME: 'Dobrodošli na Focus Roleplay ! Uživajte u igri.',
   USER_ALREADY_EXIST: 'Korisnik sa tim serijskim brojem već postoji.',
   CHARACTER_CREATED: 'Uspešno ste kreirali karaktera.',
   CHARACTER_ALREADY_EXIST: 'Karakter sa tim imenom i prezimenom već postoji.',
   NOT_ALLOWED: 'Niste ovlašteni za korišćenje ove komande.',
   USER_NOT_FOUND: 'Korisnik nije pronadjen.',
   PLAYER_NOT_NEAR: 'Igrač nije u vašoj blizini.',
   ITEM_DOESNT_EXIST: 'Taj predmet ne postoji.',
   COMMAND_USAGE: 'Komanda: ',
   YOU_NEED_MINIMUM_2_HOURS_OF_PLAYING: 'Potrebno vam je minimum dva sata igre.',
   NOT_IN_VEHICLE: 'Niste se u vozilu.',
   NOT_IN_SPEC_FACTION: 'Niste član odredjene fakcije.',
   NOT_IN_ANY_FACTION: 'Niste član ni jedne fakcije.',
   NOT_IN_YOUR_FACTION: 'Igrač nije član Vaše fakcije.',
   YOU_ARE_KICKED_FROM_FACTION: 'Izbačeni ste iz fakcije',
   YOU_HAVE_KICKED_PLAYER_FROM_FACTION: 'Izbacili ste igrača iz fakcije',
   DMV_INSTRUCTOR_GO_VEHICLE: 'Instruktor Vožnje: Okej, dobro ste prošli usmeni test, sada sledi vožnja, pratite me do vozila.',
   USER_DOESNT_EXIST: 'Korisničko ime nije pronadjeno.',
   INCCORRECT_PASSWORD: 'Korisnička šifra nije tačna.',
   THERE_ARE_NO_ORDERS_RIGHT_NOW: 'Trenutno nema porudžbina.',
   SUCCESFULLY_JOB: 'Uspešno ste se zaposlili kao ',
   JOB_ALREADY_STARTED: 'Već ste započeli posao.',
   THERE_IS_NO_PLACE_FOR_VEHICLE: 'Trenutno nema slobodnog mesta za vozilo.',
   GARBAGE_JOB_STARTED: 'Započeli ste posao Smećara, vaš zadatak je da idete od kontenjera do kontenjera i interaktirate sa njima na slovo Y.',
   GARBAGE_HOW_TO_STOP: 'Završili ste rutu. Vratite vaše zaduženo vozilo na parkingu gde ste ga i uzeli, zatim /garbage stop na mestu gde ste i započeli kako bi ste bili isplaćeni.',
   ALREADY_EMPLOYED: 'Već ste zaposleni.',
   NOT_EMPLOYED: 'Niste zaposleni.',
   NO_TX_IN_NUMBERPLATE: 'Vaše vozilo nema prefiks TX u registarskim tablicama.',
   JOB_NOT_STARTED: 'Niste započeli posao.',
   TAXIMETRE_PRICE_RANGE: 'Cena je u rangu ',
   SUCCEFULLY_GET_LICENSE: 'Uspešno ste prošli testove i praktični deo polaganja za ', 
   TAXIMETRE_SETTED_ON: 'Uspešno ste promenili cenu vožnje po minuti na ',
   UNEMPLOYED: 'Niste zaposleni.',
   PERSON_SAYS: ' kaže: ',
   PERSON_SAYS_IN_VEHICLE: ' [vozilo] kaže: ',
   PERSON_IS_INJURED: 'Ova osoba je ranjena ',
   TIMES: ' puta',
   QUITJOB: 'Uspešno ste dali otkaz na poslu.',
   SERVER_RESTART: 'Server restart.',
   NOT_SPECIFIC_JOB: 'Nemate odredjeni posao.',
   ORDER_NOT_COMPLETED: 'Niste dostavili kompletnu porudžbinu',
   ORDER_ALREADY_PROCESSING: 'Dostava je već završena ili je u toku.',
   ORDER_SUCCESS: 'Uspešno ste završili dostavu, zaradili ste ',
   SUCCESSFULLY_BUYED_VEHICLE: 'Uspešno ste kupili vozilo !',
   SUCCCESSFULLY_BUYED_HOUSE: 'Uspešno ste kupili kuću / stan ',
   TYPES_ARE_IN_RANGE: 'Taj tip ne postoji, tipovi se kreću izmedju ',
   SUCCESSFULLY_LOCKED: 'Uspešno ste zaključali ',
   SUCCESSFULLY_UNLOCKED: 'Uspešno ste otključali ',
   YOU_ENTERED_TAXI_VEHICLE: 'Ušli ste u Taksi vozilo oznake ',
   PRICE_PER_MINUTE: ', sa cenom po minutu ',
   ITEM_NO_DESCRIPTION: 'Ovaj predmet nema opis.',
   VEHICLE: 'Vozilo',
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
   JOB_VEHICLE_RETURN_BACK: 'Molimo vratite vaše zaduženo vozilo na parking gde ste ga i uzeli.',
   CMD_SYNTAX: '<b>[KOMANDA]</b> ',
   NOT_ON_POSITION: 'Ne nalazite se na odredjenoj lokaciji.',
   DOORS_LOCKED: 'Zaključali ste vrata',
   DOORS_UNLOCKED: 'Otključali ste vrata',
   IS_LOCKED: 'Zaključano je',
   YOU_DONT_HAVE_VEHICLE_KEYS: 'Nemate ključeve od ovog vozila.',
   YOU_DONT_HAVE_HOUSE_KEYS: 'Nemate ključeve od ove kuće.',
   YOU_DONT_OWN_A_HOUSE: 'Ne posedujete ni jednu kuću.',
   VEHICLE_IS_LOCKED: 'Ovo vozilo je zaključano.',
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
   CHANNEL_TOO_SHORT_PASSWORD: 'Šifra frekvencije mora da ima minumu 4 karaktera!',
   CHANNEL_ALREADY_EXISTS: 'Frekvencija već postoji !',
   VEHICLE_POINT_IS_NOT_FREE: 'Nema trenutno mesta da bi vam dostavili vozilo.',
   CAR_SOLD: 'Vozilo uspešno prodato',
   NOT_CAR_OWNER: 'Ne posedujete ovo vozilo',
   HOUSE_ALREADY_OWNER: 'Ova kuća / stan već poseduje vlasnika.',
   CAR_BOUGHT: 'Uspešno ste kupili vozilo',
   CAR_ALREADY_OWNED: 'Ovo vozilo je već u nečijem vlasništvu',
   CAR_PARKED: 'Uspešno ste parkirali vozilo',
   THERE_IS_NO_PAYCHECK: 'Trenutno nema novca za isplatu.',
   WAITING_FOR_PAYMENT: ' čeka za isplatu.',
   NOT_READY_FOR_HARVEST: 'Još nije vreme za branje.',
   MINIMUM_PAY_AMOUNT: 'Minimum 1$.',
   NOT_FACTION_LEADER: 'Niste lider ove fakcije.',
   INVITED_TO_FACTION: 'Pozvani ste da se pridružite fakciji ',

   MONEY_WITHDRAW: 'Podizanje',
   MONEY_DEPOSIT: 'Depozit',
};


