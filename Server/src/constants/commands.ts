

export namespace cmds {

   export const names = {
      HELP: 'help',
      ROLEPLAY_ME: 'me',
      GIVE_GUN: 'givegun',
      INVICIBLE: 'invicible',
      ROLEPLAY_DO: 'do',
      OOC_CHAT: 'b',
      PM: 'pm',
      LOW_CHAT: 'l',
      WHISPER: 'w',
      ITEMS: 'items',
      GIVE_ITEM: 'giveitem',
      CLEAR_INVENTORY: 'clearinventory',
      ENGINE: 'engine',
      TIME: 'time',
      WEATHER: 'weather',
      FIX_VEH: 'fixveh',
      GIVE_MONEY: 'givemoney',
      SET_MONEY: 'setmoney',
      CREATE_HOUSE: 'createhouse',
      DESTROY_HOUSE: 'destroyhouse',
      SAVE_POS: 'position',
      GOTO: 'goto',
      GET_HERE: 'gethere',
      CREATE_VEHICLE: 'vehicle',
      DESTROY_VEHICLE: 'destroyvehicle',
      FLY: 'fly',
      ROLEPLAY_TRY: 'try',
      SHOUT_CHAT: 's',
      ROLEPLAY_AME: 'ame',
      COIN: 'coin'
   };
   
   export const params = { 
      PLAYER: 'id / ime igrača',
      TEXT: 'tekst',
      HOUR: 'sat',
      MINUTE: 'minuta',
      SECONDS: 'sekunda',
      WEAPON: 'ime oružija',
      AMMO: 'municija',
      WEATHER: 'ime vremena / id'
   };
   
   export const descriptions = { 
      NO_DESC: 'Bez opisa.',
      HELP: 'Lista komandi.',
      CREATE_VEHICLE: 'Kreiranje vozila.',
      DESTROY_VEHICLE: 'Brisanje najbližeg vozila ili odredjenog id-a.',
      ITEMS: 'Lista svih predmeta.',
      INVICIBLE: 'Entitet vidljiv / nevidljiv.',
      GIVE_ITEM: 'Davanje predmeta.',
      GIVE_GUN: 'Davanje oružija.',
      CLEAR_INVENTORY: 'Čišćenje predmeta osobe.',
      SET_TIME: 'Promena vremena, stavite sate na 666 da se vreme automatski menja.',
      SET_WEATHER: 'Vremenske prilike.',
      FIX_VEH: 'Popravka vozila.',
      GOTO: 'Teleport do igrača.',
      GET_HERE: 'Teleportovanje igrača do sebe.',
      ROLEPLAY_ME: 'Akcija, radnja.',
      ROLEPLAY_DO: 'Stanje, status.',
      ROLEPLAY_TRY: 'Pokušaj radnje.',
      ROLEPLAY_AME: 'Opis, ekspresija.',
      LOW_CHAT: 'Tih govor.',
      SHOUT_CHAT: 'Glasniji govor.',
      OOC_CHAT: 'Lokalni OOC govor.',
      PM_CHAT:'Privatna poruka.',
      WHISPER: 'Šaputanje.'
   };
   
}
