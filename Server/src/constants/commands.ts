

export namespace cmds {

   export const names = {
      HELP: 'help',
      ROLEPLAY_ME: 'me',
      GIVE_GUN: 'givegun',
      INVICIBLE: 'invicible',
      ROLEPLAY_DO: 'do',
      OOC_CHAT: 'b',
      ENTER: 'enter',
      BUY: 'buy',
      PM: 'pm',
      LOW_CHAT: 'l',
      WHISPER: 'w',
      FLIP: 'flip',
      DISARM: 'disarm',
      CREATE_ACCOUNT: 'createaccount',
      REVIVE: 'revive',
      ITEMS: 'items',
      KICK: 'kick',
      BAN: 'ban',
      BUSINESS: 'business',
      LOCK: 'lock',
      RESPAWN_VEHICLE: 'respawnvehicle',
      RESPAWN_ALL_VEHICLES: 'respawnvehicles',
      HEALTH: 'health',
      A_CHAT: 'a',
      GIVE_ITEM: 'giveitem',
      CLEAR_INVENTORY: 'clearinventory',
      ENGINE: 'engine',
      TIME: 'time',
      RADIO: 'r',
      WEATHER: 'weather',
      MAKE_ADMIN: 'makeadmin',
      PAY: 'pay',
      FIX_VEH: 'fixveh',
      GIVE_MONEY: 'givemoney',
      SET_MONEY: 'setmoney',
      CREATE_HOUSE: 'createhouse',
      DESTROY_HOUSE: 'destroyhouse',
      SAVE_POS: 'position',
      XYZ: 'xyz',
      GOTO: 'goto',
      GET_HERE: 'gethere',
      CREATE_VEHICLE: 'vehicle',
      DESTROY_VEHICLE: 'destroyvehicle',
      CREATE_BUSINESS: 'createbiz',
      EDIT_BUSINESS: 'editbiz',
      BUSINESS_TYPES: 'biztypes',
      DESTROY_BUSINESS: 'destroybiz',
      FLY: 'fly',
      FREEZE: 'freeze',
      ROLEPLAY_TRY: 'try',
      SLAP: 'slap',
      COP: 'cop',
      SHOUT_CHAT: 's',
      DIMENSION: 'dimension',
      ROLEPLAY_AME: 'ame',
      COIN: 'coin',
      ANNOUNCEMENT: 'ao',
   };


   export const actions = {
      business: 'business',
      house: 'house',
   }
   
   export const params = { 
      PLAYER: 'id / ime igrača',
      TEXT: 'tekst',
      HOUR: 'sat',
      MINUTE: 'minuta',
      SECONDS: 'sekunda',
      WEAPON: 'ime oružija',
      AMMO: 'municija',
      TYPE: 'tip',
      PRICE: 'cena',
      WEATHER: 'ime vremena / id',
      COORD: 'koordinata',
      WALK_IN: 'otvorenog tipa 0 / 1',
      REASON: 'razlog',
      NUMBER: 'broj',
      USERNAME: 'korisničko ime',
      PASSWORD: 'šifra',
      E_MAIL: 'e-mail',
      VEHICLE_MODEL: 'model vozila',
   };
   
   export const descriptions = { 
      NO_DESC: 'Bez opisa.',
      HELP: 'Lista komandi.',
      KICK: 'Kikovanje igrača.',
      CREATE_VEHICLE: 'Kreiranje vozila.',
      DESTROY_VEHICLE: 'Brisanje najbližeg vozila ili odredjenog id-a.',
      CREATE_BUSINESS: 'Kreiranje biznisa na trenutnoj poziciji.',
      DESTROY_BUSINESS: 'Brisanje najbližeg biznisa.',
      EDIT_BUSINESS: 'Podešavanje najbližeg biznisa.',
      BUSINESS_TYPES: 'Spisak dostupnih tipova bizinsa.',
      RESPAWN_VEHICLE: 'Respavn obližnjeg vozila ili vozila u kojem se nalazite.',
      RESPAWN_ALL_VEHICLES: 'Respavn svih vozila.',
      ITEMS: 'Lista svih predmeta.',
      COP: 'Milicajac.',
      INVICIBLE: 'Entitet vidljiv / nevidljiv.',
      GIVE_ITEM: 'Davanje predmeta.',
      GIVE_GUN: 'Davanje oružija.',
      CLEAR_INVENTORY: 'Čišćenje predmeta osobe.',
      SET_TIME: 'Promena vremena, stavite sate na 666 da se vreme automatski menja.',
      SET_WEATHER: 'Vremenske prilike.',
      FIX_VEH: 'Popravka vozila.',
      FLIP: 'Normala.',
      GOTO: 'Teleport do igrača.',
      MAKE_ADMIN: 'Davanje admin permisija',
      GET_HERE: 'Teleportovanje igrača do sebe.',
      PAY: 'Davanje novca osobi.',
      LOCK: 'Zaključavanje - otključavanje obližnjeg objekta, vozila.',
      REVIVE: 'Oživljavanje igrača.',
      HEALTH: 'Podešavanje HP-a igrača.',
      SET_MONEY: 'Podešavanje novca igrača.',
      GIVE_MONEY: 'Davanje novca igraču.',
      XYZ: 'Teleportovanje do koordinata (X, Y, Z).',
      DIMENSION: 'Setovanje dimenzije igrača.',
      ROLEPLAY_ME: 'Akcija, radnja.',
      ROLEPLAY_DO: 'Stanje, status.',
      SLAP: 'Upozorenje / skretanje pažnje igraču na određenu stvar.',
      ROLEPLAY_TRY: 'Pokušaj radnje.',
      ROLEPLAY_AME: 'Opis, ekspresija.',
      DISARM: 'Oduzimanje oružija igraču.',
      FREEZE: 'Zamrzavanje igrača na trenutnu poziciji.',
      LOW_CHAT: 'Tih govor.',
      SHOUT_CHAT: 'Glasniji govor.',
      OOC_CHAT: 'Lokalni OOC govor.',
      PM_CHAT:'Privatna poruka.',
      WHISPER: 'Šaputanje.',
      A_CHAT: 'Admin komunikacija.',
      BUY: 'Kupovina.',
      CREATE_ACCOUNT: 'Kreiranje računa.',
      ANNOUNCEMENT: 'Emitovanje igračima.',
   };
   
}
