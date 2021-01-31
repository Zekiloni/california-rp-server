
global.FACTIONS_TYPES = { LAW: 0, FMD: 1, GOV: 2, NEWS: 3, GANG: 4, MAFIA: 5, PARTY: 6}


global.FACTIONS = [
   // LSPD
   { ID: 0, NAME: 'Los Santos Police Department', DESC: 'To portect & server', SHORT: 'LSPD', EMS: 911, TYPE: 0, BLIP: 60,
   LABEL_POINT_X: 434.080078125, LABEL_POINT_Y: -981.913879, LABEL_POINT_Z: 30.7093181610, 
   BLIP_POINT_X: 433.91, BLIP_POINT_Y: -981.98, BLIP_POINT_Z: 0,
   SPAWN_POINT: 0, 
   GARAGE_POINT: 0, 
   VEH_POINT: 0 },

   // // LSFD
   // { ID: 1, NAME: 'Los Santos Fire Department', DESC: 'Gasimo Pozare', SHORT: 'LSFD', EMS: 911, TYPE: 1, BLIP: 153,
   // SPAWN_POINT: 0,
   // GARAGE_POINT: 0,
   // VEH_POINT: 0}

]; Object.freeze(FACTIONS);
