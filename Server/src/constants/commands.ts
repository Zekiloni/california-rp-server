

export namespace cmds {

   export const names = {
      ROLEPLAY_ME: 'me',
      ROLEPLAY_DO: 'do',
      OOC_CHAT: 'b',
      PM: 'pm',
      LOW_CHAT: 'l',
      WHISPER: 'whisper',
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
      WEATHER: 'ime vremena / id'
   };
   
   export const descriptions = { 
      ITEMS: 'Lista svih predmeta.',
      GIVE_ITEM: 'Davanje predmeta.',
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
