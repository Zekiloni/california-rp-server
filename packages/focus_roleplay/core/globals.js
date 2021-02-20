

global.CHAT_COLORS = [
   WHITE_1 ='FFFFFF', 
   WHITE_2 ='E6E6E6', 
   WHITE_3 ='C8C8C8', 
   WHITE_4 ='AAAAAA', 
   WHITE_5 = '6E6E6E', 
   FACTION = 'BDF38B',
   PURPLE_1 = 'F9B7FF',
   PURPLE_2 = 'E6A9EC',
   PURPLE_3 = 'C38EC7',
   PURPLE_4 = 'D2B9D3',
   PURPLE_5 = 'D2B9D3',
   RADIO = 'FFFF99',
   PM_FROM = 'FFD500',
   PM_TO = 'FCBD00',
]; Object.freeze(CHAT_COLORS)

global.SERVER_MARKER = { r: 3, g: 105, b: 163, a: 150}

global.CHAT_RADIUS = { 
   OOC: 4.0, 
   IC: 6.2,
   LOW: 2.8,
   SHOUT: 12.0,  
   DO: 6.5,
   ME: 6.5,
}; Object.freeze(CHAT_RADIUS)

global.MESSAGES = [ 
   MSG_NOT_ALLOWED = 'Niste ovlašteni za korišćenje ove komande.',
   MSG_USER_NOT_FOUND = 'Korisnik nije pronadjen.',
   MSG_ITEM_DOESNT_EXIST = 'Taj predmet ne postoji.',
   MSG_NOT_IN_VEHICLE = 'Ne nalazite se u vozilu.',
   MSG_NOT_IN_SPEC_FACTION = 'Niste član odredjene fakcije.',
   MSG_ALREADY_EMPLOYED = 'Već ste zaposleni.',
   MSG_UNEMPLOYED = 'Niste zaposleni.',
   MSG_QUITJOB = 'Dali ste otkaz.',
   MSG_NOT_IN_FREQ = 'Niste ni u jednoj frekvenciji.',
   MSG_NOT_ENOGUTH_MONEY = 'Nemate dovoljno novca.',
   MSG_ALREADY_OWNED = 'Neko već poseduje ovaj objekat.',
   MSG_ERROR = 'Došlo je do greške.',
   MSG_ENGINE_ON = 'Upalili ste motor vozila.',
   MSG_ENGINE_OFF = 'Ugasili ste motor vozila.',
   MSG_CMD_SYNTAX = '<b>[KOMANDA]</b> ',
   MSG_DOORS_LOCKED = 'Zaključali ste vrata',
   MSG_DOORS_UNLOCKED = 'Otključali ste vrata',
   MSG_NOT_ON_DUTY = 'Niste na dužnosti.',
   MSG_ALREADY_WORKING = 'Već radite.'
]; Object.freeze(MESSAGES)

global.NOFITICATION_TYPES = [
   NOTIFY_SUCCESS = 'success',
   NOTIFY_ERROR = 'error',
   NOTIFY_INFO = 'info'
];

global.SERVER_COLOR = { 
   R: 5, G: 149, B: 232
}; Object.freeze(SERVER_COLOR)
