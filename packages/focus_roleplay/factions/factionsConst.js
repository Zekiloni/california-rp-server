
global.FACTIONS_TYPES = { LAW: 0, FMD: 1, GOV: 2, NEWS: 3, GANG: 4, MAFIA: 5, PARTY: 6}

global.FACTIONS = [
   // LSPD
   FACTION_LSPD = { ID: 1, NAME: 'Los Santos Police Department', DESC: 'To protect & serve', SHORT: 'LSPD', EMS: 911, TYPE: 0, BLIP: 60,
   LABEL_POINT: new mp.Vector3(434.080078125, -981.913879, 30.7093181610), 
   BLIP_POINT: new mp.Vector3(433.91, -981.98, 0), 
   GARAGE_POINT: new mp.Vector3(455.4101, -1017.44616, 28.41552), 
   EQUIP_POINT: new mp.Vector3(452.97064, -992.0955, 30.6896), 
   WEAPON_POINT: new mp.Vector3(452.0938415, -980.22052, 30.68961), 
   VEH_POINT: new mp.Vector3(439.02337, -1019.7479, 28.72946), 
   COLOR_R: 141, COLOR_G: 141, COLOR_B: 255,
   SPAWN_POINT: 0},

   // // LSFD
   // { ID: 1, NAME: 'Los Santos Fire Department', DESC: 'Gasimo Pozare', SHORT: 'LSFD', EMS: 911, TYPE: 1, BLIP: 153,
   // SPAWN_POINT: 0,
   // GARAGE_POINT: 0,
   // VEH_POINT: 0}

]; Object.freeze(FACTIONS);
