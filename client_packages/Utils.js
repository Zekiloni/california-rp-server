

function CompareVectors (i, x) { 
   return i.x == x.x && i.y == x.y && i.z == x.z;
};

function LoadAnimDict (i) { 
   if (mp.game.streaming.hasAnimDictLoaded(i)) return Promise.resolve();
   return new Promise(async resolve => { 
      mp.game.streaming.requestAnimDict(i);
      while (!mp.game.streaming.hasAnimDictLoaded(i)) { 
         await mp.game.waitAsync(25);
      }
      resolve();
   })
};

function weaponString (weapon) {
	if (typeof weapon !== 'undefined')
		return '0x' + weapon.toString(16).toUpperCase()
	else 
		return '0xA2719263'
}

function Distance (first, next) {
   return new mp.Vector3(first.x, first.y, first.z).subtract(new mp.Vector3(next.x, next.y, next.z)).length();
}

function OnlinePlayers () {
   let list = [];
   mp.players.forEach(p => { 
      list.push({ id: p.remoteId, name: p.name }); 
   }); 
   return list;
}


function GetAdress (position) { 
   const path = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0),
      Zone = mp.game.gxt.get(mp.game.zone.getNameOfZone(position.x, position.y, position.z)),
      Street = mp.game.ui.getStreetNameFromHashKey(path.streetName);
   return { zone: Zone, street: Street };
}


global.utils = { CompareVectors, LoadAnimDict, weaponString, Distance, OnlinePlayers, GetAdress };