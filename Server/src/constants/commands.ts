

export namespace cmds {

   export const names = {
      HELP: 'help',
      ROLEPLAY_ME: 'me',
      GIVE_GUN: 'givegun',
      INVICIBLE: 'invicible',
      ROLEPLAY_DO: 'do',
      OOC_CHAT: 'b',
      ENTER: 'enter',
      EXIT: 'exit',
      BUY: 'buy',
      PM: 'pm',
      FACTIONS: 'factions',
      LOW_CHAT: 'l',
      WHISPER: 'w',
      HOUSE: 'house',
      FLIP: 'flip',
      CLEAR_CHAT: 'clearchat',
      BUILDER: 'builder',
      DISARM: 'disarm',
      CREATE_ACCOUNT: 'createaccount',
      REVIVE: 'revive',
      ITEMS: 'items',
      CUFF: 'cuff',
      TELEPORT: 'teleport',
      KICK: 'kick',
      BAN: 'ban',
      LOCK: 'lock',
      RESPAWN_VEHICLE: 'respawnvehicle',
      RESPAWN_ALL_VEHICLES: 'respawnvehicles',
      GET_VEHICLE: 'getvehicle',
      HEALTH: 'health',
      A_CHAT: 'a',
      RENT: 'rent',
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
      EDIT_HOUSE: 'edithouse',
      DESTROY_HOUSE: 'destroyhouse',
      VEHICLE_CALLSIGN: 'callsign',
      SAVE_POS: 'position',
      XYZ: 'xyz',
      GOTO: 'goto',
      GET_HERE: 'gethere',
      VEHICLES_MENU: 'vehicles',
      CREATE_VEHICLE: 'vehicle',
      DESTROY_VEHICLE: 'destroyvehicle',
      SPAWN_VEHICLE: 'spawnvehicle',
      FACTION_EQUIPMENT: 'equipment',
      FACTION_GARAGE: 'garage',
      FACTION_GOV_REPAIR: 'govrepair',
      FACTION_LIVERY: 'livery',
      CREATE_BUSINESS: 'createbusines',
      EDIT_BUSINESS: 'editbusines',
      BUSINESS_TYPES: 'businestypes',
      BUSINES: 'busines',
      DESTROY_BUSINESS: 'destroybusines',
      FLY: 'fly',
      CREATE_FACTION: 'createfaction',
      EDIT_FACTION: 'editfaction',
      MAKE_LEADER: 'makeleader',
      FACTION_INVITE: 'invite',
      FACTION_LEAVE: 'leave',
      FACTION_CHAT: 'f',
      FACTION_PANEL: 'faction',
      FACTION_KICK: 'uninvite',
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
      busines: 'busines',
      house: 'house',
      vehicle: 'vehicle',
      name: 'name',
      spawn: 'spawn',
      description: 'description',
      garage: 'garage',
      equipment: 'equipment',
      take: 'take',
      return: 'return'
   }
   
   export const params = { 
      PLAYER: 'id / ime igrača',
      TEXT: 'tekst',
      HOUR: 'sat',
      MINUTE: 'minuta',
      SECONDS: 'sekunda',
      WEAPON: 'ime oružija',
      FIELD: 'polje',
      VALUE: 'vrednost',
      AMMO: 'municija',
      TYPE: 'tip',
      PRICE: 'cena',
      TP_TYPE: 'tip: vehicle, busines, house',
      WEATHER: 'ime vremena / id',
      FACTION_GARAGE: 'akcija: take / return',
      HOUSE_ID: 'id kuće',
      COORD: 'koordinata',
      HOUSE_TYPE: 'tip kuče',
      WALK_IN: 'otvorenog tipa 0 / 1',
      REASON: 'razlog',
      NUMBER: 'broj',
      USERNAME: 'korisničko ime',
      PASSWORD: 'šifra',
      E_MAIL: 'e-mail',
      VEHICLE_MODEL: 'model vozila',
      VEHICLE_ID: 'id vozila',
      FACTION_NAME: 'ime fakcije',
      FACTION_ID: 'id fakcije',
      BUSINES_ID: 'id biznisa',
   };
   
   export const descriptions = { 
      NO_DESC: 'Bez opisa.',
      HELP: 'Lista komandi.',
      KICK: 'Kikovanje igrača.',
      VEHICLES_MENU: 'Meni vaših vozila.',
      CREATE_VEHICLE: 'Kreiranje vozila.',
      SPAWN_VEHICLE: 'Učitavanje vozila.',
      DESTROY_VEHICLE: 'Brisanje najbližeg vozila ili odredjenog id-a.',
      CREATE_BUSINESS: 'Kreiranje biznisa na trenutnoj poziciji.',
      DESTROY_BUSINESS: 'Brisanje najbližeg biznisa.',
      DESTROY_HOUSE: 'Brisanje najbliže kuće.',
      CREATE_HOUSE: 'Krairanje kuće.',
      EDIT_HOUSE: 'Podešavanje kuće.',
      EDIT_BUSINESS: 'Podešavanje najbližeg biznisa.',
      BUSINESS: 'Opcije biznisa.',
      BUSINESS_TYPES: 'Spisak dostupnih tipova bizinsa.',
      BUILDER: 'Graditelj.',
      RESPAWN_VEHICLE: 'Respavn obližnjeg vozila ili vozila u kojem se nalazite.',
      RESPAWN_ALL_VEHICLES: 'Respavn svih vozila.',
      GET_VEHICLE: 'Teleportovanje vozila do vas.',
      ENGINE: 'Motor vozila.',
      CREATE_FACTION: 'Kreiranje fakcije.',
      FACTION_LEAVE: 'Da napustite trenutnu fakciju.',
      VEHICLE_CALLSIGN: 'Pozivni znak vašeg vozila.',
      FACTION_LIVERY: 'Livery vozila.',
      FACTION_GOV_REPAIR: 'Popravka službenog vozila o trošku fakcije.',
      FACTIONS: 'Lista fakcija.',
      EDIT_FACTION: 'Podešavanje fakcija.',
      FACTION_EQUIPMENT: 'Ormarić opreme vaše fakcije.',
      FACTION_GARAGE: 'Uzimanje vozila iz garaže fakcije.',
      FACTION_INVITE: 'Pozivanje igrača da se pridruži vašoj fakciji.',
      FACTION_KICK: 'Izbacivanje igrača iz fakcije.',
      FACTION_CHAT: 'OOC komunikacija fakcije.',
      FACTION_PANEL: 'Panel vaše fakcije.',
      DESTROY_FACTION: 'Brisanje fakcije.',
      MAKE_LEADER: 'Postavljanje igrača na mesto lidera fakcije.',
      ITEMS: 'Lista svih predmeta.',
      COP: 'Milicajac.',
      INVICIBLE: 'Entitet vidljiv / nevidljiv.',
      GIVE_ITEM: 'Davanje predmeta.',
      GIVE_GUN: 'Davanje oružija.',
      CLEAR_INVENTORY: 'Čišćenje predmeta osobe.',
      SET_TIME: 'Promena vremena, stavite sate na 666 da se vreme automatski menja.',
      SET_WEATHER: 'Vremenske prilike.',
      ENTER: 'Ulaz u interijer.',
      CUFF: 'Stavljanje lisica.',
      EXIT: 'Izlazak iz interijera u kojem se nalazite.',
      FIX_VEH: 'Popravka vozila.',
      CLEAR_CHAT: 'Čišćenje četa svim igračima.',
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
      TELEPORT: 'Teleportovanje do biznisa / kuće / vozila.',
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
