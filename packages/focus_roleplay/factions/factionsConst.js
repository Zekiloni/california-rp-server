
global.FACTIONS_TYPES = { LAW: 0, FMD: 1, GOV: 2, NEWS: 3, GANG: 4, MAFIA: 5, PARTY: 6}

global.FACTION_POLICE = {
   ID: 0,
   NAME: 'Los Santos Police Department',
   SHORT: 'LSPD',
   EMS: 911,
   TYPE: 0,
   LEADER: null,
   SPAWN_POINT: new mp.Vector3(0, 0, 0),
   GARAGE_POINT: new mp.Vector3(0, 0, 0),
   VEH_POINT: new mp.Vector3(0, 0, 0),
}; Object.freeze(FACTION_POLICE)