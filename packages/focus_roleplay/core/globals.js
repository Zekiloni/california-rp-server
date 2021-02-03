

global.CHAT_COLORS = { 
   WHITE_0: 'FFFFFF', 
   WHITE_1: 'E6E6E6', 
   WHITE_3: 'C8C8C8', 
   WHITE_4: 'AAAAAA', 
   WHITE_5: '6E6E6E', 
   FACTION: 'BDF38B',
   RADIO: 'FFFF99'
}; Object.freeze(CHAT_COLORS)

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
   MSG_QUITJOB = 'Dali ste otkaz.'
]; Object.freeze(MESSAGES)

global.NOFITICATION_TYPES = [
   NOTIFY_SUCCESS = 'success',
   NOTIFY_ERROR = 'error',
   NOTIFY_INFO = 'info'
];

global.SERVER_COLOR = { 
   R: 5, G: 149, B: 232
}; Object.freeze(SERVER_COLOR)
